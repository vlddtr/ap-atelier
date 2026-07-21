# Biblioteca skill-ului — resurse locale și portabile

Skill-ul este **auto-conținut**: ȘI legislația consolidată (98/99/100/101 + norme + OUG-uri), ȘI tot
corpusul de jurisprudență (CNSC 159, Curți de Apel 237, ÎCCJ, CJUE) + ANAP sunt **incluse în skill, la
căi RELATIVE, în git → CĂLĂTORESC cu skill-ul pe orice mașină** clonată/sincronizată. Nimic nu mai e pe
foldere externe / pe altă mașină. **Nimic nu se citează din memorie fără a fi dat ca temei** — vezi
SKILL.md, Principiul de bază.

**REGULA SURSEI DE LEGISLAȚIE (fermă):**
1. **ÎNTÂI din skill** — `references/legislatie/` (mai jos), via `node scripts/extract.js --article N`.
2. **FALLBACK DOAR pe site-ul oficial — https://legislatie.just.ro/** (pentru articolele amendate pe care
   exportul Sintact le trunchiază, sau pentru forma în vigoare la data redactării).
3. **Nicio altă sursă de legislație.** Nu căuta legi pe alte site-uri. (MCP-ul `ansvar`, dacă e conectat,
   interoghează același corpus oficial legislatie.just.ro/EUR-Lex — consistent cu regula, nu o sursă terță.)

## Legislație consolidată — INCLUSĂ în skill (cale relativă)

Folder: `references/legislatie/` (relativ la rădăcina skill-ului — funcționează pe orice
mașină unde e clonat/sincronizat skill-ul; NU depinde de un user anume).

**Re-sursate din oficial (legislatie.just.ro, forma consolidată, 06.07.2026) — înlocuiesc exportul
Sintact, care trunchia articolele amendate** (ex. art. 137 HG 395 se oprea la „[textul din...]"):
- `legea-98-2016-oficial-legislatie-just-ro.txt` — L. 98/2016 (clasic), consolidare 17.11.2024
- `legea-99-2016-oficial-legislatie-just-ro.txt` — L. 99/2016 (sectorial), consolidare 17.11.2024
- `legea-100-2016-oficial-legislatie-just-ro.txt` — L. 100/2016 (concesiuni), consolidare 17.11.2024
- `legea-101-2016-oficial-legislatie-just-ro.txt` — L. 101/2016 (remedii), consolidare 06.04.2023
- `hg-395-2016-norme-oficial-legislatie-just-ro.txt` — HG 395/2016 (norme L. 98), consolidare 25.02.2026
- `hg-394-2016-norme-oficial-legislatie-just-ro.txt` — HG 394/2016 (norme L. 99), consolidare 24.05.2024
- `hg-867-2016-norme-L100-oficial-legislatie-just-ro.txt` — HG 867/2016 (norme L. 100, concesiuni),
  consolidare 19.04.2023 (re-sursat 11.07.2026; art. 1-110 + anexele 1-3, note de amendare HG 419/2018
  și HG 336/2023 incluse)

Format: fiecare articol modificat poartă și **nota de amendare** („(la DD-MM-AAAA, Alineatul... a fost
modificat de...)") — mai informativ decât Sintact (care doar trunchia). Text INTEGRAL, verificat pe
articolele-capcană (154, 137, 188/192 L99) — 0 trunchieri confirmate.

**Rămase pe Sintact (secundare, nu pe calea critică a citărilor uzuale — de re-sursat quando timpul permite):**
- `sintact-legea-134-2010-privind-codul-de-procedura.txt` — C. proc. civ. (extras)
- `sintact-ordonanța-de-urgența-3-2024-pentru.txt` / `-52-2025-pentru.txt` — OUG modificatoare pe garanții (acte distincte, nu duplică L98/L101)
- `sintact-hotararea-5-2024-privind-modificarea.txt` — HG 5/2024 (modificatoare)

**Cum verifici un articol INTEGRAL** (de la rădăcina skill-ului):
```
node scripts/extract.js references/legislatie/legea-99-2016-oficial-legislatie-just-ro.txt --article 209
```
Scoate articolul cu TOATE alineatele (regexul acceptă și „Articolul N", formatul oficial). **Verificare
periodică recomandată** (nu automată): re-consultă legislatie.just.ro din când în când — legea se
modifică; dacă pare veche față de data redactării, verifică pe portal înainte de a cita ferm.

**ATENȚIE — limitare cunoscută a exportului:** exporturile Sintact conțin note de consolidare
(„[textul din litera ... a fost modificat de ...]") care, pe **articolele amendate**, pot TRUNCHIA
textul la `extract.js` (ex. art. 137 HG 395 — lista lit. a)-h) de la alin. (2) și alin. (3) neconformă
lipsesc). Dacă articolul determinant e unul modificat (litere/alineate care nu apar integral), **NU
te baza pe export — ia textul complet de pe legislatie.just.ro / MCP `ansvar` (`get_provision`)**.
Pentru un produs, legislația se **re-sursează integral oficial** (rezolvă și proveniența Sintact).

## Index tematic UNIFICAT — punctul de pornire (CNSC + CA + CJUE)

`references/jurisprudenta-index-teme.md` — navigare pe **~19 teme** peste cele trei niveluri: fiecare
temă are articolul intern (L98/L101), **cauzele-reper CJUE numite** (care primează), câte decizii
CNSC/CA ating tema + recipe grep. **Pornește de aici** pe orice problemă de jurisprudență, apoi cobori
în corpusul potrivit. Regenerabil cu `node scripts/build-index-teme.js` când crește corpusul.

## Jurisprudență CNSC — INCLUSĂ în skill (text integral, anonimizat determinist)

Corpusul de **159 decizii CNSC** e acum în skill, la `references/jurisprudenta-cnsc/` — text
INTEGRAL (raționament + considerente complete, nu doar soluția). Buletinele sunt parțial anonimizate
de CNSC (numele unor părți = „..."), DAR s-au găsit scurgeri reziduale (firme cu nume, CUI/reg.com/
email de părți) — peste ele s-a aplicat **anonimizare deterministă** (`scripts/audit-anon.js`, vezi
mai jos), 0 identificatori structurați rămași; considerentele neatinse. Structură:

- `jurisprudenta-cnsc/decizii/BOxxxx.txt` — motivarea integrală a fiecărei decizii.
- `jurisprudenta-cnsc/catalog-anon.json` — metadate (BO-id, an, soluție, lege, procedură, CPV,
  obiect, teme).
- `jurisprudenta-cnsc/index-teme.md` — navigare pe teme (27 teme: `pret-neobisnuit`,
  `tardivitate-termen`, `tert-sustinator`, `specificatii-restrictive`, `conflict-interese`,
  `experienta-similara`, `DUAE`, `anulare-procedura`, `confidentialitate-acces-dosar` etc.).

**Cum o folosești:** identifică tema → `index-teme.md` / Grep pe `catalog-anon.json` (`themes`) →
lista de BO-id → **citește motivarea integrală în `decizii/<BO>.txt`** (Grep pe BO-id sau pe
cuvinte-cheie) → citează prin BO-id, pe RATIO (considerentul), nu doar pe soluție. Grep pe conținut
merge direct: `grep -ril "<temă>" references/jurisprudenta-cnsc/decizii/`. Atenție: BO2016_* pot fi
sub legea veche (OUG 34/2006) — verifică. Pentru decizii noi neincluse, vezi portal.cnsc.ro mai jos.

## Jurisprudență CURȚI DE APEL — INCLUSĂ în skill (considerentele instanței)

**237 hotărâri ale Curților de Apel (2021–2026)** pe achiziții — plângeri/litigii privind deciziile
CNSC și contractele (L. 101/2016 + L. 98/2016), la `references/jurisprudenta-ca/`. Text INTEGRAL, cu
**considerentele instanței** (de ce CA modifică sau menține decizia CNSC) — exact etapa pe care
corpusul CNSC NU o acoperea. **Doar norme în vigoare** (hotărârile sub OUG 34/2006 abrogată, drafturile
nefinalizate și duplicatele au fost excluse). Anonimizate determinist (firme/autorități-parte/persoane
mascate; considerentele, articolele și raționamentul — neatinse; diacritice normalizate). 11 instanțe:
București (93), Bacău (39), Târgu Mureș (34), Constanța (30), Pitești/Alba Iulia (9), Ploiești,
Suceava, Timișoara, Oradea.

- `jurisprudenta-ca/decizii/Hotar[â]re-<data>-<id>.txt` — considerentele integrale ale fiecărei hotărâri.
- `jurisprudenta-ca/index-instante.md` — navigare pe instanțe + nr. + dată (97% identificate; grep pe conținut e căutarea de bază).

**Cum o folosești:** Grep pe conținut/temă în `decizii/` — `grep -ril "<temă>" references/jurisprudenta-ca/decizii/`
— citește considerentul, **citează prin instanța + nr. decizie + dată**. Folosește-o mai ales la
redactarea PLÂNGERII (cum tratează CA un considerent CNSC, ce prinde la instanță vs. la Consiliu).
Pot rămâne nume reziduale izolate (text public de instanță) — semnalează dacă apar.

## Jurisprudență ÎCCJ — INCLUSĂ în skill (autoritatea internă maximă)

`references/jurisprudenta-iccj/` — **4 decizii de unificare a practicii** (RIL + HP) pe achiziții,
**text INTEGRAL oficial** (legislatie.just.ro), cu dispozitivul în antet + considerentele complete.
**RIL** (art. 514-518 C.proc.civ.) și **HP** (art. 519-521) sunt **OBLIGATORII erga omnes** — peste
Curțile de Apel; sub CJUE doar pe chestiuni de drept UE. Fără anonimizare (acte publice, punct de drept
abstract). Decizii: **RIL 11/2023** (competență executare contracte, art. 53 L101), **RIL 40/2020**
(termen recurs/competență), **RIL 25/2021** (art. 166 Norme L98), **HP 66/2018** (evaluare/clarificări,
Norme L98). Vezi `jurisprudenta-iccj/index.md` (tabel + alte decizii ÎCCJ doar citate în corpus). Grep:
`grep -ril "<temă>" references/jurisprudenta-iccj/decizii/`. Pentru RIL/HP noi: fetch din legislatie.just.ro.

## Jurisprudență CJUE — INCLUSĂ în skill (nivelul superior de autoritate)

Jurisprudența **Curții de Justiție a UE** pe directivele 2014/23-24-25 + remedii, la
`references/jurisprudenta-cjue/`. **Primează asupra interpretării naționale** — CNSC și instanța
română sunt ținute de interpretarea CJUE a noțiunilor de drept UE transpuse în L. 98/99/100/101.
E vârful ierarhiei față de corpusul CNSC (administrativ) și CA (instanță națională). Public, fără
anonimizare (părțile se citează prin nr. cauză + ECLI + nume, ex. C-454/06 *pressetext*).

- `jurisprudenta-cjue/spete/<C-xxx-yy>_<nume>.md` — **59 spețe curate**: ratio + **citat verbatim
  cu nr. punct (pct. 34)** + **maparea pe articolul din L. 98** + URL EUR-Lex. Status VERIFICAT.
  Sursa principală de citare.
- `jurisprudenta-cjue/texte-integrale/*.txt` — **54 hotărâri integrale** (inclusiv cauze noi:
  C-927/19 *Klaipėdos*, C-537/19, C-210/20...) pentru verificare verbatim și cauze fără fișier curat.
- `jurisprudenta-cjue/cadru/` — directivele + ghiduri Comisie/ANAP, **+ `concordanta-directive.md`**:
  tabel art. directivă veche (2004/18/92/50) → art. 2014/24 → art. L. 98 (+ remedii 89/665 → L. 101),
  pe instituții, cu cauzele-reper — puntea pentru citarea CJUE care invocă directivele pe numere vechi.
- `jurisprudenta-cjue/index-teme.md` — **catalog pe 11 teme**, fiecare mapată pe articolul intern
  (preț neobișnuit → art. 210; clarificări → art. 209; excludere/self-cleaning → art. 164-171;
  terț susținător → art. 182-186; criterii atribuire → art. 187; modificare → art. 221; in-house →
  art. 31; standstill/remedii → L. 101).

**Cum o folosești:** identifică instituția de drept UE → `index-teme.md` → speța-reper → citează pe
ratio + punctul verbatim + **leagă de articolul intern** pe care îl interpretează. Construcția cea
mai tare: normă internă → directiva-sursă → **ratio CJUE** → aplicare. Grep pe conținut:
`grep -ril "<temă>" references/jurisprudenta-cjue/`. Atenție la regimul temporal (cauze sub 2004/18 /
92/50 — verifică preluarea ratio în 2014/24).

## Legislație LIVE prin MCP — `ansvar` (Romanian-law-mcp), DACĂ e conectat

Dacă serverul MCP **`ansvar`** (Romanian-law-mcp, Ansvar Systems — 12.001 legi / 112.257 articole
din legislatie.just.ro + EUR-Lex, verbatim) e conectat în sesiune, **el e sursa Tier-1 de legislație**,
peste textul bundle-uit (care e static, doar 11 legi) și peste fetch-ul manual. Mapare pe nevoile skill-ului:

- **`check_currency`** → exact disciplina „articolul mai e în vigoare?" pe care skill-ul o cere mereu.
  Rulează-l pe articolul determinant înainte de a te baza pe versiunea bundle-uită.
- **`validate_citation`** → complement la `scripts/check-citations.js` (care verifică doar pe textul
  static bundle-uit); MCP-ul validează pe baza completă, mereu proaspătă.
- **`get_provision` / `search_legislation`** → textul integral al oricărui articol din orice lege
  (nu doar cele 11 bundle-uite) — util când dosarul atinge legislație conexă (insolvență, fiscal, etc.).
- **`get_eu_basis` / `get_romanian_implementations`** → puntea directivă↔lege, complementară cu
  `jurisprudenta-cjue/cadru/concordanta-directive.md`.

**Regula nealterată:** chiar cu MCP, **nimic nu se citează fără a fi dat ca temei verificat**; MCP-ul
e tot text verbatim de verificat, nu o opinie. **Confidențialitate:** prin gateway-ul `gateway.ansvar.eu`
interogările trec prin serverul Ansvar (OAuth) — pentru noi sunt doar căutări de legislație publică
(fără date de client), risc mic; pentru dosare privilegiate, varianta self-host (vezi repo). Conectare:
`claude mcp add ansvar --transport http https://gateway.ansvar.eu/mcp`. NU e instalat automat — opțional.

## Surse online oficiale (Tier 1 — când lipsește o resursă locală)

- **legislatie.just.ro** — legislație consolidată oficială (pentru reverificarea formei în vigoare).
- **portal.cnsc.ro** — decizii CNSC. ATENȚIE: doar HTTP, fără HTTPS; descarcă cu `Invoke-WebRequest`
  pe `http://`, caută via Google `site:portal.cnsc.ro <temă>`. Fetch blând (lecția de soft-throttling).
- **anap.gov.ro** — instrucțiuni și notificări ANAP (+ biblioteca de spețe ANAP e inclusă în skill:
  `references/anap-spete.md`).
- **curia.europa.eu / eur-lex.europa.eu** — jurisprudență CJUE pe directivele 2014/23-25.

## Extragerea textului din PDF (corpus CNSC, dosare)

Pe mașini unde Python e defect, `scripts/extract.js` folosește Node (`pdf-parse`, `mammoth`) —
dependențele se instalează o dată cu `npm install` în `scripts/`. Vezi `scripts/README.md`.

## Stilul utilizatorului

Sursa de adevăr pe stil este `references/stil-corectii-chatgpt.md` (corecții reale ale
utilizatorului, prioritate maximă), consolidată în `references/stil-argumentativ.md` (v1, derivat
din acte reale) + `references/formule-consacrate.md` (șabloane verbatim, anonimizate). Dacă
utilizatorul furnizează exemplare noi în sesiune, analizează-le și propune actualizarea ghidului.

## Colecția de acte-model pentru stil — ÎN REPO, anonimizată: `references/acte-model/`
~73 de acte redactate de firmă (2016-2026), extrase din colecția Modele și ANONIMIZATE determinist cu
`scripts/build-acte-model.js`: contestații, cereri de intervenție, întâmpinări, plângeri, concluzii
scrise, adrese — vezi `references/acte-model/INDEX.md`. Sursa amprentei de stil din
`stil-corectii-chatgpt.md` §12. La redactarea unui tip de act, citește 1-2 exemplare de același tip.
- Colecția BRUTĂ (cu nume reale) rămâne LOCALĂ, în afara repo-ului: `Modele.rar` în OneDrive →
  Desktop → Data (pe această mașină, dezarhivată alături). NU se comite — regula HARD a numelor.
- Regenerare (după adăugarea de acte noi în colecția locală): `node scripts/build-acte-model.js`
  + re-rularea scanării de scurgeri înainte de commit.

## Corpusul mare de acte ale firmei (LOCAL, în afara repo-ului): `baza_cnsc`
`OneDrive → Desktop → Achizitii/Achizitii/baza_cnsc` (construit 10.07.2026 din M-Files/ONVLAW, cu
manifeste SHA-256 în `jurnal/`): 3.363 Word originale (+549 .doc vechi neconvertite), 2.810 anonimizate
Python (ATENȚIE: anonimizarea Python LASĂ nume de clienți — verificat 2/3 eșantioane cu scurgeri; NU
se comite nimic de acolo fără a doua trecere cu pipeline-ul nostru), ~480 candidați decizii CNSC
(majoritatea PDF scanate, cer OCR). Distribuție (din manifest): 381 contestații, 188 concluzii,
121 intervenții, 78 plângeri, 49 puncte de vedere, 26 întâmpinări.
- **Folosire sancționată: selecție chirurgicală de blocuri argumentative**, nu copiere în masă —
  `node scripts/mine-blocuri.js <temă>` (corpus: env `BAZA_CNSC` sau calea implicită) → citește
  fragmentul în context → curatoriază în `references/blocuri-argumentative.md` (ambele fețe + limită,
  anonimizat manual). Dovadă (user): „selectie chirurgicala de concepte, nu copy paste neanderthalian".
