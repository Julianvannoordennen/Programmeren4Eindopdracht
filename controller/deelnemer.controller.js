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

    //Token uit header halen
    const token = req.header('x-access-token') || ''

    //Token decoderen
    authentication.decodeToken(token, (err, payload) => {

      if (err) {

        //Foutief token, ga naar error endpoint
        next(new ApiError(err.message || err, 401))

      } else {

        //Voer query uit die het item in deelnemer verwijderd
        db.query({
          sql: "SELECT UserID FROM deelnemers WHERE StudentenhuisID=" + huisId + " AND MaaltijdID=" + maaltijdId,
          timeout: 2000
        }, (ex, rows, fields) => {

          //Error
          if (ex) {

            next(new ApiError(ex.toString(), 404));

          } else if (rows.length == 0) {

            //Geen rows geselecteerd, deelnemer is niet gevonden
            next(new ApiError("Deelnemer not found", 404))

          } else {

            //Voer query uit die het item in deelnemers verwijderd
            db.query({
              sql: 'DELETE FROM deelnemers WHERE UserID=' + payload.sub.id + " AND StudentenhuisID=" + huisId + " AND MaaltijdID=" + maaltijdId,
              timeout: 2000
            }, (ex, rows, fields) => {

              //Error
              if (ex) {

                next(new ApiError(ex.toString(), 404));

              } else if (rows.affectedRows == 0) {

                //Geen rows veranderd, deelnemer is niet gevonden
                next(new ApiError("User is not authorized to remove StudentenhuisID " + huisId + " with MaaltijdID " + maaltijdId, 409));

              } else {

                //Correct, stuur succes terug
                res.status(200).json({'removed': 'succesfull'}).end()
              }
            })
          }
        })
      }
    })
  }
}
