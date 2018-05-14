//Studentenhuis
const ApiError = require('../model/ApiError')
const Studentenhuis = require('../model/Studentenhuis')
const StudentenhuisResponse = require('../model/StudentenhuisResponse')
const db = require('../config/db');
const assert = require('assert')

module.exports = {

  /***** Voeg een nieuw studentenhuis toe *****/
  maakNieuwStudentenhuis(req, res, next) {

    //Controleren of de meegestuurde gegevens kloppen
    try {
      assert(typeof (req.body.naam) === 'string', 'naam must be a string.')
      assert(typeof (req.body.adres) === 'string', 'adres must be a string.')
    }
    catch (ex) {

      //Error
      const error = new ApiError(ex.toString(), 412)
      next(error)
      return
    }
    
    //Studentenhuis maken
    const studentenhuis = new Studentenhuis(
      req.body.naam, 
      req.body.adres
    )
    
    //Studentenhuis toevoegen
    db.query({
      sql: "INSERT INTO studentenhuis VALUES(null,?,?," + 1 + ")",
      values: [studentenhuis.naam, studentenhuis.adres], /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
      timeout: 2000
    }, (ex, rows, fields) => {

      if(ex) {

        //Error
        const error = new ApiError(ex, 412)
        next(error)

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
              const error = new ApiError(ex, 412)
              next(error)

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
  },



  /***** Krijg een arraylist met studentenhuizen *****/
  krijgStudentenHuizen(req, res, next) {

    //Voer query uit die alle items uit studentenhuis
    db.query({
      sql: 'SELECT * FROM view_studentenhuis',
      timeout: 2000
    }, (ex, rows, fields) => {

      //Error bij verbinden met database
      if (ex) {
        let error = new ApiError(ex.toString(), 404)
        next(error);

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
    })
  },



  /***** Zoek een specifiek studentenhuis op bij ID *****/
  krijgStudentenhuis(req, res, next) {
    
    //Verkrijg ID en controleer of het een nummer is
    const id = req.params.huisId;
    const id = parseInt(req.params.huisId);
    try {
        assert(typeof (id) === 'number', 'huisId must be a number.')
        assert(id === NaN, 'huisId must be a number.')
    }
    catch (ex) {
        const error = new ApiError(ex.toString(), 412)
        next(error)
        return
    }

    //Voer query uit die alle items uit studentenhuis
    db.query({
      sql: 'SELECT * FROM view_studentenhuis WHERE id=' + id,
      timeout: 2000
    }, (ex, rows, fields) => {

      //Error
      if (ex) {
        let error = new ApiError(ex.toString(), 404)
        next(error);

      } else if (rows.length == 0) {
         
        let error = new ApiError("ID " + id + " not found", 404)
        next(error);

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
    })
  },

  vervangStudentenhuis(req, res, next) {
  },

  verwijderStudentenhuis(req, res, next) {
  }
}
