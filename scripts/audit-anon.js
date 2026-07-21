// audit-anon.js — poartă de confidențialitate peste corpusul de jurisprudență.
// Scanează CNSC + Curți de Apel pentru scurgeri de identitate reziduale.
//   node audit-anon.js                 -> raport (read-only)
//   node audit-anon.js --fix-ids       -> re-aplică anonimizarea pe fișierele cu identificatori
//                                         structurați (CUI/J/IBAN/email/CNP) — sigur, țintit
//   node audit-anon.js --fix-all       -> re-aplică anonimizarea completă pe orice fișier cu scurgeri
// CJUE e exclus (jurisprudență publică UE).
const fs = require('fs');
const path = require('path');
const { anonymize, scan } = require('./anon-lib');

const ROOT = path.join(__dirname, '..', 'references');
const FOLDERS = [
  path.join(ROOT, 'jurisprudenta-cnsc', 'decizii'),
  path.join(ROOT, 'jurisprudenta-ca', 'decizii'),
];
const STRUCT = new Set(['CUI', 'REGCOM', 'CNP', 'IBAN', 'EMAIL']);
const mode = process.argv.includes('--fix-all') ? 'all' : process.argv.includes('--fix-ids') ? 'ids' : 'report';

const totals = {};
let filesWithLeaks = 0, filesFixed = 0, scanned = 0;
const worst = [];

for (const dir of FOLDERS) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.txt'))) {
    const p = path.join(dir, f);
    let t = fs.readFileSync(p, 'utf8');
    scanned++;
    let leaks = scan(t);
    let keys = Object.keys(leaks);
    if (keys.length) {
      filesWithLeaks++;
      for (const k of keys) totals[k] = (totals[k] || 0) + leaks[k].count;
      const hasStruct = keys.some(k => STRUCT.has(k));
      worst.push({ f: path.basename(dir) + '/' + f, keys: keys.map(k => `${k}:${leaks[k].count}`).join(' '), sample: (leaks[keys[0]].samples[0] || '') });
      // fix
      if (mode === 'all' || (mode === 'ids' && hasStruct)) {
        const nt = anonymize(t);
        if (nt !== t) { fs.writeFileSync(p, nt, 'utf8'); filesFixed++; }
      }
    }
  }
}

console.log(`Scanate: ${scanned} fișiere | cu scurgeri: ${filesWithLeaks} | mod: ${mode}${mode !== 'report' ? ` | reparate: ${filesFixed}` : ''}`);
console.log('Totaluri pe categorie:', JSON.stringify(totals));
if (mode !== 'report') {
  // re-scan dupa fix
  let rest = {};
  for (const dir of FOLDERS) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.txt'))) {
      const leaks = scan(fs.readFileSync(path.join(dir, f), 'utf8'));
      for (const k of Object.keys(leaks)) rest[k] = (rest[k] || 0) + leaks[k].count;
    }
  }
  console.log('Reziduu DUPĂ fix:', JSON.stringify(rest));
} else {
  console.log('--- primele 25 fișiere cu scurgeri ---');
  worst.slice(0, 25).forEach(w => console.log(`  ${w.keys.padEnd(28)} ${w.f}  «${String(w.sample).replace(/\s+/g, ' ').slice(0, 40)}»`));
}
// exit code: 1 daca raman identificatori structurati (poarta CI)
const structRest = Object.keys(totals).some(k => STRUCT.has(k));
process.exit(mode === 'report' && structRest ? 1 : 0);
