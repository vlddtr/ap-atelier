// verify-refs.js — verifică citările de articole din fișierele de GHIDARE (references/*.md) față de
// textul real al legilor bundle-uite. Prinde erori tip „art. 137(2) = inacceptabilă, nu neconformă",
// alineat greșit, lege greșită. Produce un worksheet pentru revizuire manuală (judecata e a omului).
//   node scripts/verify-refs.js            -> worksheet în temp + sumar
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'references');
const LEG = path.join(R, 'legislatie');
const OUT = require("path").join(require("os").tmpdir(), "verify-refs-worksheet.md");

// mapare lege -> fișier
const LAWFILE = {};
for (const f of fs.readdirSync(LEG).filter(f => f.endsWith('.txt'))) {
  const t = fs.readFileSync(path.join(LEG, f), 'utf8');
  if (f.includes('legea-98')) LAWFILE['98'] = t;
  else if (f.includes('legea-99')) LAWFILE['99'] = t;
  else if (f.includes('legea-100')) LAWFILE['100'] = t;
  else if (f.includes('legea-101')) LAWFILE['101'] = t;
  else if (f.includes('hg-395') || /aplicare-a\.txt$/.test(f)) LAWFILE['395'] = t;
  else if (f.includes('hg-394') || f.includes('L99')) LAWFILE['394'] = t;
  else if (f.includes('hg-867') || f.includes('L100')) LAWFILE['867'] = t;
}
function artText(law, n) {
  const t = LAWFILE[law]; if (!t) return null;
  // fereastra NU e plafonată — un articol cu multe alineate/litere (ex. art. 3 HG395) poate depăși
  // orice cap fix; plafonarea anterioară (900) făcea lookahead-ul să eșueze și întorcea fals „NEGĂSIT"
  // pentru articole reale, doar mai lungi. Lazy + lookahead găsește oricum limita la Art. următor.
  const re = new RegExp('Art(?:icolul)?\\.?\\s*' + n + '\\b[\\s\\S]*?(?=Art(?:icolul)?\\.?\\s*\\d+\\b|$)');
  const m = t.match(re);
  return m ? m[0].replace(/\s+/g, ' ').trim().slice(0, 2000) : 'NEGĂSIT';
}
// detectă legea din contextul citării
function detectLaw(ctx) {
  if (/H\.?G\.?\s*(?:nr\.?\s*)?395|Norm(?:e|ele)[^.]{0,30}395|aplicare a (?:prevederilor )?Legii nr\. 98/i.test(ctx)) return '395';
  if (/H\.?G\.?\s*(?:nr\.?\s*)?394|Norm[^.]{0,30}394/i.test(ctx)) return '394';
  if (/H\.?G\.?\s*(?:nr\.?\s*)?867|Norm[^.]{0,30}867|aplicare a prevederilor referitoare la atribuirea contractelor de concesiune/i.test(ctx)) return '867';
  if (/Legea\s*(?:nr\.?\s*)?101|L\.?\s*101|remedii/i.test(ctx)) return '101';
  if (/Legea\s*(?:nr\.?\s*)?100|L\.?\s*100|concesiun/i.test(ctx)) return '100';
  if (/Legea\s*(?:nr\.?\s*)?99|L\.?\s*99|sectorial/i.test(ctx)) return '99';
  if (/Legea\s*(?:nr\.?\s*)?98|L\.?\s*98/i.test(ctx)) return '98';
  return '?';
}

const FILES = fs.readdirSync(R).filter(f => f.endsWith('.md'));
const rows = [];
const seen = new Set();
for (const f of FILES) {
  const t = fs.readFileSync(path.join(R, f), 'utf8');
  // citare: art. N [alin. (M)] [lit. x)]
  for (const m of t.matchAll(/art\.\s*(\d+)(\s*alin\.\s*\(\s*\d+(?:\^?\d+)?\s*\))?(\s*lit\.\s*[a-z]\))?/gi)) {
    const at = m.index;
    const ctx = t.slice(Math.max(0, at - 90), at + 130).replace(/\s+/g, ' ').trim();
    const law = detectLaw(t.slice(Math.max(0, at - 120), at + 60));
    const key = f + '|' + m[0].replace(/\s+/g, '') + '|' + law;
    if (seen.has(key)) continue; seen.add(key);
    rows.push({ f, cite: m[0].replace(/\s+/g, ' '), alin: !!m[2], law, ctx });
  }
}
// worksheet
let out = `# Worksheet verificare citări referințe\n\n`;
out += `> Pentru fiecare: citarea + ce afirmă referința (context) + TEXTUL REAL al articolului. Caută nepotriviri: categorie greșită (inacceptabilă/neconformă/neadecvată), alineat greșit, lege greșită, articol negăsit/abrogat.\n\n`;
const byFile = {};
for (const r of rows) (byFile[r.f] = byFile[r.f] || []).push(r);
for (const f of Object.keys(byFile).sort()) {
  out += `\n## ${f} (${byFile[f].length} citări)\n\n`;
  for (const r of byFile[f]) {
    const txt = r.law === '?' ? '(lege nedetectată din context)' : artText(r.law, r.cite.match(/\d+/)[0]);
    const snip = (txt || '').slice(0, 320);
    out += `- **${r.cite}** [lege ${r.law}] — context: «…${r.ctx}…»\n  - TEXT REAL: ${snip}${(txt||'').length>320?'…':''}\n`;
  }
}
fs.writeFileSync(OUT, out, 'utf8');
const nolaw = rows.filter(r => r.law === '?').length;
const notfound = rows.filter(r => r.law !== '?' && artText(r.law, r.cite.match(/\d+/)[0]) === 'NEGĂSIT').length;
console.log(`Worksheet: ${OUT}`);
console.log(`Citări distincte: ${rows.length} | lege nedetectată: ${nolaw} | articol NEGĂSIT în lege: ${notfound}`);
console.log('--- citări cu articol NEGĂSIT (verifică legea/numărul) ---');
rows.filter(r => r.law !== '?' && artText(r.law, r.cite.match(/\d+/)[0]) === 'NEGĂSIT').slice(0,20).forEach(r=>console.log(`  ${r.f}: ${r.cite} [L${r.law}]`));
