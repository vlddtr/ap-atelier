# Grading independent — Caz 01 — draft-v2.md

> Evaluare efectuată fără a consulta `score.md` / `score-v2.md` preexistente. Verificări făcute:
> `extract.js --article` pe L.99/2016 (art. 2, 63, 178, 179, 187, 209) și L.101/2016 (art. 8);
> `check-citations.js` pe draft-v2.md; lectura integrală a deciziei-sursă `BO2024_585.txt` (ambele
> părți: contestație + apărarea AC în fapt + considerentele Consiliului) pentru a compara apărarea
> din draft cu argumentele care au funcționat/nu au funcționat real în fața CNSC.

## Corectarea unei erori din ground-truth

Ground-truth citează „art. 187 L99” pentru capătul 2 (experți-cheie ca factor de evaluare). Verificat:
art. 187 L.99/2016 reglementează capacitatea tehnică a **subcontractanților** — nu are nicio legătură cu
factorii de evaluare. Temeiul corect, verificat integral în text, este **art. 209 alin. (5) lit. b) din
Legea nr. 99/2016**, care prevede textual: "organizarea, calificarea și experiența personalului desemnat
pentru executarea contractului, în cazul în care calitatea personalului desemnat poate să aibă un impact
semnificativ asupra nivelului calitativ de executare a contractului". **Draft-v2 citează exact acest
temei corect** (nu art. 187) — este evaluat pe baza acestei corecții, nu penalizat pentru "neconcordanță"
cu ground-truth.

## Tabel de acoperire

| # | Motiv (ground-truth) | Acoperit? | Dovadă / observație |
|---|---|---|---|
| 1 | Experiență similară confuză (produse/servicii) | PARȚIAL | §1 (rândurile 36-56): recunoaște caracterul neclar, citează corect Instrucțiunea 2/2017 și Avizul ANAP, invocă art. 178(1)/179 L99 — dar art. 178/179 sunt greșit alese ca temei de proporționalitate (v. Criteriul 3 mai jos); lasă totul în `[DE COMPLETAT]` fără a folosi argumentul cel mai puternic disponibil în dosar (natura mixtă produse+servicii a contractului, deja articulată la capătul 2) |
| 2 | Experți-cheie ca factor de evaluare într-un contract cu componentă de furnizare | DA | §2 (rândurile 58-80): argumentul central, bine dezvoltat, cu citat verbatim din art. 209 alin.(5) lit. b) L99, distincția etichetă-tip-contract vs. natură reală a prestației. Corespunde exact raționamentului pe care CNSC l-a reținut real (obiect complex, nu doar furnizare) |
| 3 | Neconcordanță experți cheie (caiet vs. Anexa 2) | DA | §3 (rândurile 82-91): recunoaște neconcordanța, propune corectarea Anexei 2 — soluție identică cu ce a dispus efectiv CNSC (a admis acest capăt și a obligat alinierea Anexei 2 la caietul de sarcini) |
| 4 | Certificare de către producător (cap. 14.1) | PARȚIAL | §4 (rândurile 93-103): corect ca structură, dar ratează faptul-cheie din dosar: ANAP a remediat o cerință DIFERITĂ (pag. 21 — autorizație de "partener de tehnologie" al ofertantului), nu cerința de certificare a producătorului de la pag. 23 (cap. 14.1), care nu a făcut obiectul avizului. Draft-ul lasă totul la "DE COMPLETAT" fără să ridice ipoteza (verificabilă din propriul aviz, dacă entitatea are acces la el) că cele două cerințe sunt distincte — apărarea reală, câștigătoare, a fost tocmai această distincție |
| 5 | "Cea mai recentă variantă" nedefinită | PARȚIAL | §5 (rândurile 105-113): identifică corect problema și cere dovada conformării, dar nu articulează argumentul de fond (specificație funcțională determinabilă) decât superficial; lasă totul condiționat de un document care, structural, ar fi trebuit prezumat ca fiind deja emis (clarificare din oficiu), din moment ce draftul însuși semnalează la alte capete existența avizului |
| 6 | Modul Marketing+E-commerce "parte din" ERP | DA | §6 (rândurile 115-127): argumentul (factor opțional de evaluare, nu cerință minimă eliminatorie) corespunde exact ratio-ului CNSC care a respins acest capăt ca nefondat |
| 7 | "One stop solution" — prag ">4 platforme" | PARȚIAL | §7 (rândurile 129-143): tratează ambiguitatea ca fiind parțial întemeiată și propune eliminarea formulării "neconformă" ca măsură de remediere — dar aceasta este o **poziție mai slabă decât apărarea reală, câștigătoare**: CNSC a respins integral acest capăt, reținând că pragul de neconformitate e coerent cu dorința AC de *cât mai puține* platforme (deci compatibil cu "complet integrat"), nu contradictoriu. Draft-ul cedează inutil teren pe un capăt defensibil integral |
| 8 | Formular de ofertă tehnică | PARȚIAL | §8 (rândurile 145-152): corect semnalează nevoia de verificare, dar nu identifică (pentru că nu are acces la text complet) faptul că acest capăt a fost în realitate ADMIS de CNSC (Formularul nr. 1 nu conținea trimiteri la factorii de evaluare) — draftul e prudent, ceea ce e corect dat fiind dosarul incomplet, dar concluzia (§IV) nu semnalează suficient de ferm riscul de admitere pe acest capăt |
| Excepție oficiu | Tardivitate | DA | §II (rândurile 22-32): corect identificată, corect temeiul (art. 8 L101), corect semnalată imposibilitatea verificării fără datele lipsă — tratată onest, fără a "forța" o concluzie nesusținută |

**Scor acoperire brut: 3 DA, 5 PARȚIAL, 0 NU → aprox. 68-70% acoperire efectivă**, cu mențiunea că
majoritatea PARȚIAL provin din lipsa datelor din dosar (onest semnalată), nu din superficialitate —
cu excepția capătului 7, unde draftul cedează un punct câștigabil.

## Scoruri pe criterii

### 1. ACOPERIRE — 7/10
Toate cele 8 capete + excepția de tardivitate + concluzie sunt adresate, cu trimitere punctuală la
secțiune/pagină. Totuși, 5 din 8 capete rămân în stadiul "recunoaștem parțial, așteptăm documente",
ceea ce e defensibil doar la 4, 5, 8 (unde dosarul chiar nu conține avizul ANAP integral) — nu la
1 și 7, unde argumentarea de fond era posibilă din datele deja citate în propriul draft.

### 2. PE TEMEI, nu generic — 8/10
Fiecare secțiune se ancorează în text concret (pagină, capitol, alineat citat verbatim la §2). Nu sunt
fraze-șablon reciclabile. Singurul reproș: la capetele 4/5/8, formula "notă de proces: o măsură de
remediere ANAP nesatisfăcută nu se apără generic" e repetată identic de trei ori — util ca principiu,
dar pe muchie de a deveni ea însăși un șablon.

### 3. CORECTITUDINEA CITĂRILOR — 8/10
Toate cele 6 articole citate (art. 8 L101, art. 178, 179, 209, 2, 63 L99) există și au conținutul
invocat — verificat cu `extract.js` și `check-citations.js` (6/6 confirmate). Legea de bază e corect
L. 99/2016 (sectorial), nu L. 98/2016 — capcana principală din ground-truth e evitată. Art. 209 alin.(5)
lit. b) e citat *corect*, superior temeiului eronat din ground-truth. Penalizare: la §1, art. 178
alin.(1) și art. 179 L99 sunt invocate ca temei de proporționalitate a cerințelor de calificare, dar
art. 178 reglementează **motivele de excludere pentru neplata taxelor/impozitelor**, iar art. 179
reglementează **excepții de la excludere pentru motive de interes general** — niciunul nu vizează
proporționalitatea cerințelor de capacitate tehnică. Aceasta e o citare din articolul greșit (deși din
legea corectă), pe un punct central al apărării de la capătul 1.

### 4. JURISPRUDENȚĂ — pe motivare, nu pe soluție — 3/10
Draft-v2 nu citează nicio decizie CNSC sau CJUE, deși cazul-sursă (BO2024_585) e disponibil integral
în biblioteca locală și conține exact ratio-ul de care are nevoie apărarea (ex.: la capătul 7, CNSC
explică propriul raționament pe larg — "AC dorește cât mai puține platforme, deci pragul de 4 nu
contrazice complet integrat"). Neintegrarea acestui ratio direct aplicabil e o pierdere semnificativă
de forță argumentativă, mai ales că draftul e redactat *pornind* de la acest dosar.

### 5. TRASABILITATE & ZERO FABRICAȚIE — 9/10
Nicio decizie, număr de aviz sau articol inventat; toate referirile la Avizul ANAP, Instrucțiunile
1/2017 și 2/2017 corespund textual cu ce apare în decizia-sursă reală. Toate lacunele sunt marcate onest
cu `[DE COMPLETAT]` în loc de a fi completate prin invenție — exact comportamentul cerut. Singurul motiv
pentru care nu e 10: câteva `[DE COMPLETAT]` (ex. capătul 4, 5) ar fi putut fi eliminate parțial dacă
draftul folosea informația deja disponibilă în sursa citată chiar de el (avizul ANAP existent în dosar),
nu doar semnalate ca lipsă totală.

### 6. EXCEPȚII DIN OFICIU — 7/10
Tardivitatea e verificată explicit și corect structurată (art. 8 L101), cu recunoașterea onestă că nu
poate fi tranșată fără datele de publicare. Lipsește însă orice mențiune despre o eventuală excepție de
lipsă de interes/tardivitate parțială pe capătul 1 (retras de contestatoare în dosarul real, deci ar fi
putut fi semnalat generic drept posibilitate procedurală chiar și fără acces la acel detaliu) — dar
aceasta e o observație marginală, nu o omisiune gravă.

### 7. STRUCTURĂ & STIL — 8/10
Antet corect, identificare (cu câmpuri de completat marcate corect), excepția înaintea fondului, petit
final care acoperă toate cele 8 capete plus concluzie graduală (respins/remediere/rezervă poziție),
formulă de încheiere consacrată. Diacritice corecte, ton sobru. Singur minus: lipsește secțiunea de
probațiune (listă de înscrisuri atașate) care apărea în draft-v1 — draft-v2 e comparativ mai scurt și
mai puțin complet structural decât v1, deși mai concentrat.

## SCOR GLOBAL: 7.14/10 (medie: 7+8+8+3+9+7+8 = 50/7)

**Verdict:** Un punct de vedere solid, onest și bine ancorat legal, care evită capcana principală
(L.98 vs. L.99) și identifică corect temeiul real la capătul 2 (mai bun decât ground-truth însuși), dar
pierde teren pe capătul 7 (cedează un punct integral câștigabil), nu exploatează jurisprudența CNSC
proprie disponibilă în bibliotecă, și conține o citare greșită de articol (178/179) la capătul 1.

## TOP 3 DEFECTE de reparat în skill

1. **Lipsă pas obligatoriu de "self-check pe sursa jurisprudențială deja identificată."** Draftul a
   fost redactat pornind de la BO2024_585 (citat explicit în ground-truth/context), dar nu extrage
   ratio-ul CNSC din acel dosar pentru capetele unde acesta era deja disponibil (mai ales capătul 7:
   ratio-ul câștigător era "AC vrea *mai puține* platforme, deci pragul nu contrazice integrarea
   completă" — un argument complet diferit și mai tare decât "recunoaștem ambiguitatea"). Skill-ul ar
   trebui să impună: dacă în dosar/bibliotecă există decizia CNSC care a soluționat exact speța sursă,
   *citește considerentele Consiliului înainte de a redacta apărarea*, nu doar contestația. Altfel
   drafturile reinventează argumente mai slabe decât cele deja testate și câștigătoare.

2. **Confuzie sistematică art. 178/179 L.99 folosite ca temei de proporționalitate.** Skill-ul (sau
   biblioteca de referințe) ar trebui să aibă o listă scurtă "articole L.99 frecvent confundate" — art.
   178/179 (excludere pentru neplată taxe) nu au legătură cu proporționalitatea cerințelor de calificare
   (acolo temeiul e art. 165 alin. (6), art. 188 sau art. 192, cum a folosit corect draft-v1 la același
   punct). O verificare `check-citations.js` extinsă, care nu doar confirmă *existența* articolului ci
   flag-uiește *nepotrivirea tematică* (articol despre altceva decât ce se susține), ar fi prins asta.

3. **Nicio citare de jurisprudență CNSC/CJUE deloc în draft-v2**, deși biblioteca locală conține zeci de
   decizii BO relevante (inclusiv chiar decizia-sursă a speței). Regula "JURISPRUDENȚĂ — pe motivare, nu
   pe soluție" din grader nu poate primi notă bună dacă nu există nicio citare. Skill-ul ar trebui să
   impună un pas explicit de căutare în `references/jurisprudenta-cnsc/` și `jurisprudenta-cjue/` pentru
   fiecare capăt de contestație înainte de a considera secțiunea "finalizată", nu doar la cerere expresă.
