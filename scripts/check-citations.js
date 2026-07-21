// check-citations.js — POARTĂ ANTI-HALUCINAȚIE pentru un draft de act.
// Extrage citările (cauze CJUE, BO-uri CNSC, articole de lege) și verifică că EXISTĂ efectiv în
// corpusul inclus / legislația consolidată. „O decizie inventată într-un act real e mai rea decât
// lipsa citării" (SKILL.md). Flaghează tot ce nu se confirmă — de verificat în sursa primară.
//
//   node check-citations.js <draft.txt|.md>
//
// Verifică EXISTENȚA (numărul/identificatorul e real), NU corectitudinea citării pe fond.
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'references');

const draftPath = process.argv[2];
if (!draftPath || !fs.existsSync(draftPath)) { console.error('Folosire: node check-citations.js <draft.txt|.md>'); process.exit(2); }
const draft = fs.readFileSync(draftPath, 'utf8');

// ---------- construiește seturile cunoscute ----------
function readAll(dir, filter) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(filter || (() => true));
}
// CJUE: din nume fișiere spete/texte + conținut INDEX (chei „<num>/<yy>", ignoră prefix C/T)
const cjueKnown = new Set();
const cjueDir = path.join(R, 'jurisprudenta-cjue');
function addCjue(s) { for (const m of s.matchAll(/\b[CT]?-?(\d{1,4})[-\/](\d{2})\b/g)) cjueKnown.add(`${m[1]}/${m[2]}`); }
for (const f of readAll(path.join(cjueDir, 'spete'))) addCjue(f);
for (const f of readAll(path.join(cjueDir, 'texte-integrale'))) addCjue(f);
for (const idx of ['index-teme.md']) { const p = path.join(cjueDir, idx); if (fs.existsSync(p)) for (const m of fs.readFileSync(p, 'utf8').matchAll(/\b[CT]-(\d{1,4})\/(\d{2,4})\b/g)) cjueKnown.add(`${m[1]}/${m[2].slice(-2)}`); }

// CNSC: BO-ids din nume fișiere
const boKnown = new Set(readAll(path.join(R, 'jurisprudenta-cnsc', 'decizii'), f => /^BO/.test(f)).map(f => f.replace('.txt', '')));

// Legislație: text per număr de lege/HG
const legDir = path.join(R, 'legislatie');
const lawText = {};
for (const f of readAll(legDir, f => f.endsWith('.txt'))) {
  const t = fs.readFileSync(path.join(legDir, f), 'utf8');
  if (f.includes('legea-98')) lawText['98'] = t;
  else if (f.includes('legea-99')) lawText['99'] = t;
  else if (f.includes('legea-100')) lawText['100'] = t;
  else if (f.includes('legea-101')) lawText['101'] = t;
  else if (f.includes('hg-395') || (/aplicare-a\.txt$/.test(f) || (f.includes('aplicare-a') && !f.includes('L99') && !f.includes('L100')))) lawText['395'] = t;
  else if (f.includes('hg-394') || f.includes('L99')) lawText['394'] = t;
  else if (f.includes('hg-867') || f.includes('L100')) lawText['867'] = t;
}
function articleExists(law, n) {
  const t = lawText[law]; if (!t) return null; // lege necunoscută local
  return new RegExp('Art(?:icolul)?\\.?\\s*' + n + '\\b').test(t);
}

// ---------- extrage citările din draft ----------
const found = { cjue: new Map(), bo: new Map(), art: new Map() };
for (const m of draft.matchAll(/\b([CT])-(\d{1,4})\/(\d{2,4})\b/g)) { const k = `${m[1]}-${m[2]}/${m[3]}`; found.cjue.set(k, `${m[2]}/${m[3].slice(-2)}`); }
for (const m of draft.matchAll(/\bBO\d{4}_\d+\b/g)) found.bo.set(m[0], m[0]);
// Abordare pe două treceri (nu un singur regex „art...lege"): un singur match nu poate acoperi corect
// cazul „art. 178 alin. (1) și art. 179 din Legea nr. 99/2016", unde DOUĂ articole trimit spre ACEEAȘI
// mențiune de lege aflată mai departe în frază. 1) găsește toate mențiunile de lege/HG cu poziția lor;
// 2) pentru fiecare „art. N", ia mențiunea de lege cea mai apropiată ÎNAINTE (dacă „N" e imediat urmat
// de una) altfel cea mai apropiată DUPĂ, în limita a ~100 caractere — acoperă și înșiruirile de articole.
const lawRefs = [];
for (const m of draft.matchAll(/\b(?:Legea|L\.|Legii)\s*(?:nr\.?\s*)?(98|99|100|101)\/2016/gi)) lawRefs.push({ pos: m.index, law: m[1], kind: 'L' });
for (const m of draft.matchAll(/\b(?:H\.?G\.?|Norme(?:le)?(?:\s+metodologice)?)[^;\n]{0,20}?(395|394|867)\/2016/gi)) lawRefs.push({ pos: m.index, law: m[1], kind: 'HG' });
lawRefs.sort((a, b) => a.pos - b.pos);
const MAXDIST = 100;
for (const m of draft.matchAll(/art(?:icolul)?\.?\s*(\d+)\b/gi)) {
  const artEnd = m.index + m[0].length;
  let best = null, bestDist = Infinity;
  for (const r of lawRefs) {
    const dist = r.pos >= artEnd ? r.pos - artEnd : m.index - (r.pos + 20);
    if (dist >= 0 && dist <= MAXDIST && dist < bestDist) { best = r; bestDist = dist; }
  }
  if (best) found.art.set(`art. ${m[1]} ${best.kind}${best.law}`, { law: best.law, n: m[1] });
}
// limită cunoscută: dacă un „art. N" e menționat fără lege proprie alăturată (se bazează pe context
// stabilit anterior în paragraf), euristica de proximitate poate atribui legea greșită dintr-o
// mențiune vecină nelegată. Efectul e un fals „de verificat" suplimentar (⚠), niciodată o confirmare
// falsă (✓) — direcția sigură pentru o poartă anti-halucinație; verifică manual orice ⚠ neclar.

// ---------- raport ----------
let warn = 0, ok = 0;
function line(sym, s) { console.log(`  ${sym} ${s}`); }
console.log(`\n=== Verificare citări: ${path.basename(draftPath)} ===`);

console.log(`\nCJUE (${found.cjue.size}):`);
if (!found.cjue.size) line('·', '(niciuna)');
for (const [disp, key] of found.cjue) { const exists = cjueKnown.has(key); exists ? ok++ : warn++; line(exists ? '✓' : '⚠', `${disp}${exists ? '' : '  — NU e în corpusul CJUE; verifică pe curia.europa.eu / EUR-Lex'}`); }

console.log(`\nCNSC BO (${found.bo.size}):`);
if (!found.bo.size) line('·', '(niciuna)');
for (const [disp] of found.bo) { const exists = boKnown.has(disp); exists ? ok++ : warn++; line(exists ? '✓' : '⚠', `${disp}${exists ? '' : '  — NU e în corpusul CNSC inclus; verifică pe portal.cnsc.ro'}`); }

console.log(`\nArticole de lege (${found.art.size}):`);
if (!found.art.size) line('·', '(niciunul cu lege explicită)');
for (const [disp, v] of found.art) { const e = articleExists(v.law, v.n); if (e === null) { line('?', `${disp} — legea nu e locală, neverificat`); } else if (e) { ok++; line('✓', disp); } else { warn++; line('⚠', `${disp} — articolul NU apare în textul consolidat; verifică numărul/forma în vigoare`); } }

console.log(`\nRezumat: ${ok} confirmate · ${warn} de verificat`);
if (warn) console.log('ATENȚIE: citările ⚠ nu s-au confirmat în corpus. NU le lăsa în act fără verificare în sursa primară.');
process.exit(warn ? 1 : 0);
