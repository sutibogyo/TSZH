# Társas-, Szerepjátékos Hétvége oldala

##Funkcionális követelmények összegyűjtése

Az admin jogosultságú felhasználó tudjon az oldalon új eseményt létrehozni.<br />
Az admin jogosultságú felhasználó tudjon az oldalon meglévő eseményt szerkeszteni.<br />
A felhasználók tudják jelezni a részvételi szándékukat.<br />
Azoldal látógatói(nem belépett felhasználók) meg tudják nézni az aktuális társasjáték és rendezvény listát listát.<br />

##NEM FUNKCIONÁLIS KÖVETELMÉNYEK
Felhasználóbarát, ergonomikus elrendezés és kinézet.<br />
Gyors működés.<br />
Biztonságos működés: jelszavak tárolása, funkciókhoz való hozzáférés.<br />

##Szerepkörök, használati esetek, folyamatok meghatározása
Admin: Van joga rendezvényt létrehozni, módosítani és törölni és a társasjátékok listába is vehet fel esetleg törölhet elemek.<br />
Felhasználó : Van jog jelezni részvételi szándékát a rendezvényre.<br />
Látogató : Megtekintheti a rendezvények és a társasjátékok listájt.<br />

##Oldalfunkciók
Rendezvény létrehozása, törlése, módosítása<br />
Részvételi szándék jelzése<br />
Társasjáték lista lekérdezése.<br />

##Oldalvázlatok készítése
![Sequence diagram](doc/img/Login.jpg)
![Sequence diagram](doc/img/TarsasjatekLista.jpg)
![Sequence diagram](doc/img/RendezvenyLista.jpg)
##Oldaltérkép
GET /: főoldal<br />
GET /login: bejelentkező oldal<br />
POST /login: bejelentkezési adatok felküldése<br />
GET /tarsas/list: társasjátéklista oldal<br />
GET /tarsas/new: új társasjáték felvitele<br />
POST /tarsas/new: új társasjáték felvitele, adatok küldése<br />
GET /rendezveny/list: rendezvénylista oldal<br />
GET /rendezveny/new: új rendezvény felvitele<br />
POST /rendezveny/new: új rendezvény felvitele, adatok küldése<br />
POST /rendezveny/going: részvételi szándék elküldése<br />

##Architektúra terv

##Adatbázis tervezése
![Sequence diagram](doc/img/database.png)

##SZEREPKÖRÖK
Szervező
Belépett felhasználó
Látogató az oldalon

##Használati eset diagram
![Sequence diagram](doc/img/folyamat2.png)
![Sequence diagram](doc/img/modosit.png)

##FOLYAMATOK MEGHATÁROZÁSA
Login 

##Oldaltérkép

##Végpontok

##Oldalvázlat

##Adatmodel-Adatbázisterv

##Állapot diagam
![UseCaseDiagram](doc/img/UseCaseDiagram.png)
##DESIGNTERV

Fejlesztő környezet:Visual Studio Code
