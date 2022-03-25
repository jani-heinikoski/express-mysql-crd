// Sisällytetään tarvittavat Node paketit
const express = require("express");
const mysql = require("mysql");
const path = require("path");
// dotenv lataa tiedostosta .env muuttuja-arvo-parit prosessin ympäristömuuttujiin
require("dotenv").config();
// Luodaan yhteysobjekti .env -tiedoston arvojen perusteella
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
});
// Yritetään yhdistää MySQL tietokantapalvelimeen
connection.connect(function (err) {
    // Jos yhdistäminen epäonnistuu, throwataan virhe (--> ja poistutaan ohjelmasta),
    // emme halua käynnistää palvelinta, jos tietokantaan ei pysty yhdistämään!
    if (err) {
        console.error("Palvelimeen yhdistäminen epäonnistui!");
        throw err;
    }
    console.log("Yhdistettiin tietokantaan onnistuneesti!");
    // Alustetaan express
    const app = express();
    // Pakotetaan HTTP pyyntöjen olevan JSON muodossa, mikäli ne ovat
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
});
