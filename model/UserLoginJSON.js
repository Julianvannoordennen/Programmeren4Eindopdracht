//User Login class
class UserLoginJSON {

    //Constructor voor JSON Bericht gegevens
    constructor(email, password){
        this.email = email;
        this.password = password;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = UserLoginJSON;
