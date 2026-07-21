# Jurisprudență Curți de Apel — corpus inclus în skill

**237 hotărâri** ale Curților de Apel (2021–2026), pe achiziții publice — plângeri/litigii privind
deciziile CNSC și contractele de achiziție (L. 101/2016 și L. 98/2016). Text INTEGRAL, cu
**considerentele instanței** (de ce a modificat sau menținut decizia CNSC / cum a soluționat
litigiul), nu doar dispozitivul. 11 instanțe: București (93), Bacău (39), Târgu Mureș (34),
Constanța (30), Pitești (9), Alba Iulia (9), Ploiești (5), Suceava (4), Timișoara (4), Oradea (3).

**Doar norme în vigoare:** hotărârile sub OUG 34/2006 (legea veche a achizițiilor, abrogată) au fost
**excluse**; corpusul reflectă L. 98/99/100/101/2016. Excluse și documentele nefinalizate (watermark
„Acesta nu este document finalizat") și duplicatele.

## Confidențialitate
Sursa (bază de date juridică) redactează părțile private (firme → `____`/`####` sau rol „Societate
comercială"), dar lasă uneori autorități publice și nume izolate. Peste asta s-a aplicat anonimizare
**deterministă** (find-and-replace, fără rescriere): identificatorii structurați (CUI, J, email,
telefon, IBAN) eliminați; firmele (`X SRL/SA`), autoritățile-parte (Primăria/Comuna/Municipiul/UAT/
Spitalul/Consiliul → `[localitate]`/`[spital]`/`[autoritate locală]`) și persoanele cu titlu mascate.
**Considerentele, articolele și raționamentul au rămas neatinse, cuvânt cu cuvânt.** Instanța care
pronunță (Curtea de Apel + nr. + dată) e păstrată — e reperul de citare, nu o identitate de parte.
Diacriticele au fost normalizate (virgulă jos). Pot rămâne nume reziduale izolate (text public de
instanță, limita anonimizării deterministe) — semnalează dacă găsești.

## Cum o folosești
1. Identifică tema/considerentul căutat.
2. Grep pe conținut în `decizii/` (ex. `grep -ril "timp friguros" decizii/`) sau vezi `index-instante.md`.
3. **Citează prin instanță + nr. decizie + dată**, pe RATIO (considerentul) — utilă mai ales la
   etapa plângerii (Curtea de Apel), pe care corpusul CNSC nu o acoperea.
