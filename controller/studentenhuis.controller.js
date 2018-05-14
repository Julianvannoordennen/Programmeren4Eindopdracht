//Studentenhuis
const ApiError = require('../model/ApiError')
const Studentenhuis = require('../model/Studentenhuis')
const StudentenhuisResponse = require('../model/StudentenhuisResponse')
const db = require('../config/db');
const assert = require('assert')

module.exports = {

  maakNieuwStudentenhuis(req, res, next) {
  },

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

  krijgStudentenhuis(req, res, next) {
    
    //Verkrijg ID
    const id = req.params.huisId;

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
