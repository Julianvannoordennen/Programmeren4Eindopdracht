//Valid token class
class ValidToken {

    //Constructor voor JSON Bericht gegevens
    constructor(token, email){
        this.token = token;
        this.email = email;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = ValidToken;
