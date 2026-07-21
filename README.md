# redactare-acte-achizitii

Skill Claude Code pentru analiză și redactare de acte în achiziții publice (drept român):
ofertare, evaluare, contestare (CNSC / instanță), executare. Produce **analiză + redactare
în stilul utilizatorului**, nu predicții de soluție.

## Conținut
- `SKILL.md` — punctul de intrare (principii, mod consultanță, porți de proces).
- `references/` — baza de cunoaștere:
  - `stil-corectii-chatgpt.md`, `stil-argumentativ.md`, `formule-consacrate.md` — stilul de redactare (anonimizat).
  - `anap-spete.md` — 459 spețe oficiale ANAP (40 categorii), de căutat cu Grep.
  - `erori-juridice-frecvente.md`, `concepte-complexe-jurisprudenta.md`, `evaluare-playbook.md`,
    `tipare-decizionale.md`, `structuri-acte.md`, `biblioteca-locala.md`, `judecata-si-predictie.md`.
- `scripts/` — `extract.js` (citire integrală a legii/deciziilor, anti-trunchiere) + `update.md` (rutina de auto-actualizare).
- `eval/` — harness de calitate (drafter → grader pe cazuri controlate).

## Instalare dependențe scripturi
```
cd scripts
npm install
```

## Confidențialitate
Acest repo **nu conține date reale de client**. Toate exemplele de stil folosesc substituenți
(`[DENUMIRE OFERTANT]`, `Asocierea [A]/[B]`, `[nr./dată]`). Numerele de cauze CJUE/ÎCCJ publicate
sunt drept public. Înainte de orice commit: anonimizează identificatorii (nume părți, CUI, numere
de dosar/aviz, valori exacte din dosar).
