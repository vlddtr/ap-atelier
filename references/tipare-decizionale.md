# Tipare decizionale CNSC — ratele reale, nu intuiția

> **De ce există.** Edge-ul unui avocat cu 20 de ani nu e doar cunoașterea legii, ci
> recunoașterea tiparelor: „ce face de fapt completul". Acest fișier înlocuiește intuiția cu
> **date reale** — ratele de admitere calculate din cele 159 de decizii CNSC din
> corpusul CNSC opțional (`catalog.json` — vezi `biblioteca-locala.md`), 2016-2026. Folosește-le ca **prior de calibrare** când
> evaluezi șanse (vezi `judecata-si-predictie.md` Disciplina 5), NU ca verdict — sunt
> corelaționale, nu cauzale (vezi limitele la final).

## Rata de bază globală — ancora anti-status-quo

Din 159 de decizii: **RESPINGE 47% · ADMITE 35% · ADMITE ÎN PARTE 17%.**

**52% din contestații reușesc măcar parțial** (admise integral / în parte / anulare). Adică
e aproape o monedă, **ușor în favoarea contestatorului**.

> **Implicație directă (din eroarea BO2026_64):** NU porni de la prezumția că rezultatul
> procedurii e legal și contestația va pica. Predicția „RESPINGE 88%" de la primul test era
> statistic aberantă — cu un prior de 52% favorabil, o predicție de respingere fermă cere
> dovezi serioase că *toate* capetele cad, nu doar sub-motivul vizibil.

## Ratele pe temă — priorul de calibrare (% favorabil contestatorului)

Procentul = în câte din deciziile unde tema apare contestatorul obține ceva (admite/parte/anulare).
Sortat de la temele pro-contestator la cele pro-AC:

| Temă | n | % favorabil | Înclinare |
|---|---|---|---|
| **criterii-atribuire** (factori de evaluare) | 24 | **75%** | puternic pro-contestator |
| **anulare-procedura** | 20 | **75%** | puternic pro-contestator |
| procedura-proprie | 7 | 71% | pro-contestator (n mic) |
| **confidentialitate-acces-dosar** | 23 | 65% | pro-contestator |
| garantie-participare | 8 | 63% | pro-contestator (n mic) |
| **pret-neobisnuit** | 18 | 61% | pro-contestator |
| conflict-interese | 5 | 60% | pro-contestator (n mic) |
| concesiune-L100 | 32 | 59% | ușor pro-contestator |
| tert-sustinator | 7 | 57% | ușor (n mic) |
| negociere-fara-publicare | 7 | 57% | ușor (n mic) |
| erori-aritmetice | 9 | 56% | ușor (n mic) |
| loturi-valoare-estimata | 29 | 55% | ușor |
| specificatii-restrictive | 72 | 53% | echilibrat |
| sectorial-L99 | 15 | 53% | echilibrat |
| **excludere-164-167** | 17 | **47%** | echilibrat→pro-AC |
| SEAP-semnatura | 91 | 47% | echilibrat→pro-AC |
| clarificari | 18 | 44% | pro-AC |
| experienta-similara | 18 | 44% | pro-AC |
| subcontractant | 19 | 42% | pro-AC |
| DUAE | 46 | 41% | pro-AC |
| asociere | 50 | 38% | pro-AC |
| cautiune | 6 | 33% | pro-AC (n mic) |
| **tardivitate-termen** | 7 | 29% | puternic pro-AC |
| **modificare-propunere** | 18 | **28%** | puternic pro-AC |

### Cum citești tabelul
- **Teme „de atac" (rate înalte):** criterii de atribuire/factori de evaluare, anularea
  procedurii, accesul la dosar, prețul neobișnuit — când contestația se sprijină pe ele, șansa
  e bună. *Aici se câștigă.*
- **Teme „de apărare" (rate joase):** tardivitatea, „modificarea propunerii" (= AC respinge
  pe neconformitate), DUAE, asocierea — când cazul *depinde* de ele, contestatorul de regulă
  pierde. Dacă reprezinți AC, mizează pe ele; dacă reprezinți contestatorul, nu construi
  exclusiv pe ele.

> **Retro-aplicare la cele două erori:**
> - **BO2026_64** s-a admis pe evaluarea ofertei câștigătoare — temă **criterii-atribuire,
>   75% favorabil**. Agentul a prezis RESPINGE ignorând și priorul global (52%), și că tocmai
>   terenul câștigător avea cea mai mare rată de admitere. Priorul singur ar fi întors predicția.
> - **BO2025_1842**: excludere 164-167 e **47% favorabil** (ușor pro-AC), iar cârligul factual
>   (penalități pending) împinge spre menținerea excluderii. Predicția ADMITE mergea contra
>   priorului; RESPINGE era soluția consistentă cu datele.

## Factori calitativi de basculare (din motivările reale)

Dincolo de rate, tipare de cântărire observate în motivări (folosește-le ca semnale, verifică-le
pe speță):
- **Motivare generică în raport/PV** (fără elementele concrete ale ofertei, art. 131(4) HG 395)
  → completul dispune de regulă **reevaluare** (admite în parte). Semnal puternic pro-contestator.
- **Penalități/daune cuantificate sau iminente** pe contractul invocat la excludere → excluderea
  e de regulă **menținută**, chiar dacă nu sunt încă aplicate (BO2025_1842).
- **Cerință din documentație necontestată în termen** → critica e **tardivă**, oricât de
  întemeiată pe fond (consolidare definitivă).
- **Lipsă substanțială deghizată în „viciu de formă"** → respinsă ca neconformă; completul nu
  acceptă completarea unei lipse prin clarificări.
- **Acuzație fără probă** (conflict, restrictiv) → respinsă; sarcina probei pe cel care invocă.
- **Document constatator intermediar/neconsolidat** → de regulă **nu** probează excluderea.

## Limitele datelor (citește înainte de a te baza pe ele)

- **Corelație, nu cauzalitate.** O temă apare într-o decizie cu 3-4 teme; rata e de
  co-ocurență, nu „tema asta a decis". O temă cu rată joasă poate fi prezentă într-un caz
  câștigat pe altă temă.
- **n mic** pentru multe teme (conflict 5, cauțiune 6, tardivitate 7, terț 7) — tratează acele
  procente ca orientative, nu statistice.
- **Mix temporal:** include decizii 2016-2020 sub legislație posibil diferită (BO2016_* pot fi
  sub OUG 34/2006). Pentru tipare 2025-2026 curate, filtrează pe an.
- **Corpus parțial:** 159 decizii, nu întreaga practică. Ratele se vor rafina pe măsură ce
  corpusul crește (pipeline-ul de descărcare există). Recalculează după fiecare extindere.
