# Grading independent — Caz 02 — draft-v1.md

> Evaluare sceptică per `eval/grader.md` + `eval/case-02/ground-truth.md` (inclusiv soluția reală
> CNSC BO2021_2373 ca benchmark de calitate a argumentelor). Verificări efectuate: textele art. 17,
> 19 L.101/2016, art. 2, 3 lit. yy), 185, 193, 196, 209 L.98/2016, art. 30, 134 H.G. 395/2016 în
> `references/legislatie/` (grep pe fișierele consolidate); fișele CJUE C-131/16 Archus și C-336/12
> Manova din `references/jurisprudenta-cjue/spete/`; `gate.js` (citări ✓, citate ✓, jurisprudență ✓,
> stil ⚠ 5 semnalări — toate confirmate false positive: formula consacrată „decizia pe care o veți
> pronunța" ×2, fraze care poartă deja `[DE COMPLETAT: pagini]` ×2, citat cu adresă ×1); citirea
> integrală a deciziei-sursă BO2021_2373 (contestație + PV AC + intervenție + considerente).

## Tabel de acoperire

| # | Critica (ground-truth) | Acoperit? | Dovadă / observație |
|---|---|---|---|
| 1 | I.1 Declarația conflict de interese | DA | §II.1: faptul decisiv (declarații depuse cu DUAE, datate 22.06.2021, consemnate în PV de deschidere) + diagnosticul viciului („lectură trunchiată" — deducerea lipsei dintr-un PV al altei etape) = exact ratio-ul CNSC. Tratează și speculația privind intervalul 22.06-08.09 |
| 2 | I.2 „Dosarul Companiei" | DA | §II.2: art. 193 alin. (1) + art. 196 alin. (2) L98 citate în cursiv; argumentul „ar goli de conținut instituția DUAE"; Manova pe anterioritate verificabilă. Identic cu ratio-ul CNSC (documentele justificative se cer DOAR clasatului I). Observație minoră: argumentul special al contestatoarei cu „Subsecțiunea Documente Solicitate din Dosarul Companiei" din SEAP nu e demontat nominal (că o rubrică SEAP/un formular nu poate deroga de la regimul legal al DUAE) — e acoperit doar implicit prin fila 2 din Formulare |
| 3 | I.3.1 Împuternicirea | DA | §II.3: fapt (depusă la documentele de calificare) + întoarcerea sarcinii probei pe recunoașterea contestatoarei că nu a văzut oferta. Corespunde soluției CNSC |
| 4 | I.3.2 Declarația de a nu subcontracta | DA | §II.4: „Declarația angajament a ofertantului" = asocierea; documentația nu cere per asociat; mandat + răspundere solidară cu art. 185 alin. (1) L98 citat. CNSC a folosit contractul însușit + art. 53; temeiul din draft (art. 185) e cel care prevede textual solidaritatea — alegere superioară |
| 5 | I.3.3 Angajamentul costuri/prejudicii | DA | §II.5: fapt (angajament + declarație ALL-RISK) + exploatarea formulării alternative a criticii („ori nu există, ori este limitată") ca dovadă a speculației. Identic cu ratio-ul CNSC |
| 6 | I.3.4 Acordul GDPR | DA | §II.6: formular nesolicitat + depunerea voluntară a ofertei ca temei al prelucrării + lipsa oricărei sancțiuni legale și a folosului practic. Acoperă ratio-ul CNSC (mai puțin argumentul accesoriu al Consiliului cu declarațiile de confidențialitate ale comisiei — omisiune fără consecință) |
| 7 | I.4 Tehnicieni/experți/topometrist | DA | §II.7: echipa în propunerea tehnică; remediul corect la necorelarea DUAE = clarificare (art. 209 + art. 134(1)), respingerea directă ar fi nelegală; refutarea prin definiție a „experților tehnici atestați" din art. 6(2) L10/1995; topometristul = cerință inexistentă → inopozabilă (art. 2(2) lit. b), d)); „includerea experților atestați în repartizare" demascată ca adaos al contestatoarei față de textul cerinței. Acoperă toate cele 3 întrebări ale criticii |
| 8 | II.1 Laboratorul ISC (nodul juridic) | DA | §II.8: demontează premisa („documentul lipsea") cu faptele (laborator indicat + autorizație în propunerea tehnică; solicitarea comisiei a cerut să se „precizeze", citat din contestație); calificarea „clarificare de confirmare" pe art. 209(1) + art. 134(1) vs. sancțiunea art. 134(6); Archus ÎNTORS pe ratio (interdicția vizează doar documentele lipsă impuse prin caiet); Manova aplicat pe anterioritatea contractului 06/25.03.2021; argumentul „respingerea fără clarificare ar lipsi de conținut art. 209/134" = considerentul central real al CNSC, regăsit aproape literal |
| 9 | II.2 Grafice/lucrări temporare/timp friguros | DA | §II.9: echivalența funcțională a formei tabelare + lipsa unei forme impuse prin documentație; organizarea de șantier ca lucrare temporară; C16-84 refutat cu PROPRIUL citat al contestatoarei (măsuri speciale, fără interdicție) — exact lectura CNSC. Paginile ofertei marcate onest `[DE COMPLETAT]` |
| 10 | II.3 Subtraversări/utilaj/subcontractant | DA | §II.10: „copia" = afirmație generică fără comparație concretă; cerința de proprietate inexistentă în documentație → inopozabilă + art. 30(6) HG395 (clauze nescrise) în subsidiar — exact structura apărării câștigătoare; art. 3(1) lit. yy) teza finală întors împotriva contestatoarei; resursele 50-50 din ofertă. Acoperă toate cele trei sub-teze |
| P | Admisibilitatea propriei cereri | DA | §I: art. 17(3) L101 + art. 61(3) C.proc.civ. citate; interes concret (câștigător, locul 1 vs. locul 2, valori); termen calculat de la publicarea în SEAP din 21.09.2021 |

**Acoperire brută: 10/10 DA.** Verificare pe „argumentele care au câștigat efectiv" (ground-truth,
final): regimul DUAE/art. 196 ✓ (§II.2), confirmare vs. completare + caracterul excesiv al respingerii
fără clarificări ✓ (§II.8), „ce nu s-a solicitat nu poate fi motiv de respingere" ✓ (§II.7, §II.10),
lectura corectă a C16-84 ✓ (§II.9), caracterul speculativ al criticilor-întrebare ✓ (prealabil + §II.3,
II.5, II.10). Toate cele cinci linii câștigătoare sunt prezente.

## Scoruri pe criterii

### 1. ACOPERIRE — 9/10
Toate cele 10 critici + admisibilitatea proprie, fiecare cu apărare pe fond (fapt + normă + calificare +
închidere cu remediu). Nicio critică „atinsă în treacăt". Rețineri: sub-teza SEAP „Dosarul Companiei"
(critica 2) e demontată doar implicit; argumentul de rezervă al CNSC la critica 6 (declarațiile de
confidențialitate ale comisiei) lipsește.

### 2. PE TEMEI, NU GENERIC — 8/10
Fiecare secțiune pornește de la rezumatul criticii cu locator („La pct. I.3.2 din contestație...") și
se sprijină pe textul exact — inclusiv întoarcerea citatelor contestatoarei împotriva ei (C16-84,
art. 3 yy), art. 196 din fila 2 Formulare). Penalizare: faptele despre propria ofertă sunt afirmate
fără locator de pagină în §II.3 (împuternicirea), §II.7 (echipa) și §II.8 (indicarea laboratorului) —
doar §II.9 și finalul poartă `[DE COMPLETAT: paginile]`; disciplina §9 din stil cerea marcajul peste
tot unde pagina nu e cunoscută. În §II.8, „autorizația acestuia, cu profilurile autorizate" adaugă o
precizare („cu profilurile autorizate") pe care contextul de client nu o confirmă expres — inferență
plauzibilă prezentată ca fapt.

### 3. CORECTITUDINEA CITĂRILOR — 9/10
Toate normele citate există și au conținutul redat, verificat pe textele consolidate: art. 17(3),
17(4), 19(1) L101; art. 61(3) C.proc.civ. (redat conform actelor-model; fișierul local CPC e stub —
neverificabil local, text notoriu și concordant cu exemplarul); art. 2(2) lit. b), d), art. 3(1)
lit. yy), art. 185(1), art. 193(1), art. 196(1)-(2), art. 209(1) L98; art. 30(6), art. 134(1), (6)
HG395. Legea de bază corect L. 98/2016 + HG 395/2016 — capcana sectorială evitată; sancțiunea art.
134(6) corect „inacceptabilă" (nu „neconformă"). Reținere: art. 196 alin. (2) e redat în forma în
vigoare (post-OUG 26/2022), deși speța e plasată în 2021 (la acea dată regimul era în alin. (2^1)) —
alegere conformă regulii skill-ului (forma în vigoare), dar nesemnalată nicăieri ca posibilă diferență
temporală.

### 4. JURISPRUDENȚĂ PE MOTIVARE — 8/10
Ambele cauze CJUE (C-131/16 Archus, C-336/12 Manova) sunt folosite pe ratio, cu testul de potrivire
făcut corect: Archus e distins pe elementul decisiv (interdicția vizează documente LIPSĂ impuse prin
caiet; aici informația exista în ofertă), Manova e aplicat pe condiția anteriorității verificabile —
manevra cerută de ground-truth („întoarsă, nu ocolită"). Penalizări: considerentele nu sunt redate în
cursiv, paragraf distinct, cu numărul punctului (pct. 29-31, 36-37 Archus; pct. 39-40 Manova), cum
cere §10 din stil — sunt parafrazate în frază; nicio decizie CNSC/CA citată (corpusul chiar nu are
decizie pe punct în afara sursei — care era corect necitabilă — dar golul rămâne un minus de forță).

### 5. TRASABILITATE & ZERO FABRICAȚIE — 9/10
Toate numerele/datele din act provin din contestație (PV 20286/09.09.2021, adresa 20260/09.09.2021,
solicitarea 17977/26.07.2021, 22.06.2021 ora 15:00, 21.09.2021) sau din contextul confirmat de client
(contract 06/25.03.2021, valori financiare, componența echipei, ALL-RISK). Zero articole sau decizii
inventate; zero numere de pagini inventate (golurile marcate `[DE COMPLETAT]`). Singura alunecare:
precizarea „cu profilurile autorizate" (§II.8) — v. criteriul 2.

### 6. EXCEPȚII DIN OFICIU — 6/10
Admisibilitatea PROPRIE e tratată complet (temei + interes + termen calculat). Lipsește însă orice
verificare a admisibilității CONTESTAȚIEI: draftul nu examinează tardivitatea (art. 8 L101 — termenul
de la comunicarea rezultatului), nici măcar pentru a consemna onest că, pe datele disponibile, nu
există excepție de invocat. Ground-truth cerea exact această verificare cu concluzie onestă; tăcerea
totală înseamnă că pasul din skill („excepții înainte de fond") a fost sărit, nu executat cu rezultat
negativ.

### 7. STRUCTURĂ & STIL — 9/10
Scheletul consacrat e respectat integral: antet extins cu „Spre știință", petit dublu (cap + final),
admisibilitatea prima, titluri de combatere cu „pretinsa", rezumatul criticii întâi în fiecare
secțiune, închideri uniforme „se impune respingerea criticii ca nefondată", normele portante în
cursiv/paragraf distinct, acces la dosar art. 19, „În drept", probe/anexe, transmiterea art. 17(4).
Diacritice complete; fără opoziții artificiale, fără intensificatori. Gate: stil ⚠ doar false
positive confirmate. Reținere: două fraze-cheie din §II.2 și §II.8 depășesc 60 de cuvinte (liniare,
dar la limita registrului).

## SCOR GLOBAL: **8,3/10**
Verdict: cerere de intervenție solidă, care găsește toate cele cinci linii de argumentare care au
câștigat efectiv în fața CNSC și evită ambele capcane majore (legea greșită, fabricarea conținutului
ofertei); punctele pierdute vin din disciplina locatoarelor pe propria ofertă, din lipsa verificării
din oficiu a admisibilității contestației și din redarea doar parafrazată a considerentelor CJUE.

## TOP 3 DEFECTE de reparat în skill (în ordinea impactului)

1. **Skill-ul nu forțează verificarea admisibilității ACTULUI ADVERS la actele de apărare.**
   `structuri-acte.md` cere „excepții procesuale mai întâi" la întâmpinare, dar scheletul „Cerere de
   intervenție" (pct. 1-5) nu conține niciun pas „verifică tardivitatea/inadmisibilitatea contestației
   (art. 8 L101) și consemnează concluzia, chiar negativă". Rezultat repetabil: drafturile de apărare
   tratează doar propria admisibilitate. Fix concret: adaugă în scheletul cererii de intervenție un
   pct. 3bis — „Excepții privind contestația: rulează verificarea termenului contestației pe datele
   din dosar; dacă nu există excepție, consemnează explicit în procesul de lucru (nu în act) că a fost
   verificată" + un rând corespunzător în checklist-ul Pasului 5 din SKILL.md.

2. **Regula locatoarelor (§9 stil) nu are un caz special pentru „fapte cunoscute de la client, fără
   dosar".** Draftul a marcat `[DE COMPLETAT: paginile]` doar în 2 din 5 locuri unde afirmă conținutul
   propriei oferte; celelalte 3 afirmații rămân fără adresă și fără marcaj, iar una („cu profilurile
   autorizate") alunecă din confirmarea clientului în inferență. Fix concret: în
   `stil-corectii-chatgpt.md` §9 (sau în SKILL.md, „Fiecare fapt e trasabil"), o teză explicită:
   „când actul se redactează FĂRĂ dosarul propriu (ex. intervenție la depunere), ORICE afirmație
   despre conținutul ofertei primește fie `[DE COMPLETAT: pag.]`, fie formularea «astfel cum vom
   proba cu extrasele anexate»; self-check dedicat înainte de gate".

3. **§10 (citatul în cursiv, paragraf distinct) nu e aplicat consecvent jurisprudenței, iar lint.js
   nu îl prinde.** Normele de lege au fost redate corect în forma cerută, dar considerentele CJUE —
   portante pentru motivul central II.8 — au rămas parafrazate, fără numărul punctului, deși fișele
   locale (C-131-16_Archus-Gama.md, C-336-12_Manova.md) conțin textul-cheie verbatim gata de preluat.
   Fix concret: în `SKILL.md` Pasul 4 / `stil-corectii` §10, regula „la jurisprudența portantă se redă
   punctul exact (pct. N) în cursiv, paragraf distinct, din fișa locală" + o verificare în lint.js:
   mențiune „C-\d+/\d+" fără „pct." în aceeași secțiune → semnalare.
