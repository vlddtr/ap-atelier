// gate.js — POARTA UNICĂ de pre-livrare (definiția lui „GATA"). Rulează TOATE porțile aplicabile
// într-o singură comandă și scoate un verdict + o linie de raportat utilizatorului. Motiv: porțile
// separate, cerute în proză, se sar („am produs textul = gata"). O comandă + un verdict + raportare
// obligatorie transformă săritura tăcută în N/A onest vizibil.
//   node scripts/gate.js <act.txt|md> [folder-dosar]
// Un act NU e „final" până nu trece pe aici (sau marchezi explicit ce e N/A).
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [, , act, dosar] = process.argv;
if (!act || !fs.existsSync(act)) { console.error('Folosire: node scripts/gate.js <act.txt> [folder-dosar]'); process.exit(2); }
const S = __dirname;
function run(script, args) {
  try { return { ok: true, out: execFileSync('node', [path.join(S, script), ...args], { encoding: 'utf8' }) }; }
  catch (e) { return { ok: false, out: (e.stdout || '') + (e.stderr || '') }; }
}

const report = [];
let hardFail = false;

// 1) STIL (lint.js — nu are exit code; parsăm nr. de semnalări)
const lint = run('lint.js', [act]);
const nSem = (lint.out.match(/LINT STIL — (\d+) semnal/) || [, '?'])[1];
const lintOk = nSem === '0';
report.push({ poarta: 'stil (lint)', stare: lintOk ? '✓' : `⚠ ${nSem} semnalări`, detaliu: lintOk ? '' : 'corectează sau confirmă că-s în citate' });
if (!lintOk) hardFail = true;

// 2) ANTI-HALUCINAȚIE (check-citations.js — exit!=0 dacă rămân neconfirmate)
const cit = run('check-citations.js', [act]);
const citWarn = /· (\d+) de verificat/.exec(cit.out);
const citOk = cit.ok && (!citWarn || citWarn[1] === '0');
report.push({ poarta: 'citări lege/jurisprudență', stare: citOk ? '✓' : `⚠ ${citWarn ? citWarn[1] : '?'} neconfirmate`, detaliu: citOk ? '' : 'verifică în sursa primară sau scoate' });
if (!citOk) hardFail = true;

// 3) FAPTE DIN DOSAR (check-facts.js — necesită folder-dosar cu text extractibil)
if (dosar) {
  const facts = run('check-facts.js', [act, dosar]);
  if (/Niciun document lizibil/.test(facts.out)) {
    report.push({ poarta: 'citate din dosar', stare: 'N/A', detaliu: 'dosar fără text extractibil (scanuri) — transcrie vizual + marchează „de verificat pe SEAP/sursă"' });
  } else {
    const fWarn = /· (\d+) neregăsite/.exec(facts.out);
    const fOk = facts.ok && (!fWarn || fWarn[1] === '0');
    report.push({ poarta: 'citate din dosar', stare: fOk ? '✓' : `⚠ ${fWarn ? fWarn[1] : '?'} neregăsite`, detaliu: fOk ? '' : 'regăsește literal în fișier, scoate sau [DE COMPLETAT]' });
    if (!fOk) hardFail = true;
  }
} else {
  report.push({ poarta: 'citate din dosar', stare: 'N/A', detaliu: 'nu s-a dat folder-dosar (rulează cu <folder> dacă actul citează din dosar)' });
}

// 4) HARTA PROBATORIE (doar cu folder-dosar) — dacă în dosar EXISTĂ un raport al procedurii /
// proces-verbal de evaluare, iar actul nu-l citează nicăieri, actul e probabil redactat doar din
// actul advers (defect real: intervenție scrisă din contestație, fără raport — deși raportul era
// în folder). Condiționat de prezența REALĂ a documentului: intervenientul adesea NU are raportul
// la depunere (îl obține prin art. 19 L101) — atunci nu se flaghează nimic.
if (dosar && fs.existsSync(dosar)) {
  const dosarFiles = [];
  (function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else dosarFiles.push(f.name); } })(dosar);
  const raportInDosar = dosarFiles.some(f => /raport(ul)?[ _-]?(de[ _-]?atribuire|proced|interm)|proces[ _-]?verbal|\bPV\b/i.test(f));
  if (raportInDosar) {
    const actTxt = fs.readFileSync(act, 'utf8');
    const citesEval = /raport(?:ul)? (?:de atribuire|procedurii|intermediar)|proces(?:ul)?[- ]verbal/i.test(actTxt);
    report.push({
      poarta: 'harta probatorie',
      stare: citesEval ? '✓' : '⚠ raport necitat',
      detaliu: citesEval ? '' : 'dosarul CONȚINE raportul/PV-ul, dar actul nu-l citează nicăieri — reia harta probatorie per motiv (analiza-ansamblu.md)',
    });
    if (!citesEval) hardFail = true;
  }
}

// 5) JURISPRUDENȚĂ FOLOSITĂ — criteriul măsurat cel mai slab pe trei notări (5/10, 3/10, 3/10):
// un act argumentativ lung cu ZERO citări de jurisprudență înseamnă aproape sigur că
// suggest-jurisprudenta.js nu a fost rulat per motiv. Supapa onestă: dacă actul declară explicit
// golul („nu există în corpusul inclus pe acest punct" — protocolul de fallback), poarta trece.
{
  const actTxt = fs.readFileSync(act, 'utf8');
  const isArgAct = /contestați[ae]|cerere de interven[țt]ie|punct de vedere|întâmpinare|intampinare|plângere|plangere|concluzii/i.test(actTxt.slice(0, 2500));
  if (isArgAct && actTxt.length > 8000) {
    const citesJur = /\bBO\d{4}_\d+\b|\b[CT]-\d{1,4}\/\d{2,4}\b|Decizia (?:nr\.|civilă)|Consiliul a (?:statuat|reținut)|jurispruden[țt]a (?:CNSC|constant)/i.test(actTxt);
    const declaresGap = /nu există în corpusul inclus|nu am identificat (?:o |vreo )?(?:decizie|speț[ăa])|fără jurisprudență pe (?:acest )?punct/i.test(actTxt);
    report.push({
      poarta: 'jurisprudență',
      stare: citesJur ? '✓' : declaresGap ? 'N/A' : '⚠ 0 citări',
      detaliu: citesJur ? '' : declaresGap ? 'gol declarat explicit în act (protocolul de fallback)' : 'act argumentativ lung fără nicio speță — rulează `suggest-jurisprudenta.js "<temă>"` per motiv sau declară explicit golul în act',
    });
    if (!citesJur && !declaresGap) hardFail = true;
  }
}

// 6) REMINDER neverificabil mecanic
console.log('\n===== POARTA DE PRE-LIVRARE =====');
for (const r of report) console.log(`  ${r.stare.padEnd(16)} ${r.poarta}${r.detaliu ? '  — ' + r.detaliu : ''}`);
console.log('\n  [!] NEVERIFICABIL MECANIC (confirmă manual): ai citit `stil-corectii-chatgpt.md` ÎNAINTE de redactare?');
console.log('      opoziția fără conector („Nu X. Y."), altitudinea (la plângere), fondul juridic — cer re-citire semantică.');

const line = 'Porți pre-livrare: ' + report.map(r => `${r.poarta.split(' ')[0]} ${r.stare.startsWith('✓') ? '✓' : r.stare.startsWith('N/A') ? 'N/A' : '⚠'}`).join(' | ');
console.log('\n→ LINIE DE RAPORTAT UTILIZATORULUI (obligatoriu la livrare):');
console.log('  ' + line);
console.log('\n' + (hardFail ? '✗ NU E FINAL — sunt porți ⚠. Corectează, apoi re-rulează. Nu prezenta actul ca gata.' : '✓ Porțile mecanice trec. Rămâne re-citirea semantică (stil + fond) înainte de livrare.'));
process.exit(hardFail ? 1 : 0);
