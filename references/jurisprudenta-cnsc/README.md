# Jurisprudență CNSC — corpus inclus în skill

**159 decizii CNSC**, text INTEGRAL (raționament + considerente complete), din Buletinul
Oficial CNSC. Buletinele sunt anonimizate de CNSC la publicare (numele părților = "..."); incluse
ca atare, public record.

## Structură
- `decizii/BOxxxx.txt` — textul integral al fiecărei decizii (motivarea, nu doar soluția).
- `catalog-anon.json` — metadate per decizie (file/BO-id, an, soluție, lege, procedură, CPV, obiect, teme).
- `index-teme.md` — navigare pe teme: temă → listă de BO-id cu soluția.

## Cum o folosești
1. Identifică tema (preț neobișnuit, tardivitate, terț, restrictive, conflict, garanții, anulare...).
2. `index-teme.md` sau Grep în `catalog-anon.json` pe `themes` → lista de BO-id.
3. **Citește motivarea integrală** în `decizii/<BO>.txt` (Grep pe BO-id sau pe cuvinte-cheie din temă).
4. Citează prin BO-id, pe RATIO (considerentul), nu doar pe soluție.

Grep pe conținut funcționează direct: `grep -ril "preț neobișnuit de scăzut" decizii/`.
