# Unelte externe evaluate (proiecte open-source RO legal)

Evaluare a unor proiecte publice pentru integrare în skill. Concluzii + ce s-a făcut.

## ✅ DE FOLOSIT — Romanian-law-mcp (`ansvar`) — Ansvar Systems
- **Ce:** server MCP (TypeScript), **12.001 legi / 112.257 articole** din legislatie.just.ro +
  Monitorul Oficial + EUR-Lex, verbatim, cu FTS5. 13 tools: `search_legislation`, `get_provision`,
  **`check_currency`**, **`validate_citation`**, `build_legal_stance`, `format_citation`,
  `get_eu_basis`, `get_romanian_implementations`, `validate_eu_compliance` etc. Licență **Apache-2.0**.
- **De ce contează:** umple golul cel mai mare al skill-ului — legislația bundle-uită e statică (11 legi);
  MCP-ul e LIVE + verifică vigoarea (`check_currency`) și citarea (`validate_citation`), exact disciplina
  pe care skill-ul o cere mereu. Node/TS → merge pe Windows.
- **Status:** skill făcut **MCP-aware** (vezi `biblioteca-locala.md` → secțiunea „Legislație LIVE prin MCP"
  + `SKILL.md` Principiul de bază). NU e instalat automat (conectare la serviciu extern = decizia userului).
- **Conectare:** `claude mcp add ansvar --transport http https://gateway.ansvar.eu/mcp`
- **Confidențialitate:** gateway-ul primește interogările (OAuth). Pentru noi = doar căutări de legislație
  publică, risc mic; pentru dosare privilegiate → **self-host** (repo open-source, `npm install && npm run build`).

## ♻ DE REPRODUS (idee, blocat tehnic) — RoLegal (`ro-legal-fl`) — senisioi
- **Ce:** model spaCy RO pentru documente juridice — **NER** (PERSON, ORG, LEGAL, MONEY, DATETIME…),
  embeddings floret typo-robuste, morfologie. Are și un **dataset de legislație achiziții cu metadate**.
  Licență **CC4R** (Creative Commons Romania — verifică termenii înainte de redistribuire; uz local OK).
- **De ce ar conta:** NER-ul prinde **nume fără sufix** (persoane/firme) pe care `anon-lib.js` (regex,
  determinist) le poate rata — upgrade real pentru regula dură de anonimizare. Ideal: o trecere NER peste
  corpus, flag pe entități PERSON/ORG nemascate.
- **Status: BLOCAT** — e Python/spaCy, iar **pip e rupt pe mașină** (`Could not find platform independent
  libraries` la `pip` și `py -m pip`, Python 3.11 + 3.14 prezente). De reluat când pip e reparat (venv
  izolat): `pip install ro-legal-fl`, apoi NER peste `jurisprudenta-c{nsc,a}/decizii/`. Până atunci,
  anonimizarea rămâne deterministă (`audit-anon.js`) — 0 identificatori structurați, dar nume bare posibile.

## ♻ ALTERNATIVĂ (redundant cu MCP) — legislatie-just-ro-parser — pyl1b
- **Ce:** parser Python (BeautifulSoup) care structurează documentele de pe legislatie.just.ro în ierarhie
  (cărți/titluri/articole/alineate + **istoric consolidare**), output JSON/YAML/XLSX. Licență **BSD-3**.
- **Concluzie:** acoperit în mare de MCP-ul `ansvar` (legislație structurată + vigoare). Ideea de fetcher
  structurat e bună dacă vrem o variantă Node offline; momentan nu merită (Python + redundant). BSD-3
  permite reutilizarea logicii dacă reproducem în Node.

## ✗ SKIP
- **legal-llm / LawMate** (DianaDorobantu) — Saul-7B fine-tuned pe Constituție/Educație, MIT, early-stage.
  Model local mult mai slab decât Claude, nu pe achiziții. Fără valoare pentru noi.
- **legal-consultation-client** (andrei1489) — UI Angular pentru consultare publică pe proiecte de lege,
  MPL-2.0. Civic-tech, nelegat de redactarea actelor. Irelevant.
