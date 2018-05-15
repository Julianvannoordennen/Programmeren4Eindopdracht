const bcrypt = require('bcryptjs');
const ApiError = require("../model/ApiError");
const assert = require('assert')

function validateEmail(email) {
    const validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
}

//User register class
class UserRegisterJSON {

    //Constructor voor JSON Bericht gegevens
    constructor(firstname, lastname, email, password){

      // Verify that we only create valid persons
      try {
          assert(typeof (firstname) === 'string', 'firstname must be a string')
          assert(typeof (lastname) === 'string', 'lastname must be a string')
          assert(typeof (email) === 'string', 'email must be a string')
          assert(typeof (password) === 'string', 'password must be a string')
          assert(firstname.trim().length > 2, 'firstname must be at least 3 characters')
          assert(lastname.trim().length > 2, 'lastname must be at least 3 characters')
          assert(validateEmail(email.trim()), 'email must be a valid emailaddress')
          assert(password.trim().length > 2, 'password must be at least 3 characters')
      }
      catch (ex) {
          throw(new ApiError(ex.toString(), 422))
      }

      this.firstname = firstname.trim(),  // trim removes whitespace in front and at end
      this.lastname = lastname.trim()
      this.email = email.trim()

      //Password encrypten
      this.password = bcrypt.hashSync(password.trim(), 8);
      /*bcrypt.hash(password.trim(), 8, (err, hash) => {

          //Fout
          if(err)
              throw(new ApiError(err.toString(), 500))

          //Correct, geencrypt wachtwoord opslaan
          if(hash)
              this.password = hash
      })*/
    }
}

UserRegisterJSON.prototype.toString = function personToString() {
    var copy = Object.assign({}, this);
    delete copy.password
    return copy
}

//Exporteren voor gebruik bij andere files
module.exports = UserRegisterJSON;
