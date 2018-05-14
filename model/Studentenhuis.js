//Studentenhuis class
class Studentenhuis {

    //Constructor voor JSON Bericht gegevens
    constructor(naam, adres){
        this.naam = naam;
        this.adres = adres;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = Studentenhuis;
