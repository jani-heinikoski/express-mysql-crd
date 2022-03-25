/**
 * Author: Jani Heinikoski
 * Created: 25.03.2022
 * Sources:
 * https://nodejs.org/en/
 * https://expressjs.com/
 * https://www.npmjs.com/package/mysql2
 */
module.exports = function (mysqlConnection) {
    const router = require("express").Router();
    // GET reitti päätepisteeseen /, käytetään pelaajien hakemiseen
    router.get("/", async (req, res) => {
        try {
            const [pelaajat, sarakeMaaritelmat] = await mysqlConnection.execute(
                "SELECT * FROM PELAAJA"
            );
            if (pelaajat instanceof Array && pelaajat.length > 1) {
                // Löytyi pelaajat, lähetetään takaisin JSON -muodossa
                return res.status(200).json({ pelaajat: pelaajat });
            }
        } catch (err) {
            return res.sendStatus(500);
        }
        // Ei löytynyt pelaajia -> vastataan HTTP statuskoodilla 404 - Not Found
        return res.sendStatus(404);
    });
    // POST reitti päätepisteeseen /, käytetään pelaajien lisäämiseen
    router.post("/", async (req, res) => {
        const LISAA_PELAAJA_QUERY = `INSERT INTO PELAAJA
        (PELAAJA_NIMI, PELAAJA_SEURA) VALUES
        (?, ?);`;
        if (req.body.pelaaja) {
            try {
                // Yritetään lisätä pelaaja tietokantaan
                await mysqlConnection.execute(LISAA_PELAAJA_QUERY, [
                    req.body.pelaaja.PELAAJA_NIMI,
                    req.body.pelaaja.PELAAJA_SEURA,
                ]);
            } catch (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            // Lisäys onnistui, lähetetään HTTP 201 takaisin clientille
            return res.sendStatus(201);
        }
        // Lisäyspyyntö ei sis. pelaajaa -> vastataan HTTP statuskoodilla 400 - Bad request
        return res.sendStatus(400);
    });
    // DELETE reitti päätepisteeseen /, käytetään pelaajien poistamiseen
    router.delete("/", async (req, res) => {
        const POISTA_PELAAJAT_QUERY = `INSERT INTO PELAAJA
        (PELAAJA_NIMI, PELAAJA_SEURA) VALUES
        (?, ?);`;
        try {
            // Yritetään poistaa pelaajat tietokannasta
            await mysqlConnection.execute(POISTA_PELAAJAT_QUERY);
        } catch (err) {
            // Tulostetaan virhe ja lähetetään takaisin clientille HTTP 500
            // - Internal Server Error statuskoodi, mikäli menee jotain vikaan.
            console.error(err);
            return res.sendStatus(500);
        }
        // Lisäys onnistui, lähetetään HTTP 204 takaisin clientille
        return res.sendStatus(204);
    });
    return router;
};
