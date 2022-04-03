# Express + MySQL REST API

Yksinkertainen demonstraatio REST-rajapinnan, sekä yksinkertaisen HTML + CSS + Vanilla JavaScript käyttöliittymän luomisesta Node + Express + MySQL -teknologiapinolla.



## Asennus

Lataa koodirepositoryn sisältö haluamaasi hakemistoon (saatavilla ZIP-pakettina https://github.com/jani-heinikoski/express-mysql-crud/archive/refs/heads/main.zip).

Asenna Node.js laitteellesi
(testattu versiolla v17.6.0, saatavilla https://nodejs.org/dist/v17.6.0/)

Avaa komentotulkki, ja syötä seuraavat komennot

```cmd
  cd <korvaa-projektin-polulla>
  npm install
```

Tarvitset oikeudet MySQL palvelimeen (testattu versiolla MAJOR: 8.0, VER: 8.0.28-1debian10).
Luo palvelimelle uusi tietokanta KISAT_DB (ei tarvitse lisätä mitään tauluja).

Luo uusi tiedosto **.env** projektin hakemistoon.
Avaa se haluamallasi tekstieditorilla, ja kopioi tiedoston
**.env-example** sisältö siihen. Korvaa esimerkkitiedoston arvot
sinun MySQL tietokantapalvelimesi asetuksilla.

Avaa komentotulkki, ja käynnistä Express-palvelin seuraavilla komennoilla

```cmd
  cd <korvaa-projektin-polulla>
  npm start
```

Mikäli käynnistys onnistui, niin sinun tulisi saada seuraava tuloste komentotulkkiin

```cmd
~\express-mysql-crud>npm start

> express-mysql-crud@1.0.0 start
> node palvelin.js

Yhdistettiin tietokantaan onnistuneesti!
```

## Rajapinnan HTTP päätepisteet

#### Hae kaikki pelaajat

```http
  GET /api/pelaaja
```

#### Luo uusi pelaaja

```http
  POST /api/pelaaja
```

| Body | Tyyppi     | Kuvaus                       |
| :-------- | :------- | :-------------------------------- |
| `pelaaja`      | `JSON-objekti` | **Pakollinen**. Uusi pelaaja, ks. muoto alla. |

```json
"pelaaja": {
    "PELAAJA_NIMI": "nimi",
    "PELAAJA_SEURA": "seura",
}
```

#### Poista kaikki pelaajat

```http
  DELETE /api/pelaaja
```



## Tekijät

- [@jani-heinikoski](https://www.github.com/jani-heinikoski)


## Lisenssi

[ISC](https://choosealicense.com/licenses/isc/)
