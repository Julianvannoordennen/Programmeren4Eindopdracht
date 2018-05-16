//Maaltijd class

const ApiError = require("../model/ApiError");
const assert = require('assert')

class Maaltijd {

    //Constructor voor JSON Bericht gegevens
    constructor(naam, beschrijving, ingredienten, allergie, prijs){

      try {

      //Controleer de JSON
      assert(typeof naam === "string", "naam moet text zijn.")
      assert(naam.trim().length > 2, 'naam must be at least 3 characters')
      assert(typeof beschrijving === "string", "beschrijving moet text zijn.")
      assert(beschrijving.trim().length > 2, 'beschrijving must be at least 3 characters')
      assert(typeof ingredienten === "string","ingredienten moet text  zijn.")
      assert(ingredienten.trim().length > 2, 'ingredienten must be at least 3 characters')
      assert(typeof allergie === "string", "allergie moet text zijn.")
      assert(allergie.trim().length > 2, 'allergie must be at least 3 characters')
      // assert(typeof (prijs) === 'number', 'huisId must be a number.')
      assert(!isNaN(prijs), 'huisId must be a number.')

    } catch (ex) {
        throw(new ApiError(ex.toString(), 412))
    }

      this.naam = naam;
      this.beschrijving = beschrijving;
      this.ingredienten = ingredienten;
      this.allergie = allergie;
      this.prijs = prijs;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = Maaltijd;
