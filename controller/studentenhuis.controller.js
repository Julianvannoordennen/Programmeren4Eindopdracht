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

      //Error
      if (ex) {
        let error = new ApiError(ex.toString(), 422)
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
  },

  vervangStudentenhuis(req, res, next) {
  },

  verwijderStudentenhuis(req, res, next) {
  }
}
