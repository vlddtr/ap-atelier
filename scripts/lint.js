#!/usr/bin/env node
/*
 * lint.js — poarta MECANICA de stil pentru actele produse.
 *
 * Regula in proza nu se respecta singura (dovedit: "iar nu" reapare in ciuda interdictiei).
 * Acest scanner flagheaza, inainte de livrare, incalcarile de stil greppabile, ca redactorul
 * sa le corecteze. NU modifica textul; produce un raport.
 *
 * Folosire:  node lint.js <act.txt|md>     (pentru .docx/.pdf, extrage intai cu extract.js)
 *
 * Acopera: opozitia "nu X, ci Y" / "iar nu" (stil-corectii §16), intensificatorii goli si
 * umflarea (§8), sinteza conversationala si meta-etichetele (§5/6/b), semnalizarea (§7),
 * persoana I singular (§c), referintele generice fara locator (§9), enumerarea robotica
 * ("in al N-lea rand"), umplutura/AI-bullshit, metaforele inventate, forma scurta cu titluri
 * de sectiune. Flag optional --plangere: altitudinea (restatement de contestatie vs critica deciziei).
 * NU prinde: opozitia FARA conector ("Nu X. Y.") si semnalizarea ne-listata — acelea cer o
 * re-citire semantica (sunt marcate ca atare in raport).
 */
const fs = require('fs');
const file = process.argv[2];
if (!file) { console.error('Folosire: node lint.js <act.txt|md>'); process.exit(1); }
const raw = fs.readFileSync(file, 'utf8');

// segmentare in fraze (pastram continutul), normalizand spatiile
function sentences(t) {
  return t.replace(/[ \t]+/g, ' ').replace(/\n+/g, ' ')
    .split(/(?<=[\.;:?!”"])\s+(?=[A-ZĂÂÎȘȚ0-9„])/);
}

const LEX = [
  { tip: 'opozitie „ci"', re: /(?:^|[^a-zăâîșț])ci(?:[^a-zăâîșț]|$)/i, nota: 'opozitie artificiala „nu X, ci Y" — reformuleaza afirmativ (§16). (Atentie: „ci" poate fi fals-pozitiv; verifica fraza.)' },
  { tip: 'opozitie „iar nu"', re: /\biar nu\b/i, nota: 'varianta a opozitiei interzise — pastreaza doar X (§16)' },
  { tip: 'intensificator gol / ton prea sigur', re: /\b(în mod evident|vădit|flagrant|pe deplin|cu desăvârșire|este clar că|fără îndoială|fără dubiu|de netăgăduit|incontestabil|în mod cert|cu siguranță|desigur|neîndoielnic|categoric|fără echivoc|fără putință de tăgadă|este evident|nu există nicio îndoială|în mod clar)\b/i, nota: 'forta din idee, nu din intensificator (§8); la analiza = certitudine nemarcata — calibreaza (VERIFICAT/INFERAT/IPOTEZA) si da alternativa (judecata-si-predictie.md)' },
  { tip: 'sinteza conversationala', re: /\b(pe scurt|bref|în esență)\b/i, nota: 'intrare directa in argument, fara eticheta (§b)' },
  { tip: 'meta-eticheta', re: /(^|\s)(comentariu|observație|notă|notă de acoperire|notă de verificare)\s*:/i, nota: 'meta-text — nu se pune in act (§5/§6)' },
  { tip: 'semnalizare', re: /\b(planuri distincte|distincția este următoarea|există două (aspecte|planuri)|trebuie făcută o (distincție|precizare)|în cele ce urmează vom|sunt două (probleme|chestiuni)|două aspecte se ridică)\b/i, nota: 'anti-semnalizare (§7) — aplica, nu anunta' },
  // §7 — familia „anunt de diferenta/teaser": anunta ca EXISTA o distinctie/diferenta/problema
  // fara s-o livreze in aceeasi fraza (prins post-factum la e-mailul din 03.07.2026:
  // „trateaza X diferit in trei locuri, iar diferenta conteaza" a trecut de lista de mai sus)
  { tip: 'semnalizare (teaser)', re: /\b(tratează|reglementează|abordează|definește|descrie)\s+[^.;:]{0,60}?diferit în (două|trei|patru|cinci|șase|\d+) locuri\b|\b(diferența|distincția|nuanța) (contează|este importantă|e importantă|este esențială|e esențială|nu e(ste)? (doar )?teoretică)\b|\biar (diferența|distincția|nuanța) contează\b|\bexistă o (diferență|distincție|nuanță|neconcordanță|tensiune) (importantă|esențială|semnificativă|subtilă|care contează)\b|\b(vom (vedea|arăta|demonstra|analiza)|după cum vom (vedea|arăta)|detaliem mai jos|revenim mai jos|asupra căreia revenim)\b|\b(întrebarea|problema|miza) (reală|adevărată|de fond) (este|e|rămâne)\b/i, nota: 'anti-semnalizare (§7) — anunți că există o diferență/distincție/problemă fără s-o livrezi. Spune direct CE diferă (cu locatoarele celor N locuri) și CE efect are.' },
  { tip: 'persoana I singular', re: /\b(consider că|apreciez că|în opinia mea|sunt de părere|cred că)\b/i, nota: 'in acte: „rezulta/se impune/Subscrisa/rugam Consiliul" (§c)' },
  { tip: 'enumerare robotică', re: /în al (doilea|treilea|patrulea|cincilea) rând/i, nota: 'conector enumerativ robotic — leaga ideile firesc, fara „in al N-lea rand" (§8 ext.)' },
  { tip: 'umplutură/AI bullshit', re: /\b(este important de (menționat|notat)|merită (subliniat|menționat) (faptul )?că|trebuie avut în vedere (faptul )?că|în acest sens, este (esențial|important)|se cuvine a (menționa|preciza)|nu în ultimul rând)\b/i, nota: 'umplutura — taie, intra direct in idee' },
  { tip: 'metaforă inventată', re: /\b(mașinări[ae] de|angrenaj(ul)? de|arhitectur[ăa] (juridică|a (cauzei|deciziei|argumentului))|țesătur[ăa] de|edificiul (juridic|argumentului)|pârghi[ea] (juridică|de)|busol[ăa]|coloana vertebral[ăa] a)\b/i, nota: 'metafora/imagine inventata — exprima juridic si plat; juristul nu decodeaza figuri de stil. Inlocuieste cu mecanismul descris literal.' },
  // §10 layout: sursa in paranteza DUPA citat = citare ca nota de subsol (ratat pe caz real 09.07.2026).
  // Nu cerem si paranteza inchisa: segmentarea pe fraze rupe la "nr. NNNN" (punct+cifra), iar ")" cade
  // in alt fragment — deschiderea "(Sursa..." imediat dupa ghilimele e dovada suficienta.
  { tip: '§10 sursă după citat', re: /["""”][\s]*\((?:Raport|Solicit|Adres[ăa]|Fi[șs]a de date|Caiet|Proces|R[ăa]spuns|BO\d{4}|[Aa]rt\.)/, nota: 'sursa citatului vine ÎNAINTEA lui, în capul paragrafului de citat („Sursa exactă: „text""), nu în paranteză după — vezi stil-corectii §10, layout-ul exact' },
];

// §9 — referinta generica CREDITATA cu un continut specific, dar fara locator in fraza
const GENERIC = /\b(documentația|documentaţia|oferta|propunerea tehnică|caietul de sarcini|normativul|graficul|clarificarea|cerința|cerinţa|comunicarea|răspunsul|adresa|raportul|decizia|fișa de date)\b/i;
const ATTR = /\b(prevede|prevăd|stabilește|stabilesc|impune|impun|interzice|interzic|arată|menționează|dispune|dispun|solicită|reține|rețin|cuprinde|cuprind|conține|conțin|precizează|definește|consacră)\b/i;
const LOCATOR = /\b(nr\.|art\.|alin\.|pct\.|cap\.|pag\.|secțiun|secţiun|lit\.|subclauz|tabel|anexa|anexă|formular)\b|\d{1,2}[.\/]\d{2}[.\/]\d{4}/i;
// aserție NEGATIVĂ (absența unei cerințe) — nu se poate localiza o absență, deci nu o flagăm la §9
const NEG = /\bnu (cuprinde|cuprind|există|rezultă|prevede|prevăd|impune|impun|conține|conțin|stabilește|stabilesc|interzice|interzic|menționează|precizează)\b/i;

const sents = sentences(raw);
const hits = [];
sents.forEach((s) => {
  for (const L of LEX) if (L.re.test(s)) hits.push({ tip: L.tip, fraza: s.trim().slice(0, 170), nota: L.nota });
  if (GENERIC.test(s) && ATTR.test(s) && !LOCATOR.test(s) && !NEG.test(s)) {
    const g = s.match(GENERIC)[0];
    hits.push({ tip: '§9 referinta generica fara locator', fraza: s.trim().slice(0, 170), nota: `„${g}" creditat cu un continut, fara nr./data/pag./art. in fraza — adauga adresa exacta sau [DE COMPLETAT: pagina/sectiunea]` });
  }
});

// (d) DENSITATEA CRATIMEI LUNGI (—) — actele-model aproape nu o folosesc ca apozitie in fraza;
// registrul implicit al modelului abuzeaza de ea (stil-corectii §12). Prag: >1 aparitie la 8 fraze.
// Nu numaram liniile de titlu/enumerare (incep cu -, •, #) — doar „—" din interiorul frazelor.
const dashCount = sents.filter(s => /\s—\s/.test(s)).length;
if (sents.length >= 8 && dashCount > Math.ceil(sents.length / 8)) {
  hits.push({
    tip: 'densitate cratimă lungă (registru eseistic)',
    fraza: `${dashCount} fraze cu apoziții „—" din ${sents.length} fraze`,
    nota: 'actele-model aproape NU folosesc „—" în frază — desfă apozițiile în propoziții cu virgulă/relative (stil-corectii §12, amprenta frazei)',
  });
}

// (b) forma SCURTA cu titluri de sectiune — un e-mail/adresa/nota scurta nu poarta titluri
const wordCount = raw.split(/\s+/).filter(Boolean).length;
if (/^#{1,6}\s/m.test(raw) && wordCount < 400) {
  hits.push({ tip: 'formă scurtă cu titluri', fraza: `(${wordCount} cuvinte, cu titluri markdown)`, nota: 'un e-mail/adresă/notă scurtă NU poartă titluri de secțiune — consolidează în paragrafe (granularitate)' });
}
// (c) DESCHIDERI REPETITIVE — cand actul are mai multe motive/capete, fiecare sectiune care
// incepe cu aceeasi formula ("Contestatoarea sustine ca...", "Avizul... a dispus...") suna
// sablonard. Verificat pe caz real (eval case-01): sectiunile 4 si 5 au inceput aproape identic.
// Euristica: ia primele ~4 cuvinte ale primei fraze din fiecare paragraf substantial; daca aceeasi
// "semnatura" apare in 2+ paragrafe diferite, flagheaza — indiferent daca sunt sectiuni numerotate
// sau nu (un e-mail cu mai multe puncte are aceeasi problema).
function normOpen(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[„"«»]/g, '').trim().split(/\s+/).slice(0, 4).join(' ');
}
const paras = raw.split(/\n\s*\n/).map(p => p.replace(/\s+/g, ' ').trim())
  .filter(p => p.length > 60 && !/^\[DE COMPLETAT/i.test(p) && !/^#{1,6}\s/.test(p) && !/^\d+\.\s*$/.test(p));
const openings = {};
paras.forEach((p, i) => {
  const firstSentence = p.split(/(?<=[.;:?!])\s/)[0];
  const sig = normOpen(firstSentence);
  if (sig.split(' ').length < 3) return; // semnatura prea scurta ca sa fie semnificativa
  (openings[sig] = openings[sig] || []).push({ i, snippet: firstSentence.slice(0, 100) });
});
for (const [sig, occ] of Object.entries(openings)) {
  if (occ.length > 1) {
    hits.push({
      tip: 'deschideri repetitive între secțiuni',
      fraza: occ.map(o => `«${o.snippet}»`).join('  ·  '),
      nota: `${occ.length} secțiuni încep cu formula „${sig}..." — variază deschiderea (citat-document-întâi, distincție, pivot „Or,", comparație A-vs-B — vezi stil-argumentativ.md „Varietatea deschiderilor"). EXCEPȚIE legitimă: combaterea în serie a unor elemente omoloage (fișe tehnice, echipamente) folosește deliberat structură paralelă (stil-corectii §12) — confirmă care e cazul.`,
    });
  }
}

// (5b) altitudinea PLANGERII — doar cu flag --plangere (heuristic, neblocant)
if (process.argv.includes('--plangere')) {
  sents.forEach(s => {
    if (/^\s*(Subscrisa|Prin contestați[ae]|Contestatoarea) (a|am) (criticat|învederat|arătat|susținut|invocat)/i.test(s))
      hits.push({ tip: 'altitudine plângere (verifică)', fraza: s.trim().slice(0, 170), nota: 'pare restatement de contestație — la plângere ataci DECIZIA CNSC, nu relua critica ofertei (structuri-acte.md, cei 4 timpi)' });
  });
}

const byType = {};
for (const h of hits) (byType[h.tip] = byType[h.tip] || []).push(h);
console.log(`LINT STIL — ${hits.length} semnalari in ${sents.length} fraze | ${file}\n`);
for (const [tip, arr] of Object.entries(byType).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`### ${tip} (${arr.length})`);
  arr.slice(0, 10).forEach(h => console.log(`  • ${h.fraza}\n    -> ${h.nota}`));
  if (arr.length > 10) console.log(`  ... si inca ${arr.length - 10}`);
  console.log('');
}
if (!hits.length) console.log('Nicio semnalare lexicala.');
console.log('EXCEPTIE: citatele din documentatie/lege/decizie (in ghilimele) si paragrafele care REZUMA pozitia adversa sunt exceptate — opozitia/intensificatorul de acolo nu sunt ale tale. Verifica fiecare semnalare: e in textul tau sau intr-un citat?\n');
console.log('--- RE-CITIRE SEMANTICA (nu se prinde prin grep) ---');
console.log('• Opozitia FARA conector: o propozitie negativa urmata de una care o corecteaza („Nu X. Y.") — rescrie afirmativ.');
console.log('• Semnalizare/umflare ne-listata: paragrafe care anunta in loc sa spuna, ori fraze care reiau o idee deja spusa.');
