# scripts/ — unealta anti-trunchiere

Există un singur scop: **să facă imposibilă citirea trunchiată** a surselor (cap+coadă,
sinteză, dispozitiv, primul alineat / denumire marginală) — cauza sistematică a erorilor
juridice ale modelului. NU produce rezumate; scoate textul INTEGRAL.

## Instalare (o singură dată)
Dependențele sunt deja instalate în acest folder (`node_modules/`). Dacă lipsesc (alt
calculator, sync incomplet):
```
cd scripts
npm install pdf-parse@1.1.1 mammoth
```
Pe alt sistem unde `node_modules` nu e portabil, rulează `npm install` din nou aici.

## Folosire
```
# MANIFEST dosar (întâi) — lista tuturor documentelor de citit integral, niciunul sărit
node extract.js --scan <folder-dosar>

# HARTA DE ANSAMBLU (după citire, înainte de sinteză) — scoate cross-document numerele-cu-unitate,
# datele, termenii definiți și trimiterile interne, ca să prinzi nuanțele/nepotrivirile (analiza-ansamblu.md)
node extract.js --map <folder-dosar>

# DIFF între versiuni (REV0/REV1) — ce s-a MODIFICAT/ADĂUGAT (redeschide termenul) vs neschimbat (tardiv)
node extract.js --diff <versiune_initiala> <versiune_rev>

# POARTA UNICĂ — DEFINIȚIA lui „GATA" (rulează asta la pre-livrare). Orchestrează stil + citări + fapte
# într-o comandă, scoate un verdict + o linie de raportat utilizatorului. Un act nu e final până nu trece aici.
node gate.js <act.txt> [folder-dosar]

# POARTA DE STIL (înainte de livrare) — flaghează opoziția „nu X, ci Y"/„iar nu", intensificatorii
# goi, semnalizarea, meta-textul, §9 locator, enumerarea robotică („în al N-lea rând"), umplutura/
# AI-bullshit, metaforele inventate, forma scurtă cu titluri, deschideri repetitive între secțiuni
# (mai multe motive/capete care încep cu aceeași formulă), densitatea cratimei lungi „—" (registru
# eseistic vs. amprenta liniară a actelor-model, stil-corectii §12). --plangere: altitudinea
node lint.js <act.txt> [--plangere]

# POARTA DE CONFIDENȚIALITATE — scanează corpusul de jurisprudență (CNSC + CA, NU CJUE) de
# scurgeri de identitate (CUI/J/IBAN/email/CNP, firme SRL/SA/GmbH, autorități-parte, persoane).
# Rulează după orice adăugare de decizii noi. anon-lib.js = biblioteca de scrub reutilizabilă.
node audit-anon.js              # raport (exit!=0 dacă rămân identificatori structurați)
node audit-anon.js --fix-ids    # repară doar fișiere cu identificatori structurați
node audit-anon.js --fix-all    # re-aplică scrub complet pe orice fișier cu scurgeri

# INDEX TEMATIC UNIFICAT (CNSC + CA + CJUE) — regenerează references/jurisprudenta-index-teme.md
# după ce adaugi decizii noi (minează pe keyword-uri; CJUE hardcodat din index-teme curat)
node build-index-teme.js

# SUGESTIE JURISPRUDENȚĂ PE TEMĂ — rulează ÎNAINTE de a lăsa „[DE COMPLETAT cu speță]"; găsește
# tema în index, aplică rețeta ei de grep pe corpus, scoate candidați reali cu extras din motivare
node suggest-jurisprudenta.js "<temă/keyword>"
node suggest-jurisprudenta.js --list    # listează cele ~19 teme disponibile

# BIBLIOTECA DE ACTE-MODEL (exemplare de stil) — regenerează references/acte-model/ din colecția
# locală de modele (extrage + ANONIMIZEAZĂ determinist: nume clienți, CUI/RegCom, adrese detaliate,
# avocați). După regenerare, re-rulează scanarea de scurgeri înainte de commit.
node build-acte-model.js [<folder-sursă>]   # implicit: OneDrive/Desktop/Data/Modele

# POARTA ANTI-HALUCINAȚIE (înainte de livrare, dacă actul citează jurisprudență/articole) —
# verifică existența reală a cauzelor CJUE, BO-urilor CNSC și articolelor citate în draft
node check-citations.js <act.txt>

# POARTA FAPTELOR (înainte de livrare, dacă actul citează din dosar) — verifică fiecare citat între
# ghilimele atribuit unui document din dosar e regăsit LITERAL în fișierul-sursă (anti-citat-fabricat)
node check-facts.js <act.txt> <folder-dosar>
# (extract-lib.js = modul comun fullText/norm/walkDocs, folosit de extract.js + check-facts.js)

# DOCTOR de integritate a skill-ului — căile referențiate există, numerele de corpus din docs
# corespund realității, 0 identificatori structurați. Rulează după modificări structurale.
node check-skill.js

# articol de lege INTEGRAL (toate alineatele — nu doar alin. (1) sau denumirea marginală)
node extract.js <lege.docx> --article 154

# harta motivelor adverse (tabel de acoperire) — fiecare paragraf numerotat
node extract.js <plangere.pdf> --paragraphs

# text INTEGRAL segmentat ÎN TERMINAL (zero fișiere pe disc; chemi --chunk 1, 2... până la ultimul)
node extract.js <act.docx> --chunk 1     # PDF: preferă unealta Read direct (pages)

# textul integral ÎN TERMINAL (dacă încape; altfel te trimite la --chunk). Zero fișiere.
node extract.js <fisier.pdf>
```

## Surse-imagine (decizii scanate / poze)
extract.js NU citeste imagini. Decizia adversa vine frecvent ca scan/poze — citeste FIECARE imagine
integral (nu prima+ultima), transcrie considerentele relevante inainte de a concluziona. PDF scanat
fara text → citire vizuala pagina-cu-pagina. Aceeasi rigoare de citire integrala.

## Regula (vezi SKILL.md → „Principiul granularității")
- Articol citat → verifică-l cu `--article N` (toate alineatele). *Capcană dovedită: art. 154
  L98 — alin. (1) e documentația, dar (3) e GBE 10%; cine citește doar alin. (1) greșește.*
- Act advers → `--paragraphs` produce tabelul de acoperire; fiecare motiv = un rând = un răspuns.
- Decizie CNSC → citește MOTIVAREA integral (Read direct pe PDF / --chunk pe .docx), nu doar dispozitivul.
- Document lung → --chunk 1..N în terminal (sau Read pe PDF, în tranșe de pagini). NU cap+coadă. NIMIC scris pe disc.

## Minare blocuri argumentative (corpus mare, LOCAL)
Selecție chirurgicală din corpusul de acte ale firmei (baza_cnsc — vezi biblioteca-locala.md).
Scoate candidați pe temă cu fereastră de context; curatoria (ambele fețe + limita, anonimizare
manuală) se face în `references/blocuri-argumentative.md`.
```
node mine-blocuri.js                 # listează temele disponibile
node mine-blocuri.js <temă> [max]    # corpus: env BAZA_CNSC sau calea implicită OneDrive
```
