// Sisällytetään tarvittavat Node paketit
const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");
// dotenv lataa tiedostosta .env muuttuja-arvo-parit prosessin ympäristömuuttujiin
require("dotenv").config();
// Määritellään async "main" funktio, missä alustetaan ja käynnistetään palvelin
async function main() {
    // Luodaan yhteysobjekti .env -tiedoston arvojen perusteella
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: "KISAT_DB",
    });
    console.log("Yhdistettiin tietokantaan onnistuneesti!");
    // Alustetaan MySQL tietokanta (luodaan PELAAJA -taulu, mikäli ei ole olemassa)
    require("./mysql-alustus")(connection);
    // Alustetaan express
    const app = express();
    // Pakotetaan HTTP pyyntöjen olevan JSON muodossa, mikäli ne ovat,
    // niin Express parsii ne automaattisesti JavaScript objekteiksi
    // turvallisesti.
    app.use(express.json({ type: "application/json" }));
    // Kerrotaan expressille, että julkinen kansio sisältää staattisia resursseja
    // --> Express palvelee nämä automaattisesti
    app.use(express.static(path.join(__dirname, "public")));
    // Sisällytetään tekemämme pelaaja-reitti, josta saa pelaajat
    const pelaajaRouter = require("./reitit/pelaaja")(connection);
    app.use(pelaajaRouter);
    // Käynnistetään express palvelin .env tiedostossa annetussa portissa tai
    // portissa 3000, jos sitä ei ole määritetty
    app.listen(process.env.EXPRESS_SERVER_PORT || 3000);
}

main();
