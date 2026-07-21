// check-facts.js — POARTĂ ANTI-HALUCINAȚIE pentru CITATELE DIN DOSAR (soră cu check-citations.js,
// care acoperă doar legea/jurisprudența). Verifică faptul că fiecare citat între ghilimele atribuit
// unui document din dosar (fișă de date, caiet de sarcini, contract, clarificare...) EXISTĂ literal
// în acel dosar. Un citat de dosar fabricat e cea mai gravă eroare (vezi sesiunea „Gab Pavolux").
//   node check-facts.js <draft.txt|.md|.docx> <folder-dosar>
const fs = require('fs');
const path = require('path');
const { fullText, normFlat, walkDocs } = require('./extract-lib');

const [, , draftPath, dossierDir] = process.argv;
if (!draftPath || !dossierDir) { console.error('Folosire: node check-facts.js <draft> <folder-dosar>'); process.exit(2); }
if (!fs.existsSync(draftPath) || !fs.existsSync(dossierDir)) { console.error('Draft sau folder inexistent.'); process.exit(2); }

(async () => {
  // 1) corpus dosar: text integral al tuturor documentelor, indexat pe fișier
  const docs = walkDocs(dossierDir);
  const dossier = [];
  for (const f of docs) {
    try { const { text } = await fullText(f); if (text) dossier.push({ file: path.basename(f), flat: normFlat(text) }); }
    catch (e) { /* format neacceptat — ignoră */ }
  }
  if (!dossier.length) { console.error('Niciun document lizibil în dosar (' + docs.length + ' fișiere).'); process.exit(2); }

  // corpus legal (legislație + jurisprudență bundle-uită) pentru EXCEPȚIE: citatele de lege/decizie
  // sunt treaba lui check-citations.js, nu se flaghează aici.
  const REF = path.join(__dirname, '..', 'references');
  let legal = '';
  for (const sub of ['legislatie', 'jurisprudenta-iccj', 'jurisprudenta-cjue/texte-integrale']) {
    const d = path.join(REF, sub);
    if (!fs.existsSync(d)) continue;
    for (const f of walkDocs(d)) { try { legal += '\n' + fs.readFileSync(f, 'utf8'); } catch (e) {} }
  }
  const legalFlat = normFlat(legal);

  // 2) citate din draft + contextul de atribuire (0-60 car. înainte)
  const { text: draftText } = await fullText(draftPath);
  const quotes = [];
  const QRE = /[„"«]([\s\S]{25,1200}?)["»"]/g;
  let m;
  while ((m = QRE.exec(draftText)) !== null) {
    const quote = m[1].trim();
    if (quote.length < 25) continue;
    const attr = draftText.slice(Math.max(0, m.index - 60), m.index).replace(/\s+/g, ' ').trim();
    quotes.push({ quote, attr });
  }

  // 3) verificare: literal (normalizat) sau fuzzy (fereastră de ≥12 cuvinte consecutive)
  function findIn(corpusFlat, qFlat) {
    if (corpusFlat.includes(qFlat)) return true;
    const w = qFlat.split(' ').filter(Boolean);
    if (w.length < 12) return false;
    for (let i = 0; i + 12 <= w.length; i++) {
      if (corpusFlat.includes(w.slice(i, i + 12).join(' '))) return true;
    }
    return false;
  }

  let ok = 0, warn = 0, legalSkip = 0;
  console.log(`\n=== Verificare citate-din-dosar: ${path.basename(draftPath)} (dosar: ${dossier.length} doc.) ===`);
  if (!quotes.length) console.log('  · (niciun citat între ghilimele > 25 car.)');
  for (const q of quotes) {
    const qFlat = normFlat(q.quote);
    const hit = dossier.find(d => findIn(d.flat, qFlat));
    if (hit) { ok++; console.log(`  ✓ regăsit în ${hit.file} — „${q.quote.slice(0, 60)}…"`); continue; }
    if (findIn(legalFlat, qFlat)) { legalSkip++; continue; } // text de lege/decizie → check-citations
    warn++;
    console.log(`  ⚠ CITAT NEREGĂSIT ÎN DOSAR — „${q.quote.slice(0, 80)}…"  [atribuit: «${q.attr || '—'}»]`);
  }
  console.log(`\nRezumat: ${ok} regăsite · ${warn} neregăsite · ${legalSkip} text de lege (→ check-citations)`);
  if (warn) console.log('ATENȚIE: citatele ⚠ NU există în dosar. Regăsește-le în fișierul-sursă, scoate-le sau marchează [DE COMPLETAT]. Un citat de dosar se redă DOAR după regăsire literală.');
  process.exit(warn ? 1 : 0);
})();
