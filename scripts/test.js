// test.js — suite de REGRESIE pentru porțile mecanice. Fiecare caz = un bug real reparat;
// dacă un test pică, poarta respectivă a regresat și nu mai e de încredere.
//   node scripts/test.js        (exit 0 = toate trec)
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const S = __dirname;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-test-'));
let pass = 0, fail = 0;

function run(script, args) {
  try { return execFileSync('node', [path.join(S, script), ...args], { encoding: 'utf8' }); }
  catch (e) { return (e.stdout || '') + (e.stderr || ''); }
}
function fixture(name, content) { const p = path.join(TMP, name); fs.writeFileSync(p, content, 'utf8'); return p; }
function T(desc, ok) { if (ok) { pass++; console.log('  ✓ ' + desc); } else { fail++; console.log('  ✗ ' + desc); } }

console.log('=== check-citations.js (bug: „alin." bloca filler-ul; art. dublu spre aceeași lege) ===');
{
  const p = fixture('cit1.md', 'Temeiul este art. 209 alin. (5) lit. b) din Legea nr. 99/2016, verificat.\n');
  const out = run('check-citations.js', [p]);
  T('citare cu „alin." + „lit." în filler e detectată (art. 209 L99)', /art\. 209 L99/.test(out));
}
{
  const p = fixture('cit2.md', 'Potrivit art. 178 alin. (1) și art. 179 din Legea nr. 99/2016, cerințele sunt legale.\n');
  const out = run('check-citations.js', [p]);
  T('două articole spre ACEEAȘI mențiune de lege → ambele detectate', /art\. 178 L99/.test(out) && /art\. 179 L99/.test(out));
}

console.log('=== lint.js (opoziție, deschideri repetitive, cratimă, sursă după citat) ===');
{
  const p = fixture('l1.txt', 'Oferta este conformă, iar nu inacceptabilă, potrivit art. 137.\n');
  T('„iar nu" e flagat (§16)', /iar nu/.test(run('lint.js', [p])));
}
{
  const para = 'Avizul conform condiționat a dispus măsura de remediere privind reformularea cerinței, astfel cum rezultă din documentele procedurii analizate integral.';
  const p = fixture('l2.txt', para + '\n\n' + para.replace('reformularea', 'eliminarea') + '\n');
  T('deschideri repetitive între secțiuni sunt flagate', /deschideri repetitive/.test(run('lint.js', [p])));
}
{
  const s = 'Cerința este legală — potrivit documentației — astfel cum rezultă. ';
  const filler = 'Autoritatea contractantă a analizat oferta depusă în termen. ';
  const p = fixture('l3.txt', (s + filler.repeat(2)).repeat(3) + '\n');
  T('densitatea cratimei lungi e flagată (§12)', /densitate cratimă/.test(run('lint.js', [p])));
}
{
  const bad = fixture('l4.txt', 'Comisia a reținut: „ofertantul nu a nominalizat procedura de lucru” (Raportul procedurii nr. 6713/23.06.2026, pag. 19). Critica e nefondată.\n');
  const good = fixture('l5.txt', 'Comisia a reținut:\n\nRaportul procedurii nr. 6713/23.06.2026, pag. 19: „ofertantul nu a nominalizat procedura de lucru”.\n\nCritica e nefondată.\n');
  T('sursa în paranteză DUPĂ citat e flagată (§10)', /sursă după citat/.test(run('lint.js', [bad])));
  T('formatul §10 corect (sursa în capul paragrafului de citat) NU e flagat', !/sursă după citat/.test(run('lint.js', [good])));
}

console.log('=== gate.js (harta probatorie, condiționată de prezența raportului în dosar) ===');
{
  const dosar = path.join(TMP, 'dosar'); fs.mkdirSync(dosar, { recursive: true });
  fs.writeFileSync(path.join(dosar, 'Raportul procedurii nr 100.txt'), 'continut raport de evaluare\n', 'utf8');
  const fara = fixture('g1.txt', 'CERERE DE INTERVENȚIE\n\nContestatoarea critică rezultatul procedurii. Susținerile sunt nefondate.\n');
  const cu = fixture('g2.txt', 'CERERE DE INTERVENȚIE\n\nRaportul procedurii nr. 100, pag. 3, consemnează constatarea comisiei. Susținerile sunt nefondate.\n');
  T('raport în dosar + act care NU-l citează → ⚠', /raport necitat/.test(run('gate.js', [fara, dosar])));
  T('raport în dosar + act care ÎL citează → ✓', !/raport necitat/.test(run('gate.js', [cu, dosar])));
  T('fără folder-dosar → poarta hărții probatorii nu apare', !/harta probatorie/.test(run('gate.js', [fara])));
}

console.log('=== gate.js (poarta de jurisprudență pe acte argumentative lungi) ===');
{
  const filler = 'Autoritatea contractantă a analizat oferta depusă în termen, potrivit documentației de atribuire aplicabile procedurii. '.repeat(80);
  const fara = fixture('j1.txt', 'CONTESTAȚIE\n\n' + filler);
  const cuBO = fixture('j2.txt', 'CONTESTAȚIE\n\nÎn același sens, BO2024_1456 reține. ' + filler);
  const cuGol = fixture('j3.txt', 'CONTESTAȚIE\n\nNu există în corpusul inclus pe acest punct o speță aplicabilă. ' + filler);
  T('act argumentativ lung fără nicio speță → ⚠', /jurispruden[țt][ăa].*⚠|⚠ 0 citări/.test(run('gate.js', [fara])));
  T('act cu citare BO → ✓', !/⚠ 0 citări/.test(run('gate.js', [cuBO])));
  T('gol declarat explicit (protocol fallback) → N/A, nu ⚠', !/⚠ 0 citări/.test(run('gate.js', [cuGol])));
}

console.log('=== verify-refs (canar: fereastra artText nelimitată pe articole lungi) ===');
{
  // bug reparat: fereastra {0,900} dădea fals NEGĂSIT pe articole lungi (art. 3 HG395)
  const t = fs.readFileSync(path.join(S, '..', 'references', 'legislatie', 'hg-395-2016-norme-oficial-legislatie-just-ro.txt'), 'utf8');
  const m = t.match(new RegExp('Art(?:icolul)?\\.?\\s*3\\b[\\s\\S]*?(?=Art(?:icolul)?\\.?\\s*\\d+\\b|$)'));
  T('art. 3 HG395 (multi-alineat) e regăsit integral cu fereastra nelimitată', !!m && m[0].includes('Referatul de necesitate'));
}

console.log('=== suggest-jurisprudenta.js (tema + candidați reali din corpus) ===');
{
  const out = run('suggest-jurisprudenta.js', ['tardivitate documentatie']);
  T('tema „Tardivitate" e găsită și scoate candidați CNSC', /Tardivitate/.test(out) && /\[CNSC\] BO\d{4}_\d+/.test(out));
}

fs.rmSync(TMP, { recursive: true, force: true });
console.log(`\n${pass} trecute · ${fail} picate`);
process.exit(fail ? 1 : 0);
