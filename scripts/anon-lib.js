// anon-lib.js — bibliotecă reutilizabilă de anonimizare deterministă pentru corpusul de
// jurisprudență (CNSC, Curți de Apel). Sursele sunt deja parțial anonimizate (firme private →
// ____/####/„Societate comercială"); aceasta adaugă o trecere deterministă peste reziduuri.
// NU se aplică pe corpusul CJUE (jurisprudență publică UE; părțile sunt citate public).
//
// Principiu: maschează IDENTITĂȚILE (părți, persoane, identificatori structurați), NU atinge
// considerentele/articolele/raționamentul. Instanța care pronunță (Curtea de Apel + nr + dată) se
// păstrează — e reper de citare, nu identitate de parte.

function normalizeDiacritics(t) {
  // cedilă legacy (U+015F/U+0163) -> virgulă jos (U+0219/U+021B); ortografie corectă + regex robust
  return t.replace(/ş/g, 'ș').replace(/Ş/g, 'Ș').replace(/ţ/g, 'ț').replace(/Ţ/g, 'Ț');
}

function anonymize(t) {
  t = normalizeDiacritics(t);
  // --- identificatori structurați ---
  t = t
    .replace(/\bRO\d{6,10}\b/g, '[CUI]')                                  // CUI/VAT (nu ECLI:RO:)
    // BUG istoric reparat 12.07.2026: „RO?" cerea litera R obligatoriu → „CUI <cifre>" (fără prefix)
    // NU era mascat; 142 de fișiere au scăpat cu CUI în clar deși numele erau mascate. Acoperă și CIF.
    .replace(/\b(?:C\.?U\.?I\.?|C\.?I\.?F\.?)\s*[:.]?\s*(?:nr\.?\s*)?(?:RO\s?)?\d{6,10}\b/gi, 'CUI [CUI]')
    .replace(/\bJ\d{12,14}\b/g, '[REG COM]')  // nr. Reg. Com. format nou (J + an + secvență)
    .replace(/\bcod(?:ul)?\s+(?:unic\s+de\s+înregistrare|fiscal)\s*[:.]?\s*\d{6,10}\b/gi, 'cod unic de înregistrare [CUI]')
    .replace(/\bJ\s?\d{1,2}\s?\/\s?\d{1,7}\s?\/\s?\d{4}\b/g, '[REG COM]')   // nr. reg. com.
    .replace(/\bRO\d{2}[A-Z]{4}\d{16}\b/g, '[IBAN]')
    .replace(/\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b/gi, '[EMAIL]')
    .replace(/(?<![\d.])(?:\+?40|0)7\d{2}[ .]?\d{3}[ .]?\d{3}(?![\d])/g, '[TELEFON]');
  // --- firme: Nume (1-4 cuvinte cap, optional SC) + SRL/SA (case-insensitive sufix) ---
  const SUF = String.raw`S\.?(?:[Rr]\.?[Ll]|[Aa])\b\.?`;
  t = t.replace(new RegExp(String.raw`(?:S\.?C\.?\s+)?(?:[A-ZȘȚĂÂÎ0-9][\p{L}0-9.&''’\-]*\.?\s+){1,4}${SUF}(?:\s*[-–]\s*[Ss]ucursala[^,.\n;]{0,35})?`, 'gu'), '[OPERATOR ECONOMIC]')
    .replace(new RegExp(String.raw`\[OPERATOR ECONOMIC\][-–]\s*(?:[A-ZȘȚĂÂÎ0-9][\p{L}0-9.&''’\-]*\.?\s*){1,4}${SUF}`, 'gu'), '[OPERATOR ECONOMIC]');
  // firme străine (sufix juridic non-RO)
  t = t.replace(/\b[A-ZȘȚĂÂÎ][\p{L}0-9.&\-]+(?:\s+[A-ZȘȚĂÂÎ][\p{L}0-9.&\-]+){0,3}\s+(?:GmbH|AG|Ltd\.?|LLC|B\.?V\.?|S\.?p\.?A\.?|S\.?L\.?|Kft|N\.?V\.?|Sp\.\s?z\s?o\.?o\.?|Co\.?\s?KG|Inc\.?|OOO|d\.?o\.?o\.?)\b/gu, '[OPERATOR ECONOMIC]');
  // --- companii de stat citate adesea fără sufix (acronim/nume propriu) ---
  t = t.replace(/\b(?:S\.?N\.?G\.?N\.?\s+)?(?:ROMGAZ|Romgaz|ROMSILVA|Romsilva|HIDROELECTRICA|Hidroelectrica|TRANSELECTRICA|Transelectrica|TRANSGAZ|Transgaz|CONPET|Conpet|ELECTRICA|Nuclearelectrica|TAROM|Salrom|CFR\s+(?:Marf[ăa]|Infrastructur[ăa]|C[ăa]l[ăa]tori))\b(?:\s+S\.?A\.?)?/g, '[operator economic public]')
    .replace(/\bRegia\s+Na[țt]ional[ăa]\s+a\s+P[ăa]durilor(?:\s+[A-ZȘȚĂÂÎ][\p{L}]+)?/gu, '[instituție publică]')
    .replace(/\bApele\s+Rom[âa]ne\b/g, '[instituție publică]');
  // --- autorități publice = PĂRȚI (sursa le lasă neredactate). NU se atinge instanța care pronunță. ---
  // Sector N al Municipiului București (title/all-caps)
  t = t.replace(/\bSECTOR(?:UL)?\s+\d+\s+AL\s+MUNICIPIULUI\s+BUCUREȘTI(?:\s*,?\s*PRIN\s+PRIMARUL[^,.\n]{0,70})?/gi, '[autoritate locală]');
  // localități (keyword case-insensitive; nume capitalizat/all-caps după — risc fals-pozitiv mic)
  const LOC = /\b(prim[ăa]ria|comuna|municipiul|mun\.|ora[șs]ul|jude[țt]ul|u\.?a\.?t\.?|consiliul\s+local(?:\s+al)?|consiliul\s+jude[țt]ean(?:\s+al\s+jude[țt]ului)?)\s+(?:de\s+|comunei\s+|municipiului\s+|ora[șs]ului\s+|sectorului?\s+\d+\s+)?([A-ZȘȚĂÂÎ][\p{L}\-]+(?:\s+(?:de\s+|[A-ZȘȚĂÂÎ][\p{L}\-]+)){0,2})/giu;
  t = t.replace(LOC, (m, kw) => kw.replace(/\s+/g, ' ').replace(/\.\.+$/, '.') + ' [localitate]');
  // spitale (keyword case-insensitive; lanț de cuvinte capitalizate/conectori)
  t = t.replace(/\bspital(?:ul|ului)\s+(?:(?:clinic|universitar|jude[țt]ean|municipal|or[ăa][șs]enesc|de|urgen[țt][ăa]|boli|infec[țt]ioase|pneumoftiziologie|militar|suport|covid|sf[âa]nt[\p{L}]*|cl\.?)\s+)*[A-ZȘȚĂÂÎ][\p{L}]+/giu, '[spital]');
  // instituții publice cu nume propriu
  t = t.replace(/\b(Regia\s+Autonom[ăa]|Compania\s+Na[țt]ional[ăa]|Societatea\s+Na[țt]ional[ăa])(?:\s+(?:de\s+|„|"|[A-ZȘȚĂÂÎ][\p{L}\-]+)){1,6}/gu, '[instituție publică]')
    .replace(/\b(Direc[țt]ia\s+(?:General[ăa]\s+)?[A-ZȘȚĂÂÎ][\p{L}]+|Inspectoratul\s+[A-ZȘȚĂÂÎ][\p{L}]+|Administra[țt]ia\s+[A-ZȘȚĂÂÎ][\p{L}]+)(?:\s+(?:de\s+|[A-ZȘȚĂÂÎ\p{L}\-]+))*[A-ZȘȚĂÂÎ][\p{L}]+/gu, '[instituție publică]');
  // persoane cu titlu
  t = t.replace(/\b(domnul|doamna|dl\.?|d-l|dna\.?|d-na|av\.|avocat|administrator(?:ul)?|expert(?:ul)?|ing\.|dr\.)\s+[A-ZȘȚĂÂÎ][a-zșțăâî]+(?:\s+[A-ZȘȚĂÂÎ][a-zșțăâî]+){0,2}/gu, '$1 [persoană]');
  return t;
}

// Detector de scurgeri reziduale (după anonimizare). Returnează {categorie: {count, samples[]}}.
function scan(t) {
  const cats = {
    CUI:      /\bRO\d{6,10}\b|\b(?:C\.?U\.?I\.?|C\.?I\.?F\.?)\s*[:.]?\s*(?:nr\.?\s*)?\d{6,10}\b/gi,
    REGCOM:   /\bJ\d{1,2}\/\d{1,7}\/\d{4}\b|\bJ\d{12,14}\b/g,
    CNP:      /\b[1-8]\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{6}\b/g, // lună+zi valide (reduce fals-pozitive)
    IBAN:     /\bRO\d{2}[A-Z]{4}\d{16}\b/g,
    EMAIL:    /\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b/gi,
    SRL_LEAK: /\b[A-ZȘȚĂÂÎ][a-zșțăâî]{2,}(?:\s+[A-ZȘȚĂÂÎ][\p{L}]+){0,3}\s+S\.?(?:[Rr]\.?[Ll]|[Aa])\b/gu,
    AUTH_LEAK:/\b(?:prim[ăa]ria|comuna|municipiul|ora[șs]ul|jude[țt]ul|spital(?:ul|ului)|regia\s+autonom[ăa]|compania\s+na[țt]ional[ăa])\s+(?:de\s+|comunei\s+|municipiului\s+|ora[șs]ului\s+)?[A-ZȘȚĂÂÎ][\p{L}]{2,}/giu,
    FOREIGN:  /\b[A-ZȘȚĂÂÎ][\p{L}\-]+\s+(?:GmbH|AG|Ltd\.?|LLC|Kft|OOO)\b/gu,
  };
  const out = {};
  for (const [k, re] of Object.entries(cats)) {
    const m = t.match(re) || [];
    if (m.length) out[k] = { count: m.length, samples: [...new Set(m)].slice(0, 5) };
  }
  return out;
}

module.exports = { normalizeDiacritics, anonymize, scan };
