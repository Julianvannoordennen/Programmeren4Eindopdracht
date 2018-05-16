//Maaltijd class
class Maaltijd {

    //Constructor voor JSON Bericht gegevens
    constructor(naam, beschrijving, ingredienten, allergie, prijs){
        this.naam = naam;
        this.beschrijving = beschrijving;
        this.ingredienten = ingredienten;
        this.allergie = allergie;
        this.prijs = prijs;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = Maaltijd;
