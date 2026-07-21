// suggest-jurisprudenta.js — sugerează spețe REALE pe o temă, ca să nu rămână „[DE COMPLETAT cu speță]"
// nefolosit. Citește references/jurisprudenta-index-teme.md, găsește tema cea mai apropiată de keyword,
// rulează rețeta ei de grep peste corpusul local (CNSC + CA) și scoate candidați cu un extras din
// MOTIVARE (nu doar numărul deciziei) — verifici ratio-ul, nu doar existența.
//
//   node scripts/suggest-jurisprudenta.js "tardivitate documentatie"
//   node scripts/suggest-jurisprudenta.js --list        (listează temele disponibile)
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'references');
const INDEX = path.join(R, 'jurisprudenta-index-teme.md');

const arg = process.argv[2];
if (!arg) { console.error('Folosire: node scripts/suggest-jurisprudenta.js "<temă/keyword>" | --list'); process.exit(2); }

const idx = fs.readFileSync(INDEX, 'utf8');
// împarte pe teme: fiecare bloc începe cu "## " și se termină la următorul "## " sau la separator "---"
const blocks = [];
const re = /^## (.+)$/gm;
let m, positions = [];
while ((m = re.exec(idx))) positions.push({ title: m[1].trim(), start: m.index });
for (let i = 0; i < positions.length; i++) {
  const start = positions[i].start;
  const end = i + 1 < positions.length ? positions[i + 1].start : idx.length;
  blocks.push({ title: positions[i].title, text: idx.slice(start, end) });
}

if (arg === '--list') {
  console.log(`${blocks.length} teme disponibile:\n`);
  blocks.forEach(b => console.log(`  - ${b.title}`));
  process.exit(0);
}

// scor de potrivire simplu: cuvinte din keyword găsite în titlu sau în corpul temei (normă, CJUE, grep)
const words = arg.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/\s+/).filter(Boolean);
function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
const scored = blocks.map(b => {
  const hay = norm(b.title + ' ' + b.text);
  const score = words.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
  return { ...b, score };
}).filter(b => b.score > 0).sort((a, b) => b.score - a.score);

if (!scored.length) {
  console.log(`Nicio temă din index nu se potrivește cu „${arg}". Rulează --list pentru teme disponibile,`);
  console.log(`sau caută manual: grep -ril "cuvânt-cheie" references/jurisprudenta-c{nsc,a}/decizii/`);
  process.exit(1);
}

const best = scored[0];
console.log(`=== Temă: ${best.title} (scor potrivire ${best.score}/${words.length}) ===\n`);
if (scored.length > 1) {
  console.log(`(teme alternative apropiate: ${scored.slice(1, 4).map(s => s.title).join(' · ')})\n`);
}

const normaM = best.text.match(/\*\*Normă internă:\*\*\s*(.+)/);
const cjueM = best.text.match(/\*\*CJUE \(reper, primează\):\*\*\s*(.+)/);
const grepM = best.text.match(/`grep\s+-\S+\s+"(.+?)"\s+(\S+)`/);
if (normaM) console.log(`Normă internă: ${normaM[1]}`);
if (cjueM) console.log(`CJUE (reper, verifică pe ratio înainte de a cita): ${cjueM[1]}`);
console.log('');

if (!grepM) {
  console.log('(temă găsită, dar fără rețetă de grep în index — caută manual în jurisprudenta-cnsc/ și -ca/)');
  process.exit(0);
}
const pattern = grepM[1];
let regex;
try { regex = new RegExp(pattern, 'i'); } catch (e) { console.error('Regex invalid în index:', pattern); process.exit(1); }

function scanDir(dir, label) {
  if (!fs.existsSync(dir)) return [];
  const hits = [];
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.txt'))) {
    const t = fs.readFileSync(path.join(dir, f), 'utf8');
    const mm = t.match(regex);
    if (mm) {
      const s = Math.max(0, mm.index - 80);
      const excerpt = t.slice(s, mm.index + 220).replace(/\s+/g, ' ').trim();
      hits.push({ file: f.replace('.txt', ''), label, excerpt });
    }
  }
  return hits;
}

const cnsc = scanDir(path.join(R, 'jurisprudenta-cnsc', 'decizii'), 'CNSC');
const ca = scanDir(path.join(R, 'jurisprudenta-ca', 'decizii'), 'CA');
const all = [...cnsc, ...ca];

console.log(`Candidați găsiți în corpus: ${cnsc.length} CNSC, ${ca.length} CA (din rețeta de grep a temei).\n`);
if (!all.length) {
  console.log('Niciun candidat mecanic — verifică manual în jurisprudenta-index-teme.md protocolul de fallback.');
  process.exit(0);
}
all.slice(0, 8).forEach(h => {
  console.log(`[${h.label}] ${h.file}`);
  console.log(`  …${h.excerpt}…\n`);
});
console.log(`ATENȚIE: excerptul e context de grep, NU motivarea integrală — deschide fișierul, citește`);
console.log(`considerentul complet și aplică testul de potrivire a RATIO-ului (harta-combatere.md) înainte de a cita.`);
if (all.length > 8) console.log(`(+${all.length - 8} candidați suplimentari, nu afișați)`);
