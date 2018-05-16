//Studentenhuis reponse class
class StudentenhuisResponse {

    //Constructor voor JSON Bericht gegevens
    constructor(ID, naam, adres, contact, email){
        this.ID = ID;
        this.naam = naam;
        this.adres = adres;
        this.contact = contact;
        this.email = email;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = StudentenhuisResponse;
