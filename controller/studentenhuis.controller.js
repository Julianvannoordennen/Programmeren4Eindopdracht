//Studentenhuis
const ApiError = require("../model/ApiError");
const Studentenhuis = require("../model/Studentenhuis");
const StudentenhuisResponse = require("../model/StudentenhuisResponse");
const db = require("../config/db");
const assert = require("assert");

module.exports = {
  /***** Voeg een nieuw studentenhuis toe *****/
  maakNieuwStudentenhuis(req, res, next) {
    //Controleren of de meegestuurde gegevens kloppen
    try {
      assert(typeof req.body.naam === "string", "naam must be a string.");
      assert(typeof req.body.adres === "string", "adres must be a string.");
    } catch (ex) {
      //Error
      next(new ApiError(ex.toString(), 412))
      return
    }

    //Studentenhuis maken
    const studentenhuis = new Studentenhuis(req.body.naam, req.body.adres);

    //Token uit header halen
    const token = req.header('x-access-token') || ''

    //Token decoderen
    authentication.decodeToken(token, (err, payload) => {

      if (err) {

        //Foutief token, ga naar error endpoint
        next(new ApiError(err.message || err, 401))

      } else {

        //Studentenhuis toevoegen
        db.query({
          sql: "INSERT INTO studentenhuis SELECT null, ?, ?, " + payload.sub.id,
          values: [studentenhuis.naam, studentenhuis.adres],
          timeout: 2000
        }, (ex, rows, fields) => {

          if(ex) {

            //Error
            next(new ApiError(ex, 412))

          } else {

            //Laatste id verkrijgen
            const lastID = rows.insertId

            //Studentenhuis van view verkrijgen
            db.query({
              sql: "SELECT * FROM view_studentenhuis WHERE ID = " + lastID,
              timeout: 2000
            }, (ex, rows, fields) => {
              if(ex) {

                //Error
                next(new ApiError(ex, 412))

              } else {

                //Array maken en alles omzetten
                const row = rows[0]
                const response = new StudentenhuisResponse(
                  row.ID,
                  row.Naam,
                  row.Adres,
                  row.Contact,
                  row.Email
                );

                //Correct, stuur studentenhuizen terug
                res.status(200).json(response).end()
              }
            })
          }
        })
      }
    );
  },

  /*************************************************\
  ***** Krijg een arraylist met studentenhuizen *****
  \*************************************************/
  krijgStudentenHuizen(req, res, next) {

    //Voer query uit die één items uit studentenhuis haalt
    db.query({
      sql: 'SELECT * FROM view_studentenhuis',
      timeout: 2000
    }, (ex, rows, fields) => {

      //Error
      if (ex) {
        next(new ApiError(ex.toString(), 422));

      } else {

        //Array maken en alles omzetten
        let response = new Array();
        rows.forEach(row => {
          response.push(new StudentenhuisResponse(
            row.ID,
            row.Naam,
            row.Adres,
            row.Contact,
            row.Email
          ))
        });

        //Correct, stuur studentenhuizen terug
        res.status(200).json(response).end()
      }
    );
  },

  /***** Zoek een specifiek studentenhuis op bij ID *****/
  krijgStudentenhuis(req, res, next) {
    //Verkrijg ID en controleer of het een nummer is
    const id = Number(req.params.huisId)
    
    try {
        assert(typeof (id) === 'number', 'huisId must be a number.')
        assert(!isNaN(id), 'huisId must be a number.')
    }
    catch (ex) {
        next(new ApiError(ex.toString(), 412))
        return
    }

    //Voer query uit die alle items uit studentenhuis
    db.query({
      sql: "SELECT * FROM view_studentenhuis WHERE ID = " + id,
      timeout: 2000
    }, (ex, rows, fields) => {

      //Error
      if (ex) {
        next(new ApiError(ex.toString(), 404));

      } else if (rows.length == 0) {

        next(new ApiError("ID " + id + " not found", 404));

      } else {

        //Verkrijg correcte row
        const row = rows[0];

        //Array maken en alles omzetten
        const response = new StudentenhuisResponse(
          row.ID,
          row.Naam,
          row.Adres,
          row.Contact,
          row.Email
        )

        //Correct, stuur studentenhuizen terug
        res.status(200).json(response).end()
      }
    );
  },

  /****************************************************\
  ***** Vervang een specifiek studentenhuis bij ID *****
  \****************************************************/
  vervangStudentenhuis(req, res, next) {

    //Verkrijg ID en controleer of het een nummer is
    const id = Number(req.params.huisId)
    
    try {
        assert(typeof (id) === 'number', 'huisId must be a number.')
        assert(!isNaN(id), 'huisId must be a number.')
    }
    catch (ex) {
        next(new ApiError(ex.toString(), 412))
        return
    }

    /*********************** */
  },

  /******************************************************\
  ***** Verwijder een specifiek studentenhuis bij ID *****
  \******************************************************/
  verwijderStudentenhuis(req, res, next) {

    //Verkrijg ID en controleer of het een nummer is
    const id = Number(req.params.huisId);
    
    try {
      assert(typeof (id) === 'number', 'huisId must be a number.')
      assert(!isNaN(id), 'huisId must be a number.')
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

        //Voer query uit die het item in studentenhuis verwijderd
        db.query({
          sql: 'SELECT ID FROM studentenhuis WHERE ID=' + id,
          timeout: 2000
        }, (ex, rows, fields) => {

          //Error
          if (ex) {

            next(new ApiError(ex.toString(), 404));

          } else if (rows.length == 0) {
            
            //Geen rows veranderd, studentenhuis is niet gevonden
            next(new ApiError("ID " + id + " not found", 404));

          } else {

            //Voer query uit die het item in studentenhuis verwijderd
            db.query({
              sql: 'DELETE FROM studentenhuis WHERE ID=' + id + " AND UserID = " + payload.sub.id,
              timeout: 2000
            }, (ex, rows, fields) => {

              //Error
              if (ex) {

                next(new ApiError(ex.toString(), 404));

              } else if (rows.affectedRows == 0) {
                
                //Geen rows veranderd, studentenhuis is niet gevonden
                next(new ApiError("User is not authorized to remove ID " + id, 409));

              } else {

                //Correct, stuur studentenhuizen terug
                const response = {
                  'removed': 'succesfull'
                }
                res.status(200).json(response).end()
              }
            })
          }
        })
      }
    })
  }
}
