#!/usr/bin/env node
// Hook UserPromptSubmit — detectează subiect de ACHIZIȚII PUBLICE în promptul utilizatorului și
// injectează, MECANIC, obligația de a invoca skill-ul redactare-acte-achizitii INTEGRAL (nu meniu).
// Motiv: invocarea lăsată pe seama modelului e probabilistică („nu se invocă mai deloc" / „invocat
// parțial, după cum a vrut"). Hook-ul face declanșarea deterministă.
// Instalare: referit din ~/.claude/settings.json → hooks.UserPromptSubmit (vezi setup/README).
let raw = '';
process.stdin.on('data', d => { raw += d; });
process.stdin.on('end', () => {
  let prompt = '';
  try { prompt = String(JSON.parse(raw).prompt || ''); } catch (e) { /* fără input valid -> tăcut */ }
  // normalizează diacriticele ca să prindă și scrierea fără ele
  const p = prompt.toLowerCase()
    .replace(/[șş]/g, 's').replace(/[țţ]/g, 't').replace(/[ăâ]/g, 'a').replace(/î/g, 'i');
  const RE = /(achizitii|achizitie|\bcnsc\b|\bseap\b|\bsicap\b|\banap\b|licitati|contestati|contestator|autoritat\w* contractant|entitat\w* contractant|documentati\w* de atribuire|caiet\w* de sarcini|fisa de date|\bduae\b|acord[- ]cadru|atribuir|procedur\w* de atribuire|9[89]\/2016|10[01]\/2016|hg\s*39[45]|garanti\w* de (participare|buna executie)|pret neobisnuit|oferta (castigatoare|inacceptabila|neconforma)|raport\w* procedurii|plangere\w*.{0,20}(curtea de apel|decizi))/;
  if (RE.test(p)) {
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: 'SUBIECT ACHIZIȚII PUBLICE detectat (hook determinist) → invocă skill-ul redactare-acte-achizitii și aplică-l INTEGRAL — NU e meniu. OBLIGATORIU: (1) PRIMA LINIE a răspunsului = LINIA DE INVOCARE („Skill: redactare-acte-achizitii <prima linie din VERSION> | Mod: LITIGII/CONSULTANȚĂ") — fără ea, skill-ul se consideră neaplicat; versiunea din fișierul VERSION, NU din git; (2) MODUL: LITIGII = act pe dosar, flux complet; CONSULTANȚĂ = opinie/e-mail/analiză, disciplină de fond fără fluxul de 5 pași; (3) la REDACTARE: stil-corectii-chatgpt.md citit înainte + 1-2 exemplare din references/acte-model de același tip; (4) citire integrală FĂRĂ fișiere de lucru în folderul dosarului; (5) DOAR la livrarea unui ACT REDACTAT: linia porților (scripts/gate.js) + chitanța pe componente (✓/N/A cu motiv) — nu la răspunsuri scurte. Pași imposibili = N/A explicit, nu săritură tăcută.'
      }
    }));
  }
  process.exit(0);
});
