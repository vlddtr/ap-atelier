#!/usr/bin/env node
/*
 * extract.js — unealta ANTI-TRUNCHIERE a skill-ului redactare-acte-achizitii.
 *
 * Scopul: să elimine cauza sistematică a erorilor — citirea trunchiată (cap+coadă,
 * sinteză, dispozitiv, primul alineat). NU produce NICIODATĂ rezumate. Scoate textul
 * INTEGRAL, împărțit în segmente ordonate, ca modelul să fie obligat să-l citească tot.
 *
 * Dependențe (instalează o singură dată într-un folder de lucru):
 *     npm i pdf-parse@1.1.1 mammoth
 *
 * REGULĂ: NU scrie NIMIC pe disc — tot output-ul e în terminal (fără .full.txt / .partNN.txt,
 * fără „ciorbă" în folderul dosarului). PDF-urile se citesc de preferință DIRECT cu unealta
 * Read (pages); extract.js e pentru .docx și pentru modurile computaționale de mai jos.
 *
 * Moduri:
 *   node extract.js <fisier.pdf|docx>
 *       → tipărește textul integral (dacă încape) sau te trimite la --chunk.
 *
 *   node extract.js <fisier> --chunk N
 *       → tipărește DOAR segmentul N (~2500 cuvinte), cu antet „[SEGMENT k/total]".
 *         Citirea integrală = chemi 1, 2, ... total, în ordine. Zero fișiere.
 *
 *   node extract.js <lege.docx> --article N
 *       → tipărește articolul N INTEGRAL (de la „Art. N" până la următorul „Art. M"),
 *         adică TOATE alineatele — nu denumirea marginală, nu doar alin. (1).
 *
 *   node extract.js <act.pdf> --paragraphs
 *       → listează fiecare paragraf numerotat (1., 2., 3. ...) cu prima linie — harta
 *         completă a motivelor adverse, pentru tabelul de acoperire (vezi SKILL.md).
 */
const fs = require('fs');
const path = require('path');
const { fullText, norm } = require('./extract-lib');

(async () => {
  const [, , file, mode, arg] = process.argv;
  if (!file) { console.error('Lipsește calea fișierului.'); process.exit(1); }

  // --scan <folder>: MANIFEST al dosarului — fiecare document de citit INTEGRAL, nimic sărit.
  if (file === '--scan') {
    const dir = mode;
    if (!dir) { console.error('Folosire: node extract.js --scan <folder>'); process.exit(1); }
    const exts = ['.pdf', '.docx', '.txt', '.md'];
    const found = [];
    (function walk(d) {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (exts.includes(path.extname(e.name).toLowerCase())) {
          const kb = Math.round(fs.statSync(p).size / 1024);
          found.push({ p, kb, lung: kb > 60 });
        }
      }
    })(dir);
    console.log('MANIFEST DOSAR — ' + found.length + ' documente, FIECARE de citit INTEGRAL:\n');
    found.forEach((f, i) => console.log(
      (i + 1) + '. [' + f.kb + ' KB]' + (f.lung ? ' (LUNG → --chunks, citește toate segmentele)' : '') + ' ' + f.p));
    console.log('\n→ Bifează fiecare document ca CITIT INTEGRAL înainte de redactare. Niciunul sărit, niciun cap+coadă.');
    return;
  }

  // --diff <v1> <v2>: compară două versiuni (ex. documentație inițială vs REV) — ce s-a MODIFICAT.
  if (file === '--diff') {
    const [v1p, v2p] = [mode, arg];
    if (!v1p || !v2p) { console.error('Folosire: node extract.js --diff <versiune_initiala> <versiune_rev>'); process.exit(1); }
    const lines = s => norm(s).split('\n').map(x => x.trim()).filter(Boolean);
    const a = lines((await fullText(v1p)).text), b = lines((await fullText(v2p)).text);
    const setA = new Set(a), setB = new Set(b);
    const removed = a.filter(l => !setB.has(l));   // în v1, nu în v2
    const added = b.filter(l => !setA.has(l));     // în v2, nu în v1
    const clause = l => { const m = l.match(/^(art\.?\s*\d+|pct\.?\s*\d+(?:\.\d+)*|cap\.?\s*\d+|\d+(?:\.\d+)*\.)/i); return m ? m[0].toLowerCase().replace(/\s+/g, '') : null; };
    const remByClause = new Map();
    removed.forEach((l, i) => { const c = clause(l); if (c) { if (!remByClause.has(c)) remByClause.set(c, []); remByClause.get(c).push(i); } });
    const used = new Set(), modified = [], addedOnly = [];
    for (const l of added) {
      const c = clause(l);
      if (c && remByClause.has(c) && remByClause.get(c).length) { const i = remByClause.get(c).shift(); used.add(i); modified.push([removed[i], l]); }
      else addedOnly.push(l);
    }
    const removedOnly = removed.filter((_, i) => !used.has(i));
    const cut = s => s.length > 200 ? s.slice(0, 200) + '…' : s;
    console.log('===== DIFF: ' + path.basename(v1p) + '  →  ' + path.basename(v2p) + ' =====');
    console.log('→ Doar ce e MODIFICAT/ADĂUGAT redeschide termenul de contestare. Clauzele NESCHIMBATE rămân definitive — critica lor e TARDIVĂ (vezi nota tardivitate pe REV).\n');
    console.log('## MODIFICATE (' + modified.length + ') — redeschid termenul:');
    modified.forEach(([o, n]) => console.log('  • [v1] ' + cut(o) + '\n    [v2] ' + cut(n)));
    console.log('\n## ADĂUGATE (' + addedOnly.length + ') — redeschid termenul:');
    addedOnly.forEach(l => console.log('  + ' + cut(l)));
    console.log('\n## ELIMINATE (' + removedOnly.length + '):');
    removedOnly.forEach(l => console.log('  - ' + cut(l)));
    console.log('\n→ Mapează fiecare MOTIV pe „modificat/adăugat" (în termen) vs „neschimbat" (TARDIV). Grupează motivele tardive separat și semnalează riscul. Atenție: diff e pe linii — reformatările pot produce zgomot; confirmă vizual clauzele-cheie.');
    return;
  }

  // --map <folder>: scaffold de ANSAMBLU — cross-document, ca să prinzi nuanțele (vezi analiza-ansamblu.md).
  if (file === '--map') {
    const dir = mode;
    if (!dir) { console.error('Folosire: node extract.js --map <folder-dosar>'); process.exit(1); }
    const { walkDocs } = require('./extract-lib');
    const uniq = a => [...new Set(a)];
    const data = [];
    for (const f of walkDocs(dir)) {
      let txt = '';
      try { txt = norm((await fullText(f)).text); } catch (e) { continue; }
      if (!txt) continue;
      data.push({
        name: path.basename(f),
        numbers: uniq([...txt.matchAll(/\d[\d.,]*\s?(?:%|(?:lei|ron|euro|eur|luni|zile|ani|puncte|mil(?:ioane)?)\b)/gi)].map(m => m[0].replace(/\s+/g, ' '))).slice(0, 50),
        dates: uniq([...txt.matchAll(/\b\d{1,2}[.\/]\d{1,2}[.\/]\d{4}\b/g)].map(m => m[0])).slice(0, 40),
        terms: uniq([
          ...[...txt.matchAll(/denumit[ăaeiîtá]*\s+(?:în continuare\s+)?[„"]([^„""]{2,55})["”]/gi)].map(m => m[1]),
          ...[...txt.matchAll(/(?:prin\s+)?[„"]([^„""]{2,55})["”]\s*(?:\)\s*)?(?:înseamnă|reprezintă|se înțelege|are înțelesul)/gi)].map(m => m[1]),
        ].map(s => s.trim())).slice(0, 40),
        refs: uniq([...txt.matchAll(/\b(?:art\.|pct\.|anexa|anexă|clauza|cap\.)\s*\d+(?:[.\d]*)?/gi)].map(m => m[0].toLowerCase().replace(/\s+/g, ' '))).slice(0, 50),
      });
    }
    if (!data.length) { console.error('Niciun document lizibil în ' + dir); process.exit(2); }
    console.log('===== HARTA DE ANSAMBLU — ' + data.length + ' documente (vezi analiza-ansamblu.md) =====\n');
    for (const d of data) {
      console.log('## ' + d.name);
      console.log('  NUMERE (reconciliază între documente): ' + (d.numbers.join(' · ') || '—'));
      console.log('  DATE/TERMENE: ' + (d.dates.join(' · ') || '—'));
      console.log('  TERMENI DEFINIȚI: ' + (d.terms.join(' · ') || '—'));
      console.log('  TRIMITERI INTERNE: ' + (d.refs.join(' · ') || '—'));
      console.log('');
    }
    console.log('→ SINTEZĂ (analiza-ansamblu.md): (1) reconciliază NUMERELE între documente — valoarea estimată ↔ garanții (part. ≤1%, b.exec. ≤10%) ↔ praguri experiență ↔ durate; o nepotrivire = nuanță-cheie. (2) verifică TERMENII DEFINIȚI folosiți consecvent. (3) urmărește TRIMITERILE pentru dependențe/ierarhie. (4) caută contradicții fișă↔caiet↔contract↔anunț↔clarificări. Scaffold-ul îți pune candidații în față — nuanța rămâne a ta.');
    return;
  }

  const { text, pages } = await fullText(file);
  const t = norm(text);

  if (mode === '--article') {
    const n = arg;
    // de la "Art. n" (cu posibil ^/¹ după) până la următorul "Art. <numar>" diferit
    const re = new RegExp('Art(?:icolul)?\\.?\\s*' + n + '\\b[\\s\\S]*?(?=Art(?:icolul)?\\.?\\s*\\d+\\b(?!\\s*' + n + '\\b)|$)');
    const m = t.match(re);
    if (!m) { console.error('Art. ' + n + ' negăsit.'); process.exit(2); }
    console.log('===== Art. ' + n + ' — INTEGRAL (toate alineatele) =====\n' + m[0].trim());
    return;
  }

  if (mode === '--paragraphs') {
    const lines = t.split('\n');
    const paras = [];
    for (const l of lines) {
      const m = l.match(/^\s*(\d{1,3})\.\s+(.{0,80})/);
      if (m) paras.push(m[1] + '. ' + m[2].trim());
    }
    console.log('Paragrafe numerotate găsite: ' + paras.length + '\n');
    console.log(paras.join('\n'));
    console.log('\n→ Folosește această listă ca TABEL DE ACOPERIRE: fiecare paragraf de motiv trebuie să aibă un răspuns în act.');
    return;
  }

  // --chunk N: tipărește DOAR segmentul N în terminal. NIMIC nu se scrie pe disc — fără .partNN.txt,
  // fără .full.txt, fără „ciorbă" în folderul dosarului. Citirea integrală = chemi 1, 2, ... total.
  const PER = 2500; // cuvinte/segment (~15-18k caractere, sub limita de output a terminalului)
  const words = t.split(/\s+/);
  const total = Math.ceil(words.length / PER);
  if (mode === '--chunk' || mode === '--chunks') {
    const n = parseInt(arg, 10);
    if (!n || n < 1 || n > total) {
      console.error('Folosire: --chunk N  (N = 1..' + total + '; documentul are ' + total + ' segmente). Nimic nu se scrie pe disc.');
      process.exit(1);
    }
    console.log('[SEGMENT ' + n + '/' + total + ' — citește TOATE segmentele, în ordine]\n');
    console.log(words.slice((n - 1) * PER, n * PER).join(' '));
    console.log(n < total ? '\n[URMEAZĂ: --chunk ' + (n + 1) + ' din ' + total + ']' : '\n[ULTIMUL segment — document parcurs integral]');
    return;
  }

  // default: textul integral ÎN TERMINAL dacă încape; altfel te trimite la --chunk. Zero fișiere.
  if (t.length <= 20000) {
    console.log(t);
    console.log('\n[Pagini: ' + (pages ?? 'n/a') + ' | ' + t.length + ' caractere — redat integral mai sus]');
  } else {
    console.log('Document lung: ' + t.length + ' caractere, ~' + words.length + ' cuvinte, ' + (pages ?? 'n/a') + ' pagini.');
    console.log('Citește-l INTEGRAL în ' + total + ' segmente: node extract.js "<fisier>" --chunk 1  (apoi 2, 3... până la ' + total + ').');
    console.log('Notă: PDF-urile pot fi citite și DIRECT cu unealta Read (parametrul pages), fără extract — preferă asta.');
  }
})();
