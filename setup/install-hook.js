#!/usr/bin/env node
// install-hook.js — înregistrează hook-achizitii.js în ~/.claude/settings.json AL MAȘINII CURENTE.
//
// DE CE EXISTĂ: hook-achizitii.js (scriptul) se sincronizează cu skill-ul prin git/OneDrive pe orice
// mașină — dar ~/.claude/settings.json NU face parte din repo (e local per mașină/utilizator), deci
// înregistrarea hook-ului trebuie repetată manual pe fiecare dispozitiv nou. Omiterea acestui pas =
// skill-ul nu se mai invocă determinist pe acel dispozitiv, chiar dacă fișierele skill-ului sunt la zi
// (confirmat 09.07.2026: comportament corect pe o mașină, degradat pe alta din exact acest motiv).
//
// Idempotent: sigur de rulat de mai multe ori — nu duplică intrarea dacă hook-ul e deja înregistrat.
// Face backup la settings.json înainte de orice scriere.
//
//   node setup/install-hook.js
const fs = require('fs');
const path = require('path');
const os = require('os');

const settingsPath = path.join(os.homedir(), '.claude', 'settings.json');
const hookPath = path.join(__dirname, 'hook-achizitii.js');

if (!fs.existsSync(hookPath)) {
  console.error(`EROARE: nu găsesc ${hookPath} — rulează scriptul din interiorul repo-ului skill-ului.`);
  process.exit(1);
}
if (!fs.existsSync(path.dirname(settingsPath))) {
  console.error(`EROARE: nu găsesc ${path.dirname(settingsPath)} — Claude Code pare neinstalat pe această mașină.`);
  process.exit(1);
}

let settings = {};
if (fs.existsSync(settingsPath)) {
  try {
    settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  } catch (e) {
    console.error(`EROARE: ${settingsPath} conține JSON invalid — repară-l manual înainte de a rula acest script.`);
    process.exit(1);
  }
} else {
  console.log(`(${settingsPath} nu există încă — se creează unul nou.)`);
}

settings.hooks = settings.hooks || {};
settings.hooks.UserPromptSubmit = settings.hooks.UserPromptSubmit || [];

// verifică dacă hook-ul e deja înregistrat (după calea către hook-achizitii.js, indiferent de nodul folosit)
const already = settings.hooks.UserPromptSubmit.some(entry =>
  (entry.hooks || []).some(h => typeof h.command === 'string' && h.command.includes('hook-achizitii.js'))
);

if (already) {
  console.log('Deja înregistrat — nimic de făcut. (Idempotent: sigur de rulat oricând.)');
  process.exit(0);
}

// backup înainte de orice scriere
if (fs.existsSync(settingsPath)) {
  const backupPath = settingsPath + `.bak-${Date.now()}`;
  fs.copyFileSync(settingsPath, backupPath);
  console.log(`Backup creat: ${backupPath}`);
}

// process.execPath = executabilul Node curent — cross-platform, nu presupune calea Windows hardcodată
const nodeExe = process.execPath.replace(/\\/g, '/');
const hookPathPosix = hookPath.replace(/\\/g, '/');

settings.hooks.UserPromptSubmit.push({
  hooks: [
    {
      type: 'command',
      command: `"${nodeExe}" "${hookPathPosix}"`,
      timeout: 10,
    },
  ],
});

fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n', 'utf8');
console.log(`Hook înregistrat în ${settingsPath}.`);
console.log('Verifică: pornește o sesiune nouă Claude Code și scrie un prompt despre achiziții publice —');
console.log('trebuie să apară în context "SUBIECT ACHIZIȚII PUBLICE detectat (hook determinist)".');
