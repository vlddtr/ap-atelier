# Decizii CNSC noi — STAGING (neindexate)

Extrase din dosarele firmei (`baza_cnsc`), anonimizate (anon-lib + scrub tokeni de client cunoscuți,
inclusiv variante OCR-deformate). **Nu sunt încă integrate** în `catalog-anon.json` / `index-teme.md` — folder separat de staging.

- Decizii puse în staging: **39**
- Duplicate eliminate: 46 (hash identic la extragere) + 5 (aproape-duplicate: același text extras pe căi diferite)
- Excluse pentru scurgeri nerezolvabile: 0
- Retrase din staging la revizuire: 20 acte ale firmei (plângeri/întâmpinări/cereri — nu decizii CNSC), 1 decizie de Curte de Apel, 0 neclasificabile
- Fișiere-sursă fără strat de text (necesită OCR): **311** — de procesat separat
- Fișiere-sursă care nu sunt decizii CNSC utilizabile (texte scurte/alte acte): 54; extensii neacceptate (.p7s etc.): 20; erori de extragere: 0

## Fișiere

- **DEC-2021-982** — an 2021, ~50k caractere — teme: clarificări, factori de evaluare, anulare — sursă: BO2021_1439_decizie cnsc OMNIA (ID 20588).pdf
- **DEC-2022-2697** — an 2022, ~103k caractere — teme: clarificări, DUAE — sursă: Decizie CNSC nr. 2687.pdf
- **DEC-2022-695** — an 2022, ~75k caractere — teme: experiență similară, clarificări, anulare — sursă: Decizia CNSC- CALARASI 875C102022 (ID 38778).docx
- **DEC-2023-1985** — an 2023, ~186k caractere — teme: clarificări, DUAE, factori de evaluare, experiență similară, garanție — sursă: Decizie CNSC 1985{2}C5{2}1888,1893 25.08.2023 SJU_h (ID 26806).docx
- **DEC-2023-2064** — an 2023, ~72k caractere — teme: DUAE, clarificări, factori de evaluare, preț neobișnuit, anulare — sursă: Decizie CNSC 2064_2023 C9 (ID 26244) (ID 26465).docx
- **DEC-2024-1018** — an 2024, ~185k caractere — teme: clarificări, DUAE, preț neobișnuit, factori de evaluare, garanție — sursă: Decizie 1 CNSC (ID 32768).docx
- **DEC-2024-1459** — an 2024, ~101k caractere — teme: clarificări, factori de evaluare, anulare — sursă: Decizie nr. 1459.C7.1580 - procedura Vaslui.pdf (ID 30090).docx
- **DEC-2024-2178** — an 2024, ~117k caractere — teme: clarificări, factori de evaluare, tardivitate — sursă: Decizie nr. 2178.C6.2100 (ID 30918) (ID 30946).docx
- **DEC-2024-2189** — an 2024, ~258k caractere — teme: clarificări, factori de evaluare, anulare, preț neobișnuit, tardivitate — sursă: DECIZIE CNSC AUGUST (ID 32771).docx
- **DEC-2024-2378** — an 2024, ~41k caractere — teme: anulare, garanție, clarificări, DUAE, factori de evaluare — sursă: Decizie nr. 2378.C8.2504 - X (ID 31095) (ID 31247).docx
- **DEC-2024-2412** — an 2024, ~237k caractere — teme: clarificări, DUAE, factori de evaluare, terț susținător, tardivitate — sursă: Decizie nr. 2100.C5.1661, 2028, 2412 (ID 30836) (ID 30910).docx
- **DEC-2024-2448** — an 2024, ~108k caractere — teme: garanție, tardivitate — sursă: Decizia CNSC 2268-c9-2026- Braila-1 (ID 38769) (ID 39785).docx
- **DEC-2024-3417** — an 2024, ~121k caractere — teme: clarificări, factori de evaluare, anulare — sursă: Decizie nr. 3417.C8.3813, 3938 - [PARTE] (ID 33794).docx
- **DEC-2024-364** — an 2024, ~38k caractere — teme: clarificări, preț neobișnuit, anulare, garanție, DUAE — sursă: Decizie X Dosar nr. 364_2024 (ID 28789) (ID 29017).docx
- **DEC-2024-558** — an 2024, ~120k caractere — teme: clarificări, factori de evaluare, preț neobișnuit, DUAE, semnătură electronică — sursă: decizie-nr-558-c-7-441-2024-.pdf
- **DEC-2025-1043** — an 2025, ~60k caractere — teme: terț susținător, anulare, clarificări, DUAE, factori de evaluare — sursă: Decizie nr. 043.C8.948 - [PARTE] (ID 35333).docx
- **DEC-2025-1443** — an 2025, ~393k caractere — teme: clarificări, preț neobișnuit, semnătură electronică, tardivitate, anulare — sursă: Decizie CNSC (3) (ID 35910) (ID 35913).docx
- **DEC-2025-1484** — an 2025, ~39k caractere — teme: clarificări, DUAE, terț susținător, tardivitate, anulare — sursă: Deciziei CNSC 1442_C4_2025 (ID 35890) (ID 38578).docx
- **DEC-2025-1782** — an 2025, ~77k caractere — teme: clarificări, tardivitate, anulare — sursă: Decizie nr. 1782.C2.1479, 1684 din 26.06.2025 (ID 36281) (ID 36495).docx
- **DEC-2025-2559** — an 2025, ~111k caractere — teme: experiență similară, clarificări, anulare, DUAE — sursă: decizie CNSC anulare procedura Arad - d. nr. 2992-2025 (ID 38349).pdf
- **DEC-2025-2689** — an 2025, ~73k caractere — teme: DUAE, clarificări, terț susținător, tardivitate, anulare — sursă: DECIZIE CNSC LUCRARI REABILITARE (ID 39167).docx
- **DEC-2025-2780** — an 2025, ~87k caractere — teme: clarificări, preț neobișnuit, anulare — sursă: BO2025_2780 Decizie site CNSC (ID 38196).pdf
- **DEC-2025-2955** — an 2025, ~137k caractere — teme: tardivitate — sursă: Decizie CNSC_2955_semnat Sectorul 6 (ID 38756).docx
- **DEC-2025-3162** — an 2025, ~61k caractere — teme: DUAE, clarificări, terț susținător, tardivitate — sursă: Decizie nr. 3162.C9.3638 - Flash (ID 38861) (ID 39024).docx
- **DEC-2025-3931** — an 2025, ~32k caractere — teme: anulare, clarificări, factori de evaluare — sursă: CNSC-DECIZIE 44-05.01.2026-ANULARE ZONA 1 (3) (ID 40336).pdf
- **DEC-2025-3937** — an 2025, ~28k caractere — teme: DUAE, clarificări, garanție, terț susținător — sursă: Decizia nr. 3937.C8.4710 - Flash (ID 39898).pdf
- **DEC-2025-411** — an 2025, ~87k caractere — teme: clarificări, preț neobișnuit, tardivitate, factori de evaluare — sursă: Decizie nr. 661,C9,411- Flash (ID 34817) (ID 35062).docx
- **DEC-2025-752** — an 2025, ~39k caractere — teme: experiență similară, clarificări, tardivitate, anulare, DUAE — sursă: Decizie nr. 752.C2.509 - X - Dosar 509_2025 (ID 34937) (ID 35158).docx
- **DEC-2025-990** — an 2025, ~46k caractere — teme: garanție, clarificări, anulare — sursă: Decizie nr. 990.C1.847 - procedura Constanta - X (ID 35821).docx
- **DEC-2026-1689** — an 2026, ~855k caractere — teme: clarificări, factori de evaluare, DUAE, experiență similară, terț susținător — sursă: Decizia CNSC nr. 1689_posta - A7 Lot 1 si 2 (ID 42187).pdf
- **DEC-2026-1803** — an 2026, ~266k caractere — teme: clarificări, preț neobișnuit, experiență similară, factori de evaluare, DUAE — sursă: Decizie CNSC 1803_04.06.2026_Sv Siret Lot 3_semnat (ID 42189).docx
- **DEC-2026-513** — an 2026, ~421k caractere — teme: clarificări, terț susținător, factori de evaluare, experiență similară, DUAE — sursă: Decizia nr. 513.C9.4825 - X (ID 40881).docx
- **DEC-2026-632** — an 2026, ~194k caractere — teme: clarificări, preț neobișnuit, factori de evaluare, DUAE, semnătură electronică — sursă: Decizia nr. 2008.C5.625, 626, 632, 1003 - X (ID 42536).docx
- **DEC-2026-971** — an 2026, ~77k caractere — teme: experiență similară, factori de evaluare, anulare — sursă: Decizia nr. 971.C5.4193, 4215 - RER ECOLOGIC (ID 41224).pdf
- **DEC-necunoscut-002** — an 2016, ~61k caractere — teme: clarificări, terț susținător, anulare, factori de evaluare — sursă: BO2024_737 decizie portal CNSC.pdf
- **DEC-necunoscut-003** — an 2016, ~61k caractere — teme: clarificări, tardivitate, factori de evaluare, anulare — sursă: BO2025_3812 decizie 4579_C5_2025 (ID 39741).pdf
- **DEC-necunoscut-004** — an 2025, ~231k caractere — teme: anulare, experiență similară, clarificări — sursă: Decizie CNSC_semnat sector 6 prima decizie (ID 38758).docx
- **DEC-necunoscut-005** — an 2016, ~64k caractere — teme: clarificări, tardivitate, anulare — sursă: Decizie_2777.pdf (ID 16522).docx
- **DEC-necunoscut-006** — an 2025, ~16k caractere — teme: DUAE, clarificări, preț neobișnuit, factori de evaluare, garanție — sursă: Raportul procedurii rev conf     Decizie CNSC-2_semnat-semnat (ID 37703).pdf

## Retrase din staging la revizuirea manuală

### Acte ale firmei (nu decizii CNSC) — nu se publică (conțin lucrări proprii/identități)
- DEC-2021-2890 — sursă: Intampinare plangere Urbioled Decizie 2890 tramvai 101 (ID 21685).docx
- DEC-2022-3417 — sursă: plangere impotriva Deciziei CNSC nr3417-C8-3813 (2) (ID 33798).docx
- DEC-2023-1566 — sursă: Plangere Decizie Deva_29.07.2024 (ID 30736).docx
- DEC-2023-2244 — sursă: [OPERATOR ECONOMIC]_Plangere Decizie CNSC 2244_2294 Mun. [localitate].docx
- DEC-2023-2926 — sursă: Plangere Decizie 2926{2}2024 Satu Mare 2024 (ID 32529).docx
- DEC-2023-504 — sursă: Plângere decizie CNSC 504 AC Mun Ploiesti 16.03.2023 (ID 25046).docx
- DEC-2024-1661 — sursă: Cerere completare Decizie 2100 cheltuieli [PARTE]_12.08.2024 (ID 30925).docx
- DEC-2024-1702 — sursă: Plangere deciziei CNSC 1702 C4 1559 1586 Mun Medias (ID 30572).docx
- DEC-2024-2449 — sursă: Plangere deciziei CNSC (ID 37851).docx
- DEC-2024-2866 — sursă: plângere Decizia CNSC nr. 2866-C3-2024 (ID 32231).pdf
- DEC-2024-3937 — sursă: Plangere decizie CNSC (ID 40076).docx
- DEC-2024-975 — sursă: Plangere - UAT [localitate]. PH - Decizie CNSC nr. 975.C10.18 (ID 35307).pdf
- DEC-2024-990 — sursă: Plangere_[PARTE]_Deciziei_CNSC nr. 990_C1_2025_28.04.2025 (ID 35346).docx
- DEC-2025-1801 — sursă: Plangere deciziei CNSC 14.07.2025 (ID 36497).docx
- DEC-2025-3162-b — sursă: Plangere deciziei CNSC Ludus (ID 39022).docx
- DEC-2025-640 — sursă: Plângere împotriva Deciziei CNSC nr. 640.C5.260  Rev. 25.03.2025 (ID 34861).docx
- DEC-2025-752-b — sursă: Plangere CJ Buzau - Decizie CNSC Dosar nr. 509_2025 (ID 35134).docx
- DEC-2025-990-b — sursă: Plangere_[PARTE]_Deciziei_CNSC nr. 990_C1_2025_28.04.2025 - VD + SB (ID 35822).docx
- DEC-2026-387 — sursă: Plangere decizie CNSC (ID 40746).docx
- DEC-necunoscut-001 — sursă: Argumente contestatie decizie CNSC SM (ID 32295).docx

### Decizii ale altei instanțe (de mutat eventual în jurisprudenta-ca, separat)
- DEC-2024-448 — sursă: Decizie CA Brasov - dosar 244_64_2024 (ID 30499).pdf

### Aproape-duplicate eliminate
- DEC-2024-2189-b — sursă: DECIZIE CNSC AUGUST (ID 32795).docx
- DEC-2026-1689-b — sursă: Decizia CNSC nr. 1689_posta - A7 Lot 1 si 2 (ID 42187).txt
- DEC-2026-1727-b — sursă: Decizie CNSC 1803_04.06.2026_Sv Siret Lot 3_semnat (ID 42185).txt
- DEC-2026-1727 — sursă: Decizie CNSC 1803_04.06.2026_Sv Siret Lot 3_semnat (ID 42185).pdf
- DEC-2026-971-b — sursă: Decizia nr. 971.C5.4193, 4215 - RER ECOLOGIC (ID 41224).txt

## Scan rezidual (după scrub-ul final, pe fișierele publicate)

- Identificatori structurați (CUI/RegCom/CNP/IBAN/e-mail): **0** (trebuie 0)
- Tokeni de client reziduali: **0**
- Categorii euristice (posibile fals-pozitive, de revizuit la indexare): AUTH_LEAK 1
