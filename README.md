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
Admin: Van joga rendezvényt létrehozni, módosítani és törölni és a társasjátékok listába is vehet fel elemeket.<br />
Felhasználó : Van joga jelezni részvételi szándékát a rendezvényre.<br />
Látogató : Megtekintheti a rendezvények és a társasjátékok listáját.<br />

##Oldalfunkciók
Rendezvény létrehozása, törlése, módosítása<br />
Részvételi szándék jelzése<br />
Társasjáték lista lekérdezése.<br />

##Oldalvázlatok készítése
![Sequence diagram](doc/img/Login.jpg)
![Sequence diagram](doc/img/TarsasjatekLista.jpg)
![Sequence diagram](doc/img/RendezvenyLista.jpg)

##Oldaltérkép
![Sequence diagram](doc/img/map.png)

##Adatbázis tervezése
![Sequence diagram](doc/img/database.png)

##SZEREPKÖRÖK
Admin<br />
Felhasználó<br />
Látogató<br />

##Használati eset diagram
![Sequence diagram](doc/img/folyamat2.png)
![Sequence diagram](doc/img/modosit.png)


##Végpontok
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

##Állapot diagam
![UseCaseDiagram](doc/img/UseCaseDiagram.png)


Fejlesztő környezet:Visual Studio Code
