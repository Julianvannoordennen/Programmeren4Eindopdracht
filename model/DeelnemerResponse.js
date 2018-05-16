//Deelnemer reponse class
class DeelnemerResponse {

    //Constructor voor JSON Bericht gegevens
    constructor(voornaam, achternaam, email){
        this.voornaam = voornaam;
        this.achternaam = achternaam;
        this.email = email;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = DeelnemerResponse;
