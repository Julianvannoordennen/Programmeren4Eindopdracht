//
// CRUD operations on person
//
const ApiError = require('../model/ApiError')
const assert = require('assert')

module.exports = {

  maakNieuwStudentenhuis(req, res, next) {
  },

  krijgStudentenHuizen(req, res, next) {
    let query = {
      sql: 'SELECT * FROM studentenhuis',
      timeout: 2000
    }

    db.query('query', (error, rows, fields) => {
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
    console.log(4)
  },

  krijgStudentenhuis(req, res, next) {
    res.status(200).json("studentenhuis").end();

  },

  vervangStudentenhuis(req, res, next) {
  },

  verwijderStudentenhuis(req, res, next) {
  }
}
