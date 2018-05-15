//CRUD Operaties deelnemer
const ApiError = require("../model/ApiError")
const DeelnemerResponse = require("../model/DeelnemerResponse")
const authentication = require("../util/auth/authentication");
const db = require("../config/db");
const assert = require("assert")

module.exports = {
  
  /***********************************************************\
  ***** Registreer voor maaltijd met huisID en maaltijdID *****
  \***********************************************************/
  registreerVoorMaaltijd(req, res, next) {

    //Testen
    try {
      assert(typeof (huisId) === 'number', 'huisId must be a number.')
      assert(!isNaN(huisId), 'huisId must be a number.')
      assert(typeof (maaltijdId) === 'number', 'maaltijdId must be a number.')
      assert(!isNaN(maaltijdId), 'maaltijdId must be a number.')
    }

    catch (ex) {
      next(new ApiError(ex.toString(), 412))
      return
    }

  },






  /***************************************************\
  ***** Krijg deelnemers met huisID en maaltijdID *****
  \***************************************************/
  krijgDeelnemers(req, res, next) {

    //Verkrijg IDs en controleer of het nummers zijn
    const huisId = Number(req.params.huisId)
    const maaltijdId = Number(req.params.maaltijdId)

    //Testen
    try {
      assert(typeof (huisId) === 'number', 'huisId must be a number.')
      assert(!isNaN(huisId), 'huisId must be a number.')
      assert(typeof (maaltijdId) === 'number', 'maaltijdId must be a number.')
      assert(!isNaN(maaltijdId), 'maaltijdId must be a number.')
    }

    catch (ex) {
      next(new ApiError(ex.toString(), 412))
      return
    }

    //Voer query uit die alle items uit deelnemers haalt
    db.query({
      sql: "SELECT * FROM view_deelnemers WHERE StudentenhuisID = " + huisId + " AND MaaltijdID = " + maaltijdId,
      timeout: 2000
    }, (ex, rows, fields) => {

      //Error
      if (ex) {
        next(new ApiError(ex.toString(), 422));
      } else {

        //Array leeg?
        if (rows.length == 0) {
          next(new ApiError("HuisID " + huisId + " with MaaltijdId " + maaltijdId + " has no record(s)", 404));

        } else {

          //Array maken en rows omzetten naar DeelnemerResponses
          let response = new Array();
          rows.forEach(row => {
            response.push(new DeelnemerResponse(row.Voornaam, row.Achternaam, row.Email));
          });

          //Stuur deelnemers terug
          res.status(200).json(response).end();
        }
      }
    })
  },










  /*******************************************************\
  ***** Verwijder deelnemers met huisID en maaltijdID *****
  \*******************************************************/
  verwijderDeelnemer(req, res, next) {

    //Testen
    try {
      assert(typeof (huisId) === 'number', 'huisId must be a number.')
      assert(!isNaN(huisId), 'huisId must be a number.')
      assert(typeof (maaltijdId) === 'number', 'maaltijdId must be a number.')
      assert(!isNaN(maaltijdId), 'maaltijdId must be a number.')
    }

    catch (ex) {
      next(new ApiError(ex.toString(), 412))
      return
    }

  }
}
