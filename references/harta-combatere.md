# Harta de combatere — acoperire la nivel de CÂRLIG (ca să nu mai ratezi nimic)

> De ce există. Tabelul de acoperire pe CAPETE nu e destul. Adversarul (decizie CNSC, întâmpinare,
> punct de vedere) câștigă pe SUB-argumente: o normă punctuală, un fapt viu, o sub-teză. Cine mapează
> doar temele mari ratează cârligele — un tabel dintr-un normativ, o dată calendaristică, un lanț de
> dependențe rămân necontrazise. Acoperirea se face la nivel de CÂRLIG, nu de temă.

## Pasul 1 — Extrage TOATE cârligele adversarului (trei tipuri)
Citește integral raționamentul advers pe fiecare capăt (`extract.js --chunks` pentru decizii — raționament
continuu, fără paragrafe numerotate; citește toate segmentele). Pentru fiecare capăt, listează:

> **La PLÂNGERE, cârligul = fiecare CONSIDERENT al deciziei CNSC, nu fiecare cerință a ofertei.** Mapezi
> ce a reținut Consiliul pe fiecare punct (citat din decizie) → îi opui viciul de raționament + norma +
> ce trebuia să rețină (cei 4 timpi din `structuri-acte.md`). Ținta e decizia, nu oferta adversă.

1. **Norme invocate** — fiecare articol / normativ / **tabel** / anexă / clarificare pe care adversarul îl
   citează (ex. art. 83, art. 84, **Tabelul 25**, pct. 4.2 C16-84, Răspuns 33). Fiecare e un cârlig autonom:
   dacă nu-l combați, rămâne în picioare ca temei independent.
2. **Fapte concrete invocate** — fiecare dată, cifră, citat, exemplu (ex. programare de Anul Nou, medii
   multianuale, zilele libere). Faptele vii conving completul; un fapt nerebutat e o breșă.
3. **Sub-teze** — fiecare propoziție-argument distinctă (ex. „graficul = angajament ferm", „lanțul de
   interdependențe tehnologice", „strategie, nu eroare").

## Pasul 2 — Mapează fiecare cârlig
Tabel: cârlig → tratare. Fiecare cârlig primește una din trei: **combatut** (cu temei verificat),
**conces-și-distins** (admis, dar limitat ori irelevant pentru rezultat), **irelevant-explicat** (de ce
nu atinge conformitatea/legalitatea). Niciun cârlig fără tratare.

## Pasul 3 — Critica de completitudine (re-citire OSTILĂ, înainte de finalizare)
După redactare, re-citește raționamentul advers integral cu un singur scop: ce cârlig NU apare în act?
Creierul care a redactat sare exact peste ce a sărit prima dată — de aceea ăsta e un pas DISTINCT, ostil
propriului text (ideal, cu „ochi proaspeți": tratează draftul ca al adversarului și caută ce-a scăpat).
Orice cârlig negăsit în act se adaugă sau se marchează explicit „necontestat, fiindcă [...]".

## La REWRITE — nu pierde ce acoperea draftul precedent
Când rescrii/strângi o secțiune, compară cu DOUĂ surse, nu una: raționamentul advers integral
ȘI versiunea anterioară a actului. Rescrierea îmbunătățește o parte și scapă alta — un cârlig
combătut în draftul vechi (un precedent de instanță pe punct, o rebutare a unei consecințe tehnice,
o calificare directă) dispare la rescriere fără să observi. Inventariază cârligele acoperite de
versiunea veche și confirmă că fiecare se regăsește în cea nouă; ce a dispărut, re-adaugă.

## Regulă strategică — motive autonome multiple
Când respingerea/decizia stă pe MAI MULTE motive autonome (fiecare ține rezultatul singur), trebuie
doborâte TOATE. Câștigarea unui capăt e necesară, nu suficientă: dacă un alt motiv de respingere rămâne în
picioare, oferta rămâne respinsă, iar restul criticilor devin „lipsite de interes" (exact mecanismul prin
care un complet evită analiza). Din dispozitiv și din motivare, numără câte motive autonome susțin soluția
și acoperă-le pe toate — altfel actul cel mai bun pe un capăt nu schimbă rezultatul.

## Test de POTRIVIRE A RATIO-ULUI înainte de a cita o speță ca „similară"
O analogie pe TEMĂ, dar nu pe RATIO, e o eroare la fel de gravă ca o citare inexistentă. Înainte de a
invoca o speță ca „similară", verifică: **pe ce a căzut EFECTIV soluția (elementul decisiv) trebuie să
fie ACELAȘI cu teza ta** — nu doar familia de contract sau tema generală.
- Dacă speța s-a soluționat pe **fond** (ex. lipsa erorilor, neîndeplinirea unei condiții de fond) iar
  tu susții un punct **procedural** (ex. că nu avea voie să facă X), NU e analogie — **declară distincția**.
- Citează ratio-ul, nu „familia": ce punct de drept a tranșat decizia, nu doar că e „tot pe FIDIC/preț/
  excludere". Dovadă (M4): „spetele de fapt nu se aseamana — elementul esential aici era eroarea, nu
  procedura. In speta data de tine respingerea a fost pe fond... nu procedural".
(Acest test nu se poate mecaniza în `check-citations.js` — rămâne verificare umană obligatorie.)
