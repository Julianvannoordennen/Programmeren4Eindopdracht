//
// CRUD operations on person
//
const ApiError = require('../model/ApiError')
const db = require('../config/db');
const assert = require('assert')

module.exports = {

  maakNieuwStudentenhuis(req, res, next) {
  },

  krijgStudentenHuizen(req, res, next) {

    //Voer query uit die alle items uit studentenhuis
    db.query({
      sql: 'SELECT * FROM studentenhuis',
      timeout: 2000
    }, (ex, rows, fields) => {

      //Error
      if (ex) {
        let error = new ApiError(ex.toString(), 422)
        next(error);

      } else {

        //Correct, stuur studentenhuizen terug
        res.status(200).json({
          status: {
            query: 'OK'
          },
          result: rows,
        }).end()
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
