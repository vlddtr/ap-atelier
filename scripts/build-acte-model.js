// build-acte-model.js — construiește biblioteca de EXEMPLARE DE STIL din colecția locală de
// acte-model (Modele/): extrage textul, îl ANONIMIZEAZĂ determinist (anon-lib + scrub pe numele
// de clienți derivate din denumirile fișierelor + listă manuală), redenumește fără nume de
// clienți și scrie totul în references/acte-model/ — SIGUR de comis în repo.
//
// De ce: skill-ul se distribuie pe dispozitive prin git; colecția brută conține nume reale de
// clienți (interzise în repo, regulă HARD) — aici intră doar versiunea anonimizată.
//
//   node scripts/build-acte-model.js [<folder-sursă>]        (implicit: OneDrive/Desktop/Data/Modele)
const fs = require('fs');
const path = require('path');
const os = require('os');
const { anonymize } = require('./anon-lib');
const { fullText } = require('./extract-lib');

const SRC = process.argv[2] || path.join(os.homedir(), 'OneDrive', 'Desktop', 'Data', 'Modele');
const OUT = path.join(__dirname, '..', 'references', 'acte-model');
if (!fs.existsSync(SRC)) { console.error('Folder sursă inexistent:', SRC); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });

// Tokenii de client sunt EXTERNALIZAȚI în setup/tokens-clienti.local.txt (gitignored) — lista
// numelor de protejat nu poate sta într-un fișier urmărit de git (ar fi ea însăși scurgerea, prinsă
// la auditul de publicare din 12.07.2026). Scriptul refuză să ruleze fără listă.
const TOKENS_FILE = path.join(__dirname, '..', 'setup', 'tokens-clienti.local.txt');
if (!fs.existsSync(TOKENS_FILE)) {
  console.error('EROARE: lipsește ' + TOKENS_FILE + ' (gitignored, per mașină). Fără lista de tokeni,');
  console.error('anonimizarea e incompletă — nu rulez. Recuperează lista de pe mașina principală.');
  process.exit(1);
}
const MANUAL_TOKENS = fs.readFileSync(TOKENS_FILE, 'utf8').split('\n')
  .map(l => l.trim()).filter(l => l && !l.startsWith('#'));
function scrubTokens(t, extraTokens) {
  for (const tok of [...MANUAL_TOKENS, ...extraTokens]) {
    if (tok.length < 3) continue;
    const esc = tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // graniță de cuvânt obligatorie — altfel „ONV" mutilează „convențional" etc.
    t = t.replace(new RegExp('\\b' + esc + '\\b', 'gi'), '[PARTE]');
  }
  // persoane introduse cu titulatură (dl/dna/domnul/doamna + Nume Prenume)
  t = t.replace(/\b(dl|dna|domnul|doamna|dl\.|dna\.)\s+[A-ZȘȚĂÂÎ][\p{L}\-]+(?:\s+[A-ZȘȚĂÂÎ][\p{L}\-]+){0,2}/gu, '$1 [PERSOANĂ]');
  // nr. Registrul Comerțului în format nou (J + 13 cifre, ex. J<an><secvență>) — scapă regexului J xx/xxxx/yyyy
  t = t.replace(/\bJ\d{12,14}\b/g, '[REG COM]');
  // adresa de sediu a părții: consumă segmentele de adresă (virgule) până la primul segment care
  // începe cu un cuvânt de continuare juridică (înregistrată/având/reprezentată/e-mail/tel/unde...)
  t = t.replace(/(cu sediul(?:\s+(?:social|procesual\s+ales|profesional))?\s+(?:în|la)\s+)[^,;.]+(?:,\s*(?!înregistrat|avân|CUI|reprezentat|e-?mail|tel|fax|unde|prin\b)[^,;.]+)*/gi, '$1[ADRESĂ]');
  // adrese DETALIATE (stradă + nr + bloc/scară/etaj/ap/cameră) oriunde ar apărea (sediu procesual ales
  // „la Cabinet X în Oraș, Str. ..."). Numele străzii poate conține punct („Prof. Ion Bogdan").
  // Adresele simple ale instituțiilor publice (CNSC etc.) rămân — repere publice.
  t = t.replace(/\b(?:Str(?:ada)?|Bd(?:ul)?|B-dul|Bulevardul|Aleea|Calea|Șos(?:eaua)?|Intrarea|Pia[țt]a|Splaiul)\.?\s+[^,;]{2,45}?nr\.?\s*\d+[A-Za-z]?(?:\s*[-–]\s*\d+)?(?:\s*,?\s*(?:bl\.|Bloc|sc\.|Scara|et\.|Etaj|ap\.|Ap\.|Camera|camera)\s*[A-Za-z0-9\-]+\.?)+/giu, '[ADRESĂ]');
  // avocați numiți fără titulatură dl/dna: „prin avocat(i) Nume Prenume (și Nume Prenume)"
  t = t.replace(/\b(avoca[țt](?:i|ul|ii)?|av\.)\s+[A-ZĂÂÎȘȚ][\p{L}\-]+(?:\s+[A-ZĂÂÎȘȚ][\p{L}\-]+){0,2}(?:\s+și\s+[A-ZĂÂÎȘȚ][\p{L}\-]+(?:\s+[A-ZĂÂÎȘȚ][\p{L}\-]+){0,2})?/gu, '$1 [AVOCAT]');
  // colapsează artefacte de dublă mascare
  t = t.replace(/\[PARTE\](\s*[-–]?\s*\[PARTE\])+/g, '[PARTE]').replace(/\[OPERATOR ECONOMIC\](\s*[-–]?\s*\[PARTE\])+/g, '[OPERATOR ECONOMIC]');
  return t;
}
// tokeni de client din DENUMIREA fișierului: cuvintele capitalizate care nu sunt termeni de tip act
const TYPEWORDS = /^(contestatie|contestație|cerere|de|interventie|intervenție|voluntara|voluntară|intampinare|întâmpinare|plangere|plângere|concluzii|scrise|adresa|adresă|recurs|memo|actiune|acțiune|obiectiuni|obiecțiuni|raspuns|răspuns|legal|opinion|analiza|analiză|draft|procedura|procedură|dosar|lot|id|sb|vd|ab|ar|as|ad|ap|la|nr|d|final|cln|rev|clean|partial|semnat|signed|vs|si|și)$/i;
function tokensFromFilename(name) {
  return name.replace(/\(ID \d+\)/gi, '').replace(/\.(docx?|pdf)$/i, '')
    .split(/[\s_\-.,+()\[\]]+/).filter(w => /^[A-ZȘȚĂÂÎ]/.test(w) && w.length >= 3 && !TYPEWORDS.test(w) && !/^\d/.test(w));
}
// tip de act + an + ID din denumire → slug anonim
function slugFor(name) {
  const low = name.toLowerCase();
  const type =
    low.includes('interventie') || low.includes('intervenție') ? 'cerere-interventie' :
    low.startsWith('contestatie') || low.startsWith('contestație') || low.includes('contestatie ') ? 'contestatie' :
    low.includes('intampinare') || low.includes('întâmpinare') ? 'intampinare' :
    low.includes('plangere') || low.includes('plângere') || low.includes('pl�ngere') ? 'plangere' :
    low.includes('concluzii') ? 'concluzii-scrise' :
    low.includes('recurs') ? 'recurs' :
    low.includes('adresa') || low.includes('adresă') ? 'adresa' :
    low.includes('memo') ? 'memo' :
    low.includes('legal opinion') ? 'legal-opinion' :
    low.includes('obiectiuni') || low.includes('obiecțiuni') ? 'obiectiuni-expertiza' :
    low.includes('actiune') || low.includes('acțiune') ? 'actiune-anulare' :
    low.includes('raspuns') || low.includes('răspuns') ? 'raspuns-clarificari' :
    low.includes('analiza') || low.includes('analiză') ? 'analiza' :
    low.includes('cautiune') || low.includes('cau?iune') || low.includes('cauțiune') ? 'adresa-cautiune' :
    low.includes('sf ') ? 'studiu' : 'act';
  const ym = name.match(/(\d{2})[.\-](\d{2})[.\-](20\d{2})/); // dd.mm.yyyy
  const y = ym ? `${ym[3]}-${ym[2]}` : (name.match(/20\d{2}/) || ['fara-data'])[0];
  const id = (name.match(/ID (\d+)/i) || [])[1];
  return `${type}-${y}${id ? '-id' + id : ''}`;
}

const files = fs.readdirSync(SRC).filter(f => /\.(docx?|doc)$/i.test(f));
(async () => {
  const index = []; const skipped = []; const seen = new Set();
  for (const f of files) {
    let slug = slugFor(f); let n = 2;
    while (seen.has(slug)) slug = slugFor(f) + '-' + n++;
    seen.add(slug);
    let text = '';
    try { const r = await fullText(path.join(SRC, f)); text = r.text || ''; } catch (e) { /* cade mai jos */ }
    if (!text || text.length < 500) { skipped.push({ f, slug, motiv: text ? 'text prea scurt' : '.doc binar/ilizibil' }); continue; }
    const anon = scrubTokens(anonymize(text), tokensFromFilename(f));
    fs.writeFileSync(path.join(OUT, slug + '.txt'), anon, 'utf8');
    index.push({ slug, chars: anon.length });
  }
  // index fără nume de clienți
  let md = `# Acte-model (exemplare de stil, ANONIMIZATE)\n\n> Generat cu \`scripts/build-acte-model.js\` din colecția locală de modele (nume reale de clienți\n> eliminate determinist — regulă HARD). Folosire: sursa amprentei de stil (\`stil-corectii-chatgpt.md\` §12)\n> — la redactarea unui tip de act, citește 1-2 exemplare de același tip de aici.\n\n`;
  const byType = {};
  for (const e of index) (byType[e.slug.replace(/-20\d{2}.*$/, '').replace(/-fara-data.*$/, '')] = byType[e.slug.split('-2')[0]] || []).push(e);
  for (const t of Object.keys(byType).sort()) {
    md += `## ${t} (${byType[t].length})\n`;
    for (const e of byType[t].sort((a, b) => a.slug.localeCompare(b.slug))) md += `- ${e.slug}.txt (${Math.round(e.chars / 1000)}k)\n`;
    md += '\n';
  }
  if (skipped.length) { md += `## Neincluse (${skipped.length})\n`; for (const s of skipped) md += `- ${s.slug}: ${s.motiv}\n`; }
  fs.writeFileSync(path.join(OUT, 'INDEX.md'), md, 'utf8');
  console.log(`Scrise: ${index.length} exemplare anonimizate în references/acte-model/ · sărite: ${skipped.length}`);
  skipped.forEach(s => console.log(`  sărit: ${s.f} (${s.motiv})`));
})();
