# Analiza de ANSAMBLU — citește setul ca un întreg, prinde nuanțele

Citirea document-cu-document (SKILL.md, Pasul 1) e necesară dar **NU suficientă**: nuanțele care
câștigă sau pierd o speță apar din **RELAȚIILE dintre documente**, nu din fiecare luat izolat. După
digesturile per-document, fă OBLIGATORIU o **sinteză de ansamblu** și abia apoi concluzionează.

## Cele 8 mișcări ale sintezei

1. **Imaginea de ansamblu (big picture) ÎNTÂI.** O frază: ce urmărește efectiv autoritatea (obiectul
   real + miza), tipul procedurii, postura ta (ofertant/contestator/AC), unde ești în cronologie. Fără
   tablou, analizezi piese fără sens.
2. **Ierarhia documentelor + ordinea de precădere.** Care document guvernează la conflict? De regulă e
   stabilită în fișa de date („în caz de neconcordanță prevalează caietul de sarcini / fișa de date /
   contractul"). Fără ierarhie nu știi care clauză câștigă — și asta decide multe critici.
3. **Contradicții între documente.** Compară explicit fișa de date ↔ caiet de sarcini ↔ model de
   contract ↔ anunț ↔ clarificări. O cerință din fișă care contrazice caietul, un termen din anunț
   diferit de fișă, o garanție în contract diferită de fișă = nuanță exploatabilă (nelegalitate sau
   ambiguitate care, potrivit principiului interpretării în defavoarea autorului documentației, profită
   ofertantului).
4. **Reconciliere numerică (cross-document).** Valoarea estimată, prețurile, **garanția de participare**
   (max 1% — art. 35-36 HG 395), **garanția de bună execuție** (max 10% din preț fără TVA — art. 154
   alin. (3)), pragurile de experiență similară, cifra de afaceri, duratele, termenele — trebuie să se
   potrivească ÎNTRE documente. O garanție calculată pe altă bază decât valoarea estimată, un prag de
   experiență care nu corespunde valorii contractului = capcană concretă, ușor de probat.
5. **Termeni definiți — consecvență.** Listează termenii definiți („denumit în continuare «...»",
   „înseamnă", „reprezintă") și verifică dacă sunt folosiți la fel peste tot. Un termen definit într-un
   fel și folosit altfel ascunde un viciu sau o ambiguitate.
6. **Evoluția (clarificări + revizuiri).** Răspunsurile la clarificări modifică cerințe? O revizuire
   (REV) schimbă documentația? (`extract.js --diff`). O clarificare poate modifica nelegal o cerință
   după termen, poate redeschide/închide termene (tardivitate — vezi `erori-juridice-frecvente.md`), ori
   poate „interpreta" o cerință în sens restrictiv.
7. **Restrictivitate doar în AGREGAT.** O cerință poate fi legală singură, dar **combinată** cu altele
   îngustează nejustificat concurența (experiență similară + cifră de afaceri + personal-cheie + termen
   scurt care, împreună, lasă un singur ofertant posibil). Nuanța se vede DOAR privind ansamblul — și e
   un cap de critică pe art. 2 alin. (2) (proporționalitate) pe care analiza pe bucăți o ratează.
8. **Ce LIPSEȘTE din set.** Un document așteptat care nu e în dosar (model de contract, anexă tehnică,
   formulare, DUAE, clarificări invocate) — semnalează-l. Absența poate fi ea însăși un motiv (lipsa unei
   informații esențiale din documentație) sau doar o lacună de dosar de completat de la client.

## Scaffold mecanic — `extract.js --map <folder>`
Scoate cross-document, ca să prinzi nepotrivirile fără să te bazezi pe memorie:
- **numere-cu-unitate** (lei/%/luni/zile/ani) per document → reconciliere (pasul 4);
- **date/termene** → cronologie + interacțiuni de termene;
- **termeni definiți** → consecvență (pasul 5);
- **trimiteri interne** (art./pct./anexa/clauza) → harta dependențelor (ce clauză trimite unde).
Rulează `--map` ÎNAINTE de sinteză; folosește tabelele lui ca listă de verificat, nu ca înlocuitor al
raționamentului (nuanța e a ta, scaffold-ul doar îți pune candidații în față).

## Livrare
Prezintă **sinteza** (ansamblu + ierarhie + contradicții + nuanțe găsite) ca parte din **raportul scurt**
(vezi SKILL.md „Întâi ANALIZĂ + RAPORT"), ÎNAINTE de a întreba ce livrabil dorește utilizatorul. O
nuanță reală găsită aici (o contradicție, un număr care nu se reconciliază, o restricție în agregat)
valorează mai mult decât zece pagini de redactare pe un motiv slab.

## Exhaustivitatea — enumeră TOT, apoi critică ce-ai sărit (regulă HARD)
Nemulțumirea recurentă: analiza se oprește la primele 2-3 probleme evidente. Antidot structural:
1. **Enumeră complet, pe categorii, ÎNAINTE de a analiza pe fond.** Fă lista TUTUROR elementelor
   analizabile, nu doar a celor care „sar în ochi":
   - fiecare **cerință de calificare** (experiență, cifră de afaceri, personal, dotări, autorizări);
   - fiecare **specificație tehnică** din caietul de sarcini;
   - fiecare **criteriu / factor de evaluare** + algoritmul de punctare;
   - fiecare **clauză** din modelul de contract (garanții, penalități, recepție, reziliere, modificare);
   - fiecare **termen** (depunere, clarificări, contestare, executare) și fiecare **număr** (de reconciliat);
   - fiecare **răspuns la clarificări** și ce modifică.
2. **Examinează fiecare element din listă** — legal / nelegal / risc / ambiguu — cu locator. Nu sări
   niciunul; dacă unul nu ridică probleme, notează „verificat, fără obiecție". O listă cu 18 elemente
   din care ai analizat 4 nu e o analiză exhaustivă.
3. **Critica de completitudine (obligatorie, la final):** recitește ostil și întreabă:
   - **ce element din enumerare NU am examinat?**
   - **ce relație între documente nu am verificat** (contradicție, reconciliere numerică, ierarhie)?
   - **ce nuanță în AGREGAT** (restrictivitate doar din combinație) am ratat?
   - **m-am oprit la soluția comodă** sau am dus analiza până la capăt?
   Ce iese de aici = o nouă rundă de analiză, nu o notă de subsol.
4. **Calibrează** fiecare constatare (VERIFICAT / INFERAT / IPOTEZĂ — vezi `judecata-si-predictie.md`) și
   spune ce a rămas de verificat. Exhaustiv NU înseamnă sigur pe tot — înseamnă că ai acoperit tot și ai
   marcat unde nu ești sigur.

## HARTA PROBATORIE per motiv — triangulare, nu redactare dintr-un singur document (regulă HARD)
Distilat din actele-model (măsurat pe contestația pe rezultat, cererea de intervenție și întâmpinarea
la plângere din `references/acte-model/`): fiecare act real triangulează intensiv TOATE straturile
dosarului — corespondența de clarificări (45-59 de mențiuni/act), propunerea tehnică (38-55, cu
pagina), documentația (fișă+caiet), raportul/PV-ul de evaluare — cu 23-37 de locatoare de pagină pe
act. Defectul sancționat (dovadă, 09.07.2026): o cerere de intervenție redactată „mai mult pe baza
contestației", fără ca modelul „să se gândească să se uite în raportul procedurii — acolo erau
chestiuni relevante".

**Metoda (nu o succesiune fixă de documente, ci un test de epuizare):**
1. **Lanțul canonic al dosarului** (pentru acte privind evaluarea/rezultatul): documentația de
   atribuire (fișă de date + caiet de sarcini + formulare + clarificările din oficiu) → oferta
   (propunerea tehnică, cu paginile) → corespondența de evaluare (solicitările de clarificări +
   răspunsurile, cu nr./dată/oră) → actul de evaluare (raportul procedurii / procesul-verbal, cu
   paginile) → actul la care răspunzi (contestația/decizia) → conexele (aviz ANAP, decizii
   anterioare, alte loturi). Inventarul de la Pasul 1 îți dă lista CONCRETĂ — lanțul de mai sus e
   checklist-ul de verificat contra ei.
2. **Per MOTIV, înainte de redactare:** pentru FIECARE document din lanț, un rând: ce spune acest
   document PE ACEST MOTIV (cu locator pag./secțiune) sau **„verificat — nimic pe acest motiv"**.
   Rândul „nimic" e obligatoriu — el dovedește că documentul a fost verificat, nu sărit.
3. **Testul de oprire (anti-mulțumire):** trecerea se încheie când TOATE documentele au fost
   verificate pe motiv — NICIODATĂ când „ai găsit destul". Materialul cel mai tare vine de regulă
   din actul de evaluare (constatările comisiei, solicitările și răspunsurile consemnate acolo) —
   exact documentul pe care redactarea „din contestație" îl ratează.
4. **Secțiunea redactată împletește tot ce a ieșit relevant din hartă** — dacă un motiv se sprijină
   pe un singur document deși harta a găsit material în mai multe, secțiunea e incompletă.
Harta se prezintă utilizatorului împreună cu tabelul de acoperire, ÎNAINTE de redactare.
