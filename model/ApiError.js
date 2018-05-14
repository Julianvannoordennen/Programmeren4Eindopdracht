//Error class
class ApiError {

    //Constructor voor JSON Bericht gegevens
    constructor(message, code){
        this.message = message;
        this.code = code;
        this.datetime = new Date().toISOString()
    }

}

//Exporteren voor gebruik bij andere files
module.exports = ApiError;
