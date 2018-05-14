//User register class
class UserRegisterJSON {

    //Constructor voor JSON Bericht gegevens
    constructor(firstname, lastname, email, password){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = UserRegisterJSON;
