// mine-blocuri.js — minare chirurgicală de blocuri argumentative din corpusul de acte ale firmei.
// Caută pe TEMĂ (regex), scoate fișier + fereastră de context; NU copiază nimic — doar semnalează
// candidații, curatoria o face redactorul citind fragmentul integral.
//   node scripts/mine-blocuri.js <tema-key> [maxHits]   (corpus: env BAZA_CNSC sau calea implicită OneDrive)
const fs = require('fs');
const path = require('path');
const { fullText } = require('./extract-lib.js');

const SRC = process.env.BAZA_CNSC ? process.env.BAZA_CNSC + '/word_achizitii_originale' : 'C:/Users/avdum/OneDrive/Desktop/Achizitii/Achizitii/baza_cnsc/word_achizitii_originale';
const MANIFEST = (process.env.BAZA_CNSC || 'C:/Users/avdum/OneDrive/Desktop/Achizitii/Achizitii/baza_cnsc') + '/jurnal/word_achizitii_copiate_manifest.csv';

const THEMES = {
  'tot-unitar': /ansamblul?\s+(?:său|sau|ei|ofertei)|tot\s+unitar|întreg(?:ul)?\s+conținut|intreg(?:ul)?\s+continut|nu\s+(?:e|este)\s+(?:datoria|obligația|obligatia|ținută|tinuta)\s+(?:comisiei|să\s+identifice)|reconstitui/i,
  'clarificari-modificare': /modific[ăa](?:re|rea)?\s+(?:a\s+)?(?:propunerii|ofertei)|art\.?\s*134\s*alin|răspuns(?:ul)?(?:urile)?\s+la\s+clarific[^.]{0,60}modific/i,
  'pret-neobisnuit': /pre[țt](?:ul)?\s+(?:aparent\s+)?neobi[șs]nuit|anormal\s+de\s+sc[ăa]zut|art\.?\s*210\b|justificar[ea]+\s+pre[țt]ului/i,
  'experienta-similara': /experien[țt][ăa]\s+similar[ăa]|livr[ăa]ri\s+de\s+produse\s+similare|servicii\s+similare/i,
  'vicii-forma': /vici(?:u|i)(?:le)?\s+de\s+form[ăa]|art\.?\s*13[45]\s*alin\.?\s*\(3\)|corectare[a]?\/completare/i,
  'garantie-participare': /garan[țt]i[ea]\s+de\s+participare|garan[țt]i[ea]\s+de\s+bun[ăa]\s+execu[țt]ie/i,
  'tardivitate': /tardiv[ăa]?|termen(?:ul)?\s+de\s+contestare|dec[ăa]dere/i,
  'clarificari-transate': /prin\s+(?:răspunsul|raspunsul)\s+(?:consolidat|la\s+solicitarea)|clarificarea\s+din\s+oficiu/i,
  'factori-evaluare': /factor(?:i|ul)?\s+de\s+evaluare|criteriu(?:l)?\s+de\s+atribuire|punctaj(?:ul)?\s+(?:tehnic|maxim)/i,
  'anulare': /anular[ea]+\s+procedurii|art\.?\s*212|art\.?\s*225/i,
};

const [, , themeKey, maxArg] = process.argv;
if (!themeKey || !THEMES[themeKey]) { console.log('Teme:', Object.keys(THEMES).join(' · ')); process.exit(1); }
const re = THEMES[themeKey];
const MAX = parseInt(maxArg || '25', 10);

// prioritizează după tipul din manifest: contestatii/concluzii/interventii/pdv întâi
const manifest = fs.readFileSync(MANIFEST, 'utf8').split('\n');
const priority = [];
for (const l of manifest.slice(1)) {
  const isAct = /contestat|concluzii|interventie|intervenție|punct de vedere|intampinare|întâmpinare|plangere|plângere/i.test(l);
  if (!isAct) continue;
  // ultima coloană cu .docx local — extrage numele fișierului local
  const m = l.match(/([^,\\\/"]+\.docx)/gi);
  if (m) priority.push(m[m.length - 1]);
}
const uniq = [...new Set(priority)].filter(f => fs.existsSync(path.join(SRC, f)));
console.log(`Temă: ${themeKey} · acte de procedură candidate din manifest: ${uniq.length}`);

(async () => {
  let hits = 0;
  for (const f of uniq) {
    if (hits >= MAX) break;
    let t = '';
    try { t = (await fullText(path.join(SRC, f))).text || ''; } catch (e) { continue; }
    if (t.length < 2000) continue;
    const m = t.match(re);
    if (!m) continue;
    hits++;
    const i = t.search(re);
    console.log(`\n### ${f} (${Math.round(t.length / 1000)}k) @${i}`);
    console.log(t.slice(Math.max(0, i - 200), i + 500).replace(/\s+/g, ' ').trim());
  }
  console.log(`\n=== ${hits} candidați afișați (max ${MAX}) ===`);
})();
