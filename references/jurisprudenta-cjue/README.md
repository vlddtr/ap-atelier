# Jurisprudență CJUE — achiziții publice (INCLUSĂ în skill)

Jurisprudența Curții de Justiție a UE pe directivele 2014/23-24-25 și remedii (89/665, 92/13).
**Primează asupra interpretării naționale** — instanța română și CNSC sunt ținute de
interpretarea CJUE a noțiunilor de drept UE transpuse în L. 98/99/100/101. E nivelul superior
de autoritate față de corpusul CNSC (administrativ) și CA (instanță națională).

**Nu necesită anonimizare** — jurisprudență publică UE; părțile (state membre, operatori care
au litigat la nivel UE) sunt citate public prin nr. cauză + ECLI + nume parte (ex. C-454/06
*pressetext*, C-927/19 *Klaipėdos*). Surse oficiale: EUR-Lex / curia.europa.eu.

## Structură
- `spete/` — **59 spețe curate** (`.md`), una per cauză. Fiecare are: metadate (cauză, ECLI,
  dată, părți), întrebarea preliminară, **soluția/ratio**, **citat-cheie verbatim cu nr. punct
  (pct. 34 etc.)**, **relevanța pentru dreptul RO mapată pe articolul din L. 98** și URL-ul
  oficial EUR-Lex. Status: VERIFICAT pe sursă. **Sursa principală de citare.**
- `cadru/` — directivele UE (2014/23, 2014/24, 2014/25), directivele-remedii, ghidurile
  Comisiei și ANAP — corespondența directivă ↔ lege internă.
- `texte-integrale/` — **54 hotărâri/ordonanțe CJUE integrale** (`.txt`), inclusiv cauze
  recente (C-927/19 *Klaipėdos*, C-537/19, C-210/20, C-23/20 etc.). Pentru verificare verbatim
  dincolo de extrasul curat și pentru cauzele care nu au fișier curat în `spete/`.
- `index-teme.md` — **catalog master pe 11 teme**, fiecare mapată pe articolul din L. 98/HG 395
  (preț neobișnuit → art. 210; clarificări → art. 209; excludere/self-cleaning → art. 164-171;
  terț susținător → art. 182-186; criterii atribuire → art. 187; modificare contract → art. 221;
  in-house → art. 31; remedii/standstill → L. 101 etc.).

## Cum o folosești
1. Identifică instituția de drept UE în joc (modificare substanțială, preț anormal de scăzut,
   self-cleaning, terț susținător, separare selecție/atribuire, standstill...).
2. `index-teme.md` → tema → cauza-reper (ex. modificare contract → *pressetext* C-454/06).
3. Citește speța curată în `spete/<C-xxx-yy>_<nume>.md` — **citează pe ratio + punctul verbatim**
   (pct. nr.), și **leagă de articolul intern** pe care îl interpretează (relevanța e deja în fișier).
4. Pentru text integral / verificare / cauze noi: Grep în `texte-integrale/`.
   `grep -ril "<temă>" references/jurisprudenta-cjue/`

## Concordanța articolelor (citarea peste directive)
Cauzele citează **articole din directive** (adesea cele **vechi** — 2004/18, 92/50). Pentru a traduce
în drept intern, vezi **`cadru/concordanta-directive.md`** — tabel art. directivă veche → art. 2014/24
→ art. L. 98 (+ remedii 89/665 → L. 101), pe fiecare instituție din corpus, cu cauzele-reper. Acolo
e puntea: ex. preț anormal → art. 55 Dir. 2004/18 = art. 69 Dir. 2014/24 = **art. 210 L. 98**.

## Regula de forță (ierarhia argumentului)
Când o noțiune din L. 98/99/100/101 transpune o directivă, **interpretarea CJUE e obligatorie**
și bate o practică internă contrară. Construcția cea mai tare: normă internă → directiva-sursă →
**ratio CJUE (punctul verbatim)** → aplicare la speță. Atenție la regimul temporal: unele cauze
sunt sub directivele vechi (2004/18, 92/50) — verifică dacă ratio a fost preluat în 2014/24
(de regulă da, dar confirmă pe articolul actual; vezi nota din concordanță).
