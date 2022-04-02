/**
 * Author: Jani Heinikoski
 * Created: 25.03.2022
 * Sources:
 * https://nodejs.org/en/
 * https://expressjs.com/
 * https://www.npmjs.com/package/mysql2
 */
// Luo pelaaja reittiä varten alustetun Router-objektin instanssin,
// ja palauttaa referenssin siihen.
function routerFactory(mysqlConnection) {
    // Luodaan alustamaton Router-objekti. Käytetään
    // uusien reittien rekisteröimiseen expressin kanssa.
    const router = require("express").Router();
    // Reitit lisätään yksinkertaisimmillaan seuraavasti
    // router.<http-metodi>(<päätepiste>, <callback funktio>).
    // Tässä esimerkiksi luodaan GET reitti päätepisteeseen /,
    // sitä käytetään pelaajien hakemiseen palvelimelta.
    router.get("/", async (req, res) => {
        try {
            // Haetaan kaikki pelaajat tietokannasta
            const [pelaajat, sarakeMaaritelmat] = await mysqlConnection.execute(
                "SELECT * FROM PELAAJA"
            );
            if (pelaajat instanceof Array && pelaajat.length > 1) {
                // Löytyi pelaajat, lähetetään takaisin JSON -muodossa
                return res.status(200).json({ pelaajat: pelaajat });
            }
        } catch (err) {
            // Tulostetaan virhe ja lähetetään takaisin clientille HTTP 500
            // - Internal Server Error statuskoodi, mikäli menee jotain vikaan.
            console.error(err);
            return res.sendStatus(500);
        }
        // Ei löytynyt pelaajia, lähetetään HTTP 404 takaisin clientille
        return res.status(200).json({ pelaajat: [] });
    });
    // POST reitti päätepisteeseen /, käytetään pelaajien lisäämiseen
    router.post("/", async (req, res) => {
        const LISAA_PELAAJA_QUERY = `INSERT INTO PELAAJA
        (PELAAJA_NIMI, PELAAJA_SEURA) VALUES
        (?, ?);`;
        // Jos HTTP pyynnöstä löytyy bodystä lisättävä pelaaja
        if (req.body.pelaaja) {
            try {
                // Yritetään lisätä pelaaja tietokantaan
                console.log(
                    await mysqlConnection.execute(LISAA_PELAAJA_QUERY, [
                        req.body.pelaaja.PELAAJA_NIMI,
                        req.body.pelaaja.PELAAJA_SEURA,
                    ])
                );
            } catch (err) {
                // Tulostetaan virhe ja lähetetään takaisin clientille HTTP 500
                // - Internal Server Error statuskoodi, mikäli menee jotain vikaan.
                console.error(err);
                return res.sendStatus(500);
            }
            // Lisäys onnistui, lähetetään HTTP 204 takaisin clientille
            return res.sendStatus(204);
        }
        // Lisäyspyyntö ei sis. pelaajaa, lähetetään HTTP 400 takaisin clientille
        return res.sendStatus(400);
    });
    // DELETE reitti päätepisteeseen /, käytetään pelaajien poistamiseen
    router.delete("/", async (req, res) => {
        const POISTA_PELAAJAT_QUERY = `DELETE * FROM Pelaaja;`;
        try {
            // Yritetään poistaa pelaajat tietokannasta
            await mysqlConnection.execute(POISTA_PELAAJAT_QUERY);
        } catch (err) {
            // Tulostetaan virhe ja lähetetään takaisin clientille HTTP 500
            // - Internal Server Error statuskoodi, mikäli menee jotain vikaan.
            console.error(err);
            return res.sendStatus(500);
        }
        // Poisto onnistui, lähetetään HTTP 204 takaisin clientille
        return res.sendStatus(204);
    });
    return router;
}

module.exports = routerFactory;
