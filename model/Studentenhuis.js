//Studentenhuis class

const ApiError = require("../model/ApiError");
const assert = require('assert')

class Studentenhuis {


    //Constructor voor JSON Bericht gegevens
    constructor(naam, adres){
        this.naam = naam;
        this.adres = adres;

      try {

        //Krijg de body van het request en check de JSON
        assert(typeof naam === "string", "naam moet text zijn.")
        assert(typeof adres === "string", "adres moet text zijn.")
        assert(naam.trim().length > 2, 'naam must be at least 3 characters')
        assert(adres.trim().length > 2, 'adres must be at least 3 characters')

      } catch (ex) {

        //Als er een error is stuur een api error naar next
        const error = new ApiError(ex.toString(), 412)
        next(error)
        return
      }

      this.naam = naam.trim();
      this.adres = adres.trim();
    }
}
