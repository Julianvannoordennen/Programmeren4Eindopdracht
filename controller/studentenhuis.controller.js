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
    // let query = {
    //   sql: 'SELECT * FROM studentenhuis',
    //   timeout: 2000
    // }

    db.query('SELECT * FROM studentenhuis', (ex, rows, fields) => {
      if (ex) {
        let error = new ApiError(ex.toString(), 422)
        next(error);
      } else {
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
