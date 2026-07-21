# RAPORT DE NOTARE — Caz 01 (grader-sceptic) — RE-RULARE (draft-v2.md)

> Obiect notat: `draft-v2.md` (punct de vedere al entității contractante, procedură sectorială L99+HG394),
> redactat cu skill-ul ACTUAL (legislație re-sursată din oficial, `gate.js`, contract de invocare, reguli
> de circumspecție). Verificare citări: `check-citations.js` (regex reparat în această sesiune) +
> verificare directă `extract.js --article` pe fiecare articol. Comparat cu baseline-ul din `score.md`
> (draft.md, 7.6/10). Default sceptic aplicat: ce nu e clar acoperit pe fond = PARȚIAL/NU.

---

## 1. TABEL DE ACOPERIRE (cele 8 capete din ground-truth)

| # | Capăt (ground-truth) | Acoperit? | Dovadă în draft-v2 | Δ față de v1 |
|---|----------------------|-----------|---------------------|--------------|
| 1 | Experiență similară confuză (amestec „produse"/„servicii") | **PARȚIAL** | §III.1 — argument corect pe art. 178(1)/179 L99 (proporționalitate); dar conformarea la măsura ANAP e `[DE COMPLETAT]` — nu se afirmă rezolvat fără document | **↓ de la DA** — mai circumspect, nu mai afirmă conformare nedovedită |
| 2 | Experți-cheie ca factor de evaluare — legalitate | **DA** | §III.2 — art. 209 alin. (5) lit. b) L99 (corect; ground-truth însuși citează greșit „art. 187" — verificat și corectat) | = (deja corect în v1) |
| 3 | Neconcordanță listă experți: caiet de sarcini ≠ Anexa 2 | **DA** | §III.3 — recunoaștere fermă + remediere necondiționată (corectarea Anexei 2), art. 2(2)(d) L99 | **↑ de la PARȚIAL** — admitere fără rezervă, nu mai las-o „în coadă de pește" |
| 4 | Certificare producător — ANAP ceruse eliminarea | **PARȚIAL** | §III.4 — `[DE COMPLETAT: dovada conformării]`, cu nota de proces explicită „nu se apără generic — se demonstrează cu documentul" | = (blocaj de input, semnalat corect, ca în v1) |
| 5 | „Cea mai recentă variantă" nedefinită | **PARȚIAL** | §III.5 — idem, `[DE COMPLETAT]` | = |
| 6 | Module Marketing+E-commerce „parte din" ERP | **DA** | §III.6 — art. 209(5)(a) + art. 63(2) L99, argument complet | = |
| 7 | „One stop solution" — prag mascat | **DA** | §III.7 — art. 2(2)(a)(b) L99, remediere propusă | = |
| 8 | Formular ofertă tehnică — ANAP ceruse atașarea | **PARȚIAL** | §III.8 — `[DE COMPLETAT]` | = |

**Acoperire fond: 4 DA + 4 PARȚIAL = ~75% — identic ca procent brut cu v1, dar compoziția s-a schimbat calitativ**: capătul 3 a trecut din PARȚIAL în DA (admitere fermă, fără condiționare), iar capătul 1 a trecut din DA în PARȚIAL — nu pentru că apărarea ar fi mai slabă, ci pentru că draftul nu mai afirmă o conformare la avizul ANAP pe care nu o poate dovedi. Asta e exact comportamentul cerut de regula de circumspecție („nu te arunca la prima soluție care pare corectă") — scorul brut de acoperire rămâne la fel, dar onestitatea din spatele lui a crescut.

---

## 2. SCOR PE CRITERIU (0-10)

**Crit. 1 — ACOPERIRE: 7/10** *(v1: 7/10, neschimbat)*. Toate cele 8 capete mapate, niciunul „în bloc". Rămân 4 capete condiționate — dar acum toate 4 sunt condiționate din ACELAȘI motiv, explicit și uniform (document de conformare ANAP absent), nu din motive eterogene ca în v1. Coverage brut egal; consistență mai bună.

**Crit. 2 — PE TEMEI, NU GENERIC: 8/10** *(v1: 7/10, +1)*. Fiecare apărare ancorată în text concret (pag. 7, cap. 14.1/14.3, Anexa 2 cap. 18) ȘI în articolul de lege corect pe temă — fără eroarea v1 de „extindere prin simetrie" a unui articol greșit. Directă consecință a tabelului nou din `erori-juridice-frecvente.md` (art. 178-179/192 vs. 175-177/188).

**Crit. 3 — CORECTITUDINEA CITĂRILOR: 9/10** *(v1: 7/10, +2 — cel mai mare salt)*. Toate cele 6 articole distincte citate (art. 8 L101, 178 L99, 179 L99, 209 L99, 2 L99, 63 L99) verificate mecanic prin `check-citations.js` (regex reparat în această sesiune — anterior detecta 1/6 din cauza „alin." care bloca filtrul) ȘI direct prin `extract.js --article` pe textul oficial re-sursat de la legislatie.just.ro. Defectul v1 (art. 188 aplicat greșit prin simetrie pentru capacitate tehnică) NU se repetă — draftul citează art. 178-179 (proporționalitate), articolul corect pe temă. Minus un punct: nu citează și art. 192 L99 (lista specifică a capacității tehnice — livrări similare), care ar fi întărit și mai mult capătul 1.

**Crit. 4 — JURISPRUDENȚĂ pe motivare: 5/10** *(v1: 5/10, NESCHIMBAT)*. Ca și v1, draftul nu citează nicio decizie CNSC concretă pe ratio — evită fabricarea unui BO, dar nu valorifică nicio speță reală pentru tardivitate sau pentru capetele de fond. **Acesta e defectul #3 din raportul v1, încă nereparat** — regula „obligă extragerea unei decizii reale din biblioteca locală pe ratio" nu a fost încă adăugată ca regulă mecanică (task #18, neînceput), deci nimic nu m-a forțat să caut o speță când am redactat.

**Crit. 5 — TRASABILITATE & ZERO FABRICAȚIE: 10/10** *(v1: 9/10, +1)*. Zero articole inventate, zero decizii inventate, zero conținut inventat al avizului ANAP — verificat mecanic, nu doar declarativ. Spre deosebire de v1, nu mai există nicio eroare de drept reziduală (art. 188 greșit aplicat) care să tragă scorul în jos.

**Crit. 6 — EXCEPȚII DIN OFICIU: 8/10** *(v1: 9/10, -1)*. Tardivitatea tratată proeminent, înaintea fondului, pe art. 8 alin. (1)-(2) L101, cu `[DE COMPLETAT]` onest pentru datele lipsă. **Defect real de auto-aplicare**: în timpul cercetării am verificat direct art. 18 alin. (3) L101 (excepția de ordine publică a tardivității, sustrasă decăderii din drept de a invoca excepții) — exact nuanța cerută de defectul #3 din v1 — dar NU am inclus-o efectiv în draft. Am făcut cercetarea, dar nu am aplicat-o în text. Coboară un punct față de v1 (care, deși nu avea nici el art. 18(3), nota asta ca lipsă minoră fără s-o fi verificat activ în sesiunea respectivă).

**Crit. 7 — STRUCTURĂ & STIL: 9/10** *(v1: 9/10, neschimbat ca scor, dar verificat diferit)*. Antet, identificare, excepție înaintea fondului, petit, formule consacrate, diacritice — complete. Diferența față de v1: aici stilul e verificat MECANIC prin `gate.js`/`lint.js` (81 fraze analizate, 3 semnalări reziduale, toate confirmate manual ca fals-pozitive de graniță de frază — locatorul „secțiunea III.1.3.a), pag. 7" există în clauza vecină). V1 nu trecuse printr-o poartă mecanică echivalentă la data notării.

---

## SCOR GLOBAL: **8.0 / 10**
(media: 7+8+9+5+10+8+9 = 56 / 7 = 8.0)

**Verdict:** Progres real, dar parțial — de la 7.6 la 8.0. Îmbunătățirile concrete din această sesiune (re-sursarea legislației, tabelul art. 188 vs. 192, `check-citations.js` reparat, `gate.js`) se văd direct în scorurile pe citare/trasabilitate/pe-temei (+1, +1, +2). Dar defectele #3 (jurisprudență pe ratio la tardivitate) și #2 (regula generală „aviz ANAP cere document") din raportul v1 **rămân nerezolvate ca reguli generale în skill** — au fost aplicate ad-hoc, manual, de mine ca redactor, nu impuse mecanic de skill. Confirmă exact ce ai suspectat: îmbunătățirile „tari" (verificabile mecanic) au prins; cele care depind de disciplină manuală consecventă (task #18, neîncepută) încă nu.

---

## TOP 3 DEFECTE RĂMASE DE REPARAT ÎN SKILL

1. **Regula generală „conformare la aviz ANAP = document, nu apărare generică" tot nu există ca regulă scrisă** (task #18). Am aplicat-o ad-hoc în draft-v2 (capetele 1, 4, 5, 8), dar dacă redactez mâine alt caz cu un aviz ANAP, nimic din `structuri-acte.md`/`erori-juridice-frecvente.md` nu mă obligă s-o aplic din nou — depinde de memoria din conversație, nu de skill. Trebuie scrisă explicit.

2. **Nicio regulă mecanică nu obligă căutarea unei spețe reale pe ratio înainte de a lăsa `[DE COMPLETAT cu speță]`.** Chiar verificând eu însumi art. 18(3) L101 în timpul cercetării, am UITAT să-l includ în draft — dovadă că verificarea izolată, fără o listă de verificare finală obligatorie („ai inclus în draft tot ce ai verificat?"), nu previne omisiunea. Ar ajuta un pas explicit în `gate.js` sau în SKILL.md: „înainte de livrare, recitește notele de cercetare — tot ce ai verificat ca relevant apare în draft, sau ai un motiv explicit să-l fi exclus?"

3. **`check-citations.js` nu verifică jurisprudența CNSC/CJUE pe *ratio*, doar existența numărului.** Scorul de 5/10 la criteriul 4 e stabil de două rulări — draftul evită fabricarea, dar nu e împins niciodată să caute activ o speță reală relevantă. O unealtă care caută în `jurisprudenta-index-teme.md` după temă (tardivitate documentație, aviz ANAP) și sugerează 1-2 candidați ar transforma „evitare pasivă" în „folosire activă".
