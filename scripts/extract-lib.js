// extract-lib.js — funcții comune de extragere text, partajate de extract.js și check-facts.js.
// Dependențe (o singură dată într-un folder de lucru): npm i pdf-parse@1.1.1 mammoth
const fs = require('fs');
const path = require('path');

async function fullText(file) {
  const ext = path.extname(file).toLowerCase();
  const buf = fs.readFileSync(file);
  if (ext === '.pdf') {
    const pdf = require('pdf-parse');
    const d = await pdf(buf);
    return { text: d.text, pages: d.numpages };
  }
  if (ext === '.docx') {
    const mammoth = require('mammoth');
    const r = await mammoth.extractRawText({ buffer: buf });
    return { text: r.value, pages: null };
  }
  if (ext === '.doc') {
    // .doc binar: încearcă mammoth (uneori merge), altfel semnalează
    try { const mammoth = require('mammoth'); const r = await mammoth.extractRawText({ buffer: buf }); return { text: r.value, pages: null }; }
    catch (e) { return { text: '', pages: null, err: '.doc binar — convertește în .docx/.pdf (Word) înainte' }; }
  }
  if (ext === '.txt' || ext === '.md') return { text: buf.toString('utf8'), pages: null };
  throw new Error('Format neacceptat: ' + ext + ' (pdf/docx/doc/txt/md)');
}

function norm(t) { return t.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim(); }

// normalizare agresivă pentru comparații literale (spații colapsate, ghilimele unificate, lowercase)
function normFlat(t) {
  return t
    .replace(/[„""»«]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/[‐-―]/g, '-')
    .toLowerCase()
    .trim();
}

const DOC_EXTS = ['.pdf', '.docx', '.doc', '.txt', '.md'];
function walkDocs(dir) {
  const out = [];
  (function w(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) w(p);
      else if (DOC_EXTS.includes(path.extname(e.name).toLowerCase())) out.push(p);
    }
  })(dir);
  return out;
}

module.exports = { fullText, norm, normFlat, walkDocs, DOC_EXTS };
