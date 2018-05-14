const bcrypt = require('bcryptjs');

//User register class
class UserRegisterJSON {

    //Constructor voor JSON Bericht gegevens
    constructor(firstname, lastname, email, password){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        
        //Password encrypten
        bcrypt.hash(password.trim(), 8, (err, hash) => {

            //Fout
            if(err) 
                throw(new ApiError(err.toString(), 500))

            //Correct, geencrypt wachtwoord opslaan
            if(hash) 
                this.password = hash
        })
    }
}

//Exporteren voor gebruik bij andere files
module.exports = UserRegisterJSON;
