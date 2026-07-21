# Instalare pe un PC nou — checklist complet (3 pași, ~2 minute)

Skill-ul e **auto-conținut în git** (~11 MB): SKILL.md + toate referințele (legislația consolidată,
jurisprudența CNSC/CA/ÎCCJ/CJUE, actele-model anonimizate, blocurile argumentative, toate regulile)
+ toate uneltele (gate, lint, check-citations, check-facts, extract, suggest-jurisprudenta etc.).
După pașii de mai jos, skill-ul funcționează LA ACEEAȘI VALOARE pe orice PC.

## Pasul 1 — clonează în locul unde Claude Code caută skill-urile

```
git clone https://github.com/vlddtr/ap-atelier.git %USERPROFILE%\.claude\skills\redactare-acte-achizitii
```

(Pe mașinile cu OneDrive: alternativ, clonează în OneDrive și leagă cu junction spre
`~/.claude/skills/` — vezi `link-global-claude.ps1` pentru modelul de legare. Oricare variantă e ok;
git rămâne canalul de actualizare: `git pull` aduce tot.)

## Pasul 2 — dependențele scripturilor (o singură dată)

`scripts/node_modules/` NU e în git (.gitignore). Fără el, extract.js/check-facts nu citesc .docx/.pdf:

```
cd scripts && npm install
```

## Pasul 3 — hook-ul de auto-invocare (o singură dată)

`~/.claude/settings.json` e local per mașină — hook-ul trebuie ÎNREGISTRAT pe fiecare PC:

```
node setup/install-hook.js
```

Idempotent (nu duplică, face backup, calea e calculată dinamic). Fără acest pas skill-ul rămâne
accesibil, dar invocarea redevine probabilistică — exact defectul „nu se invocă mai deloc".

Opțional, pentru regula globală din CLAUDE.md (invocarea pe orice subiect de achiziții și în afara
hook-ului): rulează `setup/link-global-claude.ps1` (leagă `~/.claude/CLAUDE.md` de cel din repo).

## Verificare

Sesiune nouă Claude Code + un prompt despre achiziții publice → trebuie să apară în context:

```
SUBIECT ACHIZIȚII PUBLICE detectat (hook determinist) → invocă skill-ul redactare-acte-achizitii...
```

Apoi `node scripts/check-skill.js` → „✓ skill integru".

## Ce NU călătorește prin git (și ce înseamnă asta)

Două resurse-sursă rămân locale (conțin nume reale de clienți — interzise în repo). **Derivatele lor
anonimizate SUNT în git**, deci redactarea nu pierde nimic pe alt PC; doar REGENERAREA/minarea cere
accesul la sursă:
- **Colecția Modele** (`Modele.rar`, OneDrive → Desktop → Data): sursa exemplarelor de stil —
  derivatul `references/acte-model/` (73 exemplare) e în git. Regenerare: `node scripts/build-acte-model.js`.
- **Corpusul mare `baza_cnsc`** (OneDrive → Desktop → Achizitii): ~3.400 acte + decizii CNSC —
  distilatul `references/blocuri-argumentative.md` e în git. Minare nouă: `node scripts/mine-blocuri.js`
  (calea corpusului: env `BAZA_CNSC`).

## ATENȚIE — deriva între suprafețe (copia claude.ai)

Pe lângă instalarea locală (git, de mai sus), poate exista o **copie a skill-ului încărcată pe
claude.ai** (apare ca `anthropic-skills:redactare-acte-achizitii` în lista de skill-uri). Acea copie
NU se actualizează din git — e un upload separat, înghețat la data încărcării. Sesiunile care o
folosesc (ex. tab-ul Code pe web/desktop, dacă rezolvă skill-ul din cloud, nu din `~/.claude/skills`)
pot produce acte după o versiune VECHE a regulilor, chiar dacă git-ul local e la zi.

**Ritual după orice modificare semnificativă a skill-ului:**
1. `git push` (canalul principal);
2. dacă există copia pe claude.ai: re-încarcă/împrospătează skill-ul acolo din versiunea curentă,
   SAU șterge copia cloud ca să rămână o singură sursă de adevăr (git);
3. verificare rapidă pe dispozitivul/suprafața țintă: cere „linia porților" pe un act mic — versiunea
   veche nu cunoaște porțile noi.

## Publicare către colegi — repo-ul PUBLIC (snapshot, fără istoric)

Colegii folosesc: `https://github.com/vlddtr/ap-atelier` (creat 12.07.2026,
un singur commit curat). Repo-ul privat NU se face public NICIODATĂ — istoricul lui conține
versiunile de dinaintea reparațiilor de anonimizare + mesaje de commit cu nume interne.

**Ritual de republicare** (după modificări semnificative, DUPĂ git push pe privat):
1. `git archive HEAD` → folder temporar; șterge `_business/`; corectează URL-ul din setup/README.
2. Scanare de scurgeri pe export (tokeni din setup/tokens-clienti.local.txt + identificatori) — 0 obligatoriu.
3. `git init` + un commit + push cu `--force` către `ap-atelier` (snapshot nou,
   tot un singur commit — publicul nu are nevoie de istoric).
