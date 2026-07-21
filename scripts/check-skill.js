// check-skill.js — „doctor" de integritate pentru skill. Verifică:
//  1) fiecare cale references/.. și scripts/.. menționată în SKILL.md + reference-uri EXISTĂ;
//  2) numerele de corpus din documentație corespund realității (CNSC/CA/CJUE);
//  3) niciun identificator structurat rămas în corpus (apel la anon-lib scan).
// Rulează după modificări structurale. Exit!=0 dacă găsește probleme.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const R = path.join(ROOT, 'references');
let problems = 0;
const ok = s => console.log('  ✓ ' + s);
const bad = s => { console.log('  ✗ ' + s); problems++; };

// --- 1) căi referențiate existente ---
console.log('\n[1] Căi referențiate (references/.. , scripts/..)');
const docs = ['SKILL.md'].concat(fs.readdirSync(R).filter(f => f.endsWith('.md')).map(f => path.join('references', f)));
const refPaths = new Set();
for (const d of docs) {
  const p = path.join(ROOT, d); if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8');
  for (const m of t.matchAll(/\b(references\/[A-Za-z0-9_\-\/]+\.[a-z]{2,4}|scripts\/[A-Za-z0-9_\-]+\.js)\b/g)) {
    const rp = m[1].replace(/[.,]$/, '');
    // ignoră tipare/glob (conțin < > * { } sau placeholder)
    if (/[<>*{}]|BOxxxx|Hotar|<BO>|<act|<lege|<data|<folder|<plangere|<fisier|<act\.txt/.test(rp)) continue;
    refPaths.add(rp);
  }
}
let missing = 0;
for (const rp of [...refPaths].sort()) { if (!fs.existsSync(path.join(ROOT, rp))) { bad('lipsește: ' + rp); missing++; } }
if (!missing) ok(`toate cele ${refPaths.size} căi concrete referențiate există`);

// --- 2) numere de corpus ---
console.log('\n[2] Numere de corpus (documentat vs real)');
function count(dir, filter) { return fs.existsSync(dir) ? fs.readdirSync(dir).filter(filter).length : -1; }
const real = {
  CNSC: count(path.join(R, 'jurisprudenta-cnsc', 'decizii'), f => f.endsWith('.txt')),
  CA: count(path.join(R, 'jurisprudenta-ca', 'decizii'), f => f.endsWith('.txt')),
  CJUE_spete: count(path.join(R, 'jurisprudenta-cjue', 'spete'), f => f.endsWith('.md')),
  CJUE_texte: count(path.join(R, 'jurisprudenta-cjue', 'texte-integrale'), f => f.endsWith('.txt')),
  ICCJ: count(path.join(R, 'jurisprudenta-iccj', 'decizii'), f => f.endsWith('.txt')),
  LEG: count(path.join(R, 'legislatie'), f => f.endsWith('.txt')),
};
ok(`CNSC: ${real.CNSC} · CA: ${real.CA} · CJUE spețe: ${real.CJUE_spete} · CJUE texte: ${real.CJUE_texte} · ÎCCJ: ${real.ICCJ} · legislație: ${real.LEG}`);
const bib = fs.readFileSync(path.join(R, 'biblioteca-locala.md'), 'utf8');
const skl = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf8');
function checkNum(label, n, hay) { if (new RegExp(`\\b${n}\\b`).test(hay)) ok(`${label}: ${n} confirmat în docs`); else bad(`${label}: ${n} real, dar nu apare în docs (actualizează)`); }
checkNum('CNSC', real.CNSC, bib + skl);
checkNum('CA', real.CA, bib + skl);
checkNum('CJUE spețe', real.CJUE_spete, bib + skl);

// --- 3) poarta de identificatori structurați ---
console.log('\n[3] Identificatori structurați în corpus (CNSC + CA)');
const { scan } = require('./anon-lib');
const STRUCT = ['CUI', 'REGCOM', 'CNP', 'IBAN', 'EMAIL'];
let structHits = 0;
for (const sub of ['jurisprudenta-cnsc', 'jurisprudenta-ca']) {
  const dir = path.join(R, sub, 'decizii'); if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.txt'))) {
    const s = scan(fs.readFileSync(path.join(dir, f), 'utf8'));
    for (const k of STRUCT) if (s[k]) { structHits += s[k].count; }
  }
}
structHits ? bad(`${structHits} identificatori structurați rămași — rulează: node audit-anon.js --fix-ids`) : ok('0 identificatori structurați (CUI/J/CNP/IBAN/email)');

// [4] Vechimea snapshotului de legislație — legea se modifică; un snapshot vechi citează forme abrogate.
// Neblocant (avertisment): re-sursează de pe legislatie.just.ro când depășește pragul.
console.log('\n[4] Vechimea legislației locale (snapshot vs. azi)');
{
  const LEG = path.join(R, 'legislatie');
  const PRAG_LUNI = 8;
  let oldest = null;
  for (const f of fs.readdirSync(LEG).filter(f => f.startsWith('legea-') || f.startsWith('hg-'))) {
    const mt = fs.statSync(path.join(LEG, f)).mtime;
    if (!oldest || mt < oldest.mt) oldest = { f, mt };
  }
  if (oldest) {
    const luni = (Date.now() - oldest.mt.getTime()) / (30 * 24 * 3600e3);
    if (luni > PRAG_LUNI) console.log(`  ⚠ cel mai vechi fișier oficial: ${oldest.f} (${Math.round(luni)} luni) — re-sursează de pe legislatie.just.ro (neblocant)`);
    else ok(`snapshot legislație ≤ ${PRAG_LUNI} luni (cel mai vechi: ${Math.round(luni)} luni)`);
  }
}

console.log(`\n${problems ? '✗ ' + problems + ' probleme' : '✓ skill integru'}`);
process.exit(problems ? 1 : 0);
