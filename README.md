# Express + MySQL REST API

Yksinkertainen demonstraatio REST-rajapinnan luomisesta Node + Express -teknologiapinolla hyödyntäen MySQL tietokantaa datan tallettamiseen.



## Asennus

Lataa koodirepositoryn sisältö haluamaasi hakemistoon.

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

## Rajapinnan HTTP päätepisteet

#### Hae kaikki pelaajat

```http
  GET /api/pelaaja
```

#### Luo uusi pelaaja

```http
  POST /api/pelaaja
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pelaaja`      | `JSON-object` | **Pakollinen**. Uusi pelaaja, ks. muoto alla. |

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



## Authors

- [@jani-heinikoski](https://www.github.com/jani-heinikoski)
    
