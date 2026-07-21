// build-core.js — produce pachetul VANDABIL al skill-ului (modelul B): unelte + metodologie +
// ghidare + curația proprie, FĂRĂ corpusul intern (CNSC/CA) și FĂRĂ exportul Sintact de legislație.
// Vezi _business/COMMERCIAL.md pentru clasificare. Public (CJUE/ÎCCJ) doar cu --with-public.
//   node scripts/build-core.js [--with-public]
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'core');
const withPublic = process.argv.includes('--with-public');

// foldere de corpus EXCLUSE din core (intern / proveniență sensibilă)
const EXCLUDE_DIRS = new Set(['jurisprudenta-cnsc', 'jurisprudenta-ca', 'legislatie']);
// foldere terț-public, incluse doar cu --with-public
const PUBLIC_DIRS = new Set(['jurisprudenta-cjue', 'jurisprudenta-iccj']);
// fișiere de ghidare care REFERĂ corpusul (rămân, dar notează limitarea)
const ALWAYS_TOP = ['SKILL.md'];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
let copied = 0;
function copyFile(rel) {
  const src = path.join(ROOT, rel), dst = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst); copied++;
}
function copyDir(rel, filter) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return;
  for (const f of fs.readdirSync(abs)) {
    const r = path.join(rel, f).replace(/\\/g, '/');
    const st = fs.statSync(path.join(ROOT, r));
    if (st.isDirectory()) copyDir(r, filter);
    else if (!filter || filter(r)) copyFile(r);
  }
}

// 1) SKILL.md
for (const f of ALWAYS_TOP) if (fs.existsSync(path.join(ROOT, f))) copyFile(f);
// 2) scripts: doar sursă (.js + README), nu node_modules
copyDir('scripts', r => (/\.js$/.test(r) || /README\.md$/i.test(r)) && !r.includes('node_modules') && !/^scripts\/_/.test(r));
// 3) references: doar .md de ghidare la rădăcină (exclude folderele de corpus)
copyDir('references', r => {
  const parts = r.split('/');
  if (parts.length === 2 && r.endsWith('.md')) return true;            // references/*.md (ghidare)
  if (parts[1] && (EXCLUDE_DIRS.has(parts[1]) || PUBLIC_DIRS.has(parts[1]))) return false;
  return false;
});
// 4) public opțional
if (withPublic) for (const d of PUBLIC_DIRS) copyDir(path.join('references', d).replace(/\\/g,'/'));

// 5) README pt pachet + manifest
const readme = `# redactare-acte-achizitii — CORE (pachet vandabil)\n\n` +
`Generat cu \`build-core.js\`. Conține: SKILL.md + unelte (scripts/) + ghidare/metodologie (references/*.md)` +
`${withPublic ? ' + jurisprudență publică (CJUE/ÎCCJ)' : ''}.\n\n` +
`**NU conține** corpusul intern (CNSC/CA) și nici exportul Sintact de legislație — vezi _business/COMMERCIAL.md.\n` +
`Pe mașina clientului, legislația se obține din legislatie.just.ro / MCP-ul \`ansvar\`; corpusul de\n` +
`jurisprudență internă nu se redistribuie.\n\n` +
`Instalare unelte: \`cd scripts && npm i pdf-parse mammoth\`.\n`;
fs.writeFileSync(path.join(DIST, 'README.md'), readme, 'utf8');

console.log(`Pachet CORE generat: ${DIST}`);
console.log(`Fișiere: ${copied} | public inclus: ${withPublic ? 'da' : 'nu'}`);
const kb = (() => { let s = 0; (function w(d){ for (const f of fs.readdirSync(d)){ const p=path.join(d,f); const st=fs.statSync(p); st.isDirectory()?w(p):s+=st.size; } })(DIST); return Math.round(s/1024); })();
console.log(`Dimensiune: ${kb} KB`);
