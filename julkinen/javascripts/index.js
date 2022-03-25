// Haetaan referenssit kaikkiin tarvittaviin DOM -elementteihin
const lisaaPelaajaBtn = document.querySelector("#lisaa-pelaaja");
const paivitaTaulukkoBtn = document.querySelector("#paivita-taulukko");
const pelaajatTbl = document.querySelector("#pelaajat");
const nimiInput = document.querySelector("#nimi");
const seuraInput = document.querySelector("#seura");
// Palauttaa <tr> DOM-elementin, mikä sisältää pelaajan tiedot
function luoPelaajaDOMElementti(id, nimi, seura) {
    // Uusi <tr> elementti
    const tr = document.createElement("tr");
    // <td> elementit jokaista arvoa varten
    const idTD = document.createElement("td");
    idTD.textContent = id;
    const nimiTD = document.createElement("td");
    nimiTD.textContent = nimi;
    const seuraTD = document.createElement("td");
    seuraTD.textContent = seura;
    // Lisätään <td> -elementit <tr> -elementin lapsiksi
    // (huom. järjestyksellä on väliä)
    tr.appendChild(idTD);
    tr.appendChild(nimiTD);
    tr.appendChild(seuraTD);
    return tr;
}
// Hakee kaikki pelaajat palvelimen rajapinnasta, palauttaa
// pelaajat listana objekteja tai arvon null, mikäli jokin meni vikaan
async function haeKaikkiPelaajat() {
    let serverResponse = null;
    try {
        serverResponse = await fetch("http://localhost:3000/api/pelaaja/", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (serverResponse.ok) {
            return (await serverResponse.json()).pelaajat;
        }
    } catch (err) {
        console.error(err);
    }
    return null;
}
// Lähettää uuden pelaajan palvelimelle lisättäväksi
async function lisaaPelaaja(nimi, seura) {
    try {
        let serverResponse = await fetch("http://localhost:3000/api/pelaaja/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pelaaja: {
                    PELAAJA_NIMI: nimi,
                    PELAAJA_SEURA: seura,
                },
            }),
        });
        return serverResponse.ok;
    } catch (err) {
        console.error(err);
    }
    return false;
}
// Päivittää pelaajataulukon dynaamisesti ensin tyhjentämällä sen
// ja sitten hakee palvelimelta kaikki pelaajat ja lisää ne taulukkoon.
// Huom. tämä on kohtuullisen epätehokas lähestymistapa, mutta menkööt yksinkertaisen
// esimerkin puitteissa.
async function paivitaTaulukko() {
    // Tyhjentää taulukon
    pelaajatTbl.innerHTML = "";
    // Hakee kaikki pelaajat
    const pelaajat = await haeKaikkiPelaajat();
    if (pelaajat instanceof Array) {
        // Lisää jokaisen pelaajan taulukkoon
        pelaajat.forEach((pelaaja) => {
            pelaajatTbl.appendChild(
                luoPelaajaDOMElementti(
                    pelaaja.PELAAJA_ID,
                    pelaaja.PELAAJA_NIMI,
                    pelaaja.PELAAJA_SEURA
                )
            );
        });
    }
}
// Tapahtumakäsittelijä "Lisää pelaaja" -painikkeelle
lisaaPelaajaBtn.addEventListener("click", async (event) => {
    if (nimiInput.value.length > 0 && seuraInput.value.length > 0) {
        // Jos pelaajan lisääminen onnistuu, niin päivitetään taulukko
        if (await lisaaPelaaja(nimiInput.value, seuraInput.value)) {
            await paivitaTaulukko();
        } else {
            alert("Jotain meni vikaan lisättäessä pelaajaa!");
        }
    } else {
        alert("Anna ensin nimi ja seura!");
    }
});
// Tapahtumakäsittelijä "Päivitä taulukko" -painikkeelle
paivitaTaulukkoBtn.addEventListener("click", async (event) => {
    await paivitaTaulukko();
});
