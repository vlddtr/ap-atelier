# Rutina de auto-actualizare a skill-ului

Scop: skill-ul să rămână la zi — jurisprudență CNSC nouă, modificări legislative, practică/presă —
fără intervenție manuală. Cadență recomandată: **săptămânal**. Rulează această rutină ca prompt
(de un agent cu acces la web + la disc); pașii sunt deterministici.

## Regula de siguranță (înainte de orice)
- **Anti-ban (lecția SEAP/CNSC):** descărcare DOAR secvențială, max 5 decizii noi/run, pauză 4s
  între cereri, User-Agent de browser. Caută linkurile prin Google (`site:portal.cnsc.ro`), nu
  bombarda portalul. Dacă serverul întoarce 200 cu corp gol → IP throttled, OPREȘTE imediat.
- **Verifică, nu încorpora orb:** orice articol/decizie nouă se verifică (lege consolidată /
  motivare) înainte de a intra în referințe. Neverificat → marchează „de verificat", nu afirma.

## Pasul 1 — Jurisprudență CNSC nouă
1. Pentru fiecare temă-cheie (preț-neobișnuit, clarificări, restrictive, terț, conflict,
   tardivitate, anulare, excludere, garanții, sectorial), `WebSearch site:portal.cnsc.ro decizie
   <anul curent> <temă>`. Adună ID-urile BO din linkurile sivadoc.
2. **Dedup** contra `catalog.json` al corpusului CNSC (dacă există local — vezi `biblioteca-locala.md`) — păstrează doar BO-urile care NU există.
3. Descarcă max 5 noi (secvențial, pauză 4s, UA browser — vezi memoria `cnsc-portal-and-local-env`).
4. Extrage textul integral (`extract.js`), citește MOTIVAREA + dispozitivul.
5. Adaugă în catalog.json (file, year, obiect, proc, law, outcome, themes) și recalculează ratele
   din `tipare-decizionale.md` (rulează `%TEMP%\pdfx\baserates.js` echivalent pe catalogul nou).
6. Dacă o decizie nouă schimbă un holding dintr-un concept → actualizează
   `concepte-complexe-jurisprudenta.md` cu ID-ul BO + ratio verificat.

## Pasul 2 — Modificări legislative
1. `WebSearch`/`WebFetch` pe **legislatie.just.ro** + **anap.gov.ro** pentru modificări la
   L. 98/99/100/101 și HG 394/395 de la ultimul run (noi OUG/HG, renumerotări).
2. Dacă s-a schimbat un prag (Reg. UE), un termen, sau s-a renumerotat un articol →
   actualizează `erori-juridice-frecvente.md` / nota de praguri și marchează ce trebuie re-verificat
   în actele care citează articolul afectat.

## Pasul 3 — Practică / presă / jurisprudență europeană
1. `WebSearch` pe: notificări/instrucțiuni ANAP noi; hotărâri CJUE pe achiziții (curia.europa.eu);
   RIL/HP ÎCCJ; presă de specialitate relevantă.
2. Reține doar ce are impact pe redactare/raționament (nu zgomot).

## Pasul 4 — Digest
Scrie `eval/updates/update-<data>.md`: ce e nou (decizii adăugate cu ID, modificări legislative,
hotărâri CJUE), ce s-a schimbat în referințele skill-ului, ce rămâne „de verificat". Acest digest
e și jurnalul de versiune al skill-ului.

## Pasul 5 — Regresie
După update, re-rulează harness-ul (`eval/case-01` + cazurile adăugate) ca să confirmi că noile
reguli/date NU au scăzut scorul de calitate.
