// Construiește indexul tematic unificat (CNSC + CA + CJUE) prin minare deterministă pe keyword-uri.
// CJUE hardcodat din INDEX-ul curat (cauze-reper verificate). Output: references/jurisprudenta-index-teme.md
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'references');
const CNSC = path.join(R, 'jurisprudenta-cnsc', 'decizii');
const CA = path.join(R, 'jurisprudenta-ca', 'decizii');
const OUT = path.join(R, 'jurisprudenta-index-teme.md');

// instanță + nr + dată pt fișierele CA (pt afișare citabilă)
const ECLIM = { CABAC:'Bacău', CABUC:'București', CACTA:'Constanța', CATGM:'Târgu Mureș', CAPIT:'Pitești', CAALB:'Alba Iulia', CAPLO:'Ploiești', CASUC:'Suceava', CATIM:'Timișoara', CAORA:'Oradea', CACLJ:'Cluj', CACRA:'Craiova', CAGAL:'Galați', CAIAS:'Iași', CABRA:'Brașov' };
const norm = s => s.replace(/ş/g,'ș').replace(/Ş/g,'Ș').replace(/ţ/g,'ț').replace(/Ţ/g,'Ț');
function caCite(f, t){
  const h = norm(t.slice(0,600));
  const e = (h.match(/ECLI:RO:(CA[A-Z]{3})/)||[])[1];
  const city = e && ECLIM[e] ? ECLIM[e] : '?';
  const date = (f.match(/(\d{2}\.\d{2}\.\d{4})/)||[])[1] || '';
  const nr = (h.match(/nr\.?\s*(RJ\s*[A-Za-z0-9]+|\d{1,5})\s*\//i)||[,''])[1].replace(/\s+/g,'');
  return `CA ${city}${nr?` nr.${nr}`:''}${date?`/${date}`:''}`;
}

const THEMES = [
  { t:'Preț neobișnuit de scăzut', art:'art. 210 L98 / art. 136 HG395', kw:/pre[țt][^.\n]{0,25}(neobi[șs]nuit|anormal)|anormal de sc[ăa]zut|art\.?\s*210\b/i,
    cjue:['SAG ELV C-599/10','Lombardini C-285/99 și C-286/99','Tax-Fin-Lex C-367/19','Computer Resources T-422/11'] },
  { t:'Clarificări vs. modificarea ofertei', art:'art. 209 L98 / art. 134-135 HG', kw:/clarific[ăa]ri[^.\n]{0,40}(ofert|document)|modific[^.\n]{0,15}ofert|viciu de form|art\.?\s*209\b/i,
    cjue:['Tideland T-211/02','Manova C-336/12','Esaprojekt C-387/14','Pippo Pizzo C-27/15','Archus C-131/16','MA.T.I. SUD C-523/16'] },
  { t:'Motive de excludere + self-cleaning', art:'art. 164-171 L98', kw:/motiv[^.\n]{0,12}excludere|abatere profesional[ăa]|self[ -]?clean|m[ăa]suri de remediere|art\.?\s*1(6[4-9]|7[01])\b/i,
    cjue:['Forposta C-465/11','Vossloh Laeis C-124/17','Meca C-41/18','Tim C-395/18','RTS infra C-387/19','Connexxion C-171/15','Infraestruturas C-66/22'] },
  { t:'Terț susținător', art:'art. 182-186 L98', kw:/ter[țt][^.\n]{0,8}sus[țt]in[ăa]tor|capacit[ăa][țt]i[^.\n]{0,20}alt[ei] entit|art\.?\s*18[2-6]\b/i,
    cjue:['Holst Italia C-176/98','Swm Costruzioni C-94/12','Ostas celtnieks C-234/14','Casertana C-223/16','Wrocław C-406/14'] },
  { t:'Subcontractare', art:'art. 218-220 L98', kw:/subcontract|subantreprenor|art\.?\s*2(1[89]|20)\b/i,
    cjue:['Siemens/ARGE C-314/01','Wrocław C-406/14'] },
  { t:'Criterii de atribuire (factori de evaluare)', art:'art. 187 L98', kw:/factor[i]?\s+de\s+evaluare|criteri[ulei]{0,3}\s+de\s+atribuire|cel mai bun raport calitate|art\.?\s*187\b/i,
    cjue:['Lianakis C-532/06','Concordia Bus C-513/99','EVN/Wienstrom C-448/01','TNS Dimarso C-6/15','Ambisig C-601/13'] },
  { t:'Specificații tehnice / cerințe restrictive', art:'art. 155-156 L98', kw:/specifica[țt]ii tehnice|cerin[țt][ăa][^.\n]{0,15}restrictiv|sau echivalent|restr[âa]nge[^.\n]{0,15}concuren|art\.?\s*15[56]\b/i,
    cjue:['UNIX C-359/93','Max Havelaar C-368/10','Contse C-234/03'] },
  { t:'Experiență similară / capacitate tehnică', art:'art. 179 L98', kw:/experien[țt][ăa] similar|capacitate tehnic[ăa]|art\.?\s*179\b/i,
    cjue:['Esaprojekt C-387/14'] },
  { t:'Conflict de interese', art:'art. 59-62 L98', kw:/conflict de interese|art\.?\s*(59|6[012])\b/i,
    cjue:['eVigilo C-538/13','Fabricom C-21/03 și C-34/03','Assitur C-538/07'] },
  { t:'DUAE', art:'art. 193-195 L98', kw:/\bDUAE\b|document unic de achizi/i,
    cjue:['(regim Dir. 2014/24, art. 59)'] },
  { t:'Modificarea contractului / act adițional', art:'art. 221 L98', kw:/modificarea contractului|act adi[țt]ional|modificare substan[țt]ial|art\.?\s*221\b/i,
    cjue:['pressetext C-454/06','Finn Frogne C-549/14','Wall AG C-91/08'] },
  { t:'Acord-cadru', art:'art. 117-118 L98', kw:/acord[ -]cadru|cantitate[a]?\s+maxim|art\.?\s*11[78]\b/i,
    cjue:['Coopservice C-216/17'] },
  { t:'Tardivitate / termene de contestare', art:'L101 art. 8', kw:/tardiv|termen[^.\n]{0,18}contesta|dec[ăa]dere|art\.?\s*8[^0-9][^.\n]{0,30}101/i,
    cjue:['Uniplex C-406/08','Universale-Bau C-470/99','Grossmann C-230/02'] },
  { t:'Standstill / efectele contractului', art:'L101 art. 59', kw:/standstill|termen suspensiv|absen[țt]a efectelor|lipsa efectelor contractului/i,
    cjue:['Alcatel C-81/98','Fastweb C-19/13','PFE C-689/13'] },
  { t:'Anularea procedurii', art:'art. 212-213 L98', kw:/anular[ea][^.\n]{0,12}procedur|art\.?\s*21[23]\b/i,
    cjue:['(—)'] },
  { t:'Confidențialitate / acces la dosar', art:'L101 + art. 57 L98', kw:/confiden[țt]ialitate|acces[^.\n]{0,12}dosar|secret comercial|secret de afaceri/i,
    cjue:['Klaipėdos C-927/19'] },
  { t:'In-house (Teckal)', art:'art. 31 L98', kw:/in[ -]house|control[^.\n]{0,12}similar|Teckal|art\.?\s*31\b/i,
    cjue:['Teckal C-107/98','Stadt Halle C-26/03','Econord C-182/11','Parking Brixen C-458/03'] },
  { t:'Principii (egalitate, transparență, proporționalitate)', art:'art. 2 L98', kw:/tratament egal|nediscriminar|transparen[țt][ăa]|propor[țt]ionalit/i,
    cjue:['Succhi di Frutta C-496/99 P','Pippo Pizzo C-27/15'] },
  { t:'Autoritate contractantă / organism de drept public', art:'art. 3-4 L98', kw:/organism de drept public|no[țt]iunea de autoritate contractant/i,
    cjue:['Mannesmann C-44/96','BFI Holding C-360/96'] },
];

function load(dir){ const m={}; for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.txt'))) m[f]=fs.readFileSync(path.join(dir,f),'utf8'); return m; }
const cnsc = load(CNSC), ca = load(CA);

let out = `# Index tematic unificat — CNSC · Curți de Apel · CJUE\n\n`;
out += `> Navigare pe temă peste cele trei niveluri de autoritate: **CNSC** (administrativ, 159) · **CA** (instanță națională, 237) · **CJUE** (UE — primează, 59). Pentru fiecare temă: articolul intern, cauzele-reper CJUE (numite), și câte decizii interne există + cum le găsești. Citează pe RATIO; verifică articolul determinant în \`references/legislatie/\`.\n\n`;
out += `> **Ierarhia argumentului:** normă internă → directiva-sursă → **ratio CJUE (punct verbatim)** → practica CNSC/CA → aplicare la speță. CJUE bate o practică internă contrară.\n\n`;
out += `> Minat determinist pe keyword-uri (recall, nu precizie — confirmă citind motivarea). CJUE = listă curată din \`jurisprudenta-cjue/index-teme.md\`.\n\n---\n\n`;

for (const th of THEMES){
  const cnscHits = Object.keys(cnsc).filter(f=>th.kw.test(cnsc[f])).map(f=>f.replace('.txt',''));
  const caHits = Object.keys(ca).filter(f=>th.kw.test(ca[f]));
  out += `## ${th.t}\n`;
  out += `**Normă internă:** ${th.art}\n\n`;
  out += `**CJUE (reper, primează):** ${th.cjue.join(' · ')}\n\n`;
  out += `**CNSC (${cnscHits.length}):** ${cnscHits.slice(0,8).join(', ')}${cnscHits.length>8?` … (+${cnscHits.length-8})`:''}\n\n`;
  const caCites = caHits.slice(0,6).map(f=>caCite(f,ca[f]));
  out += `**Curți de Apel (${caHits.length}):** ${caCites.join(' · ')}${caHits.length>6?` … (+${caHits.length-6})`:''}\n\n`;
  out += `**Grep:** \`grep -riloP "${th.kw.source.replace(/"/g,'\\"')}" references/jurisprudenta-c{nsc,a}/decizii/\`\n\n---\n\n`;
}
// PĂSTREAZĂ secțiunile manuale de sub marcatorul de protocol — regenerarea a șters o dată
// secțiunea „Când corpusul NU are nimic pe punct (protocol)" adăugată manual (prins 09.07.2026).
// Tot ce urmează după prima apariție a marcatorului în fișierul existent se re-atașează la final.
const MANUAL_MARKER = '## Când corpusul NU are nimic pe punct';
if (fs.existsSync(OUT)) {
  const prev = fs.readFileSync(OUT, 'utf8');
  const at = prev.indexOf(MANUAL_MARKER);
  if (at !== -1) out += prev.slice(at);
}
fs.writeFileSync(OUT, out, 'utf8');
console.log('Index tematic scris:', OUT);
console.log('Teme:', THEMES.length);
THEMES.forEach(th=>{ const c=Object.keys(cnsc).filter(f=>th.kw.test(cnsc[f])).length; const a=Object.keys(ca).filter(f=>th.kw.test(ca[f])).length; console.log(`  ${String(c).padStart(3)} CNSC ${String(a).padStart(3)} CA  ${th.t}`); });
