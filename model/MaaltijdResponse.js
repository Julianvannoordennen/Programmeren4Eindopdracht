//Maaltijd reponse class
class MaaltijdResponse {

    //Constructor voor JSON Bericht gegevens
    constructor(ID, naam, beschrijving, ingredienten, allergie, prijs){
        this.ID = ID;
        this.naam = naam;
        this.beschrijving = beschrijving;
        this.ingredienten = ingredienten;
        this.allergie = allergie;
        this.prijs = prijs;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = MaaltijdResponse;
