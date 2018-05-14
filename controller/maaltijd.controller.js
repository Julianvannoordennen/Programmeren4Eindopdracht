//
// CRUD operations on person
//
const ApiError = require('../model/ApiError')
const assert = require('assert')
const db = require('../config/db');

module.exports = {
  console.log("1")
  maakNieuweMaaltijd(req, res, next) {
    console.log("2")

    try {
      assert(typeof(req.body) === 'object', 'request body must have an object.')
      assert(typeof(req.body.naam) === 'string', 'naam moet text zijn.')
      assert(typeof(req.body.beschrijving) === 'string', 'naam moet text zijn.')
      assert(typeof(req.body.ingredienten) === 'string', 'ingredienten moet text  zijn.')
      assert(typeof(req.body.allergie) === 'string', 'allergie moet text zijn.')
      assert(typeof(req.body.prijs) === 'number', 'prijs moet een getal zijn.')

    } catch (ex) {
      const error = new ApiError(ex.toString(), 422)
      next(error)
      return
    }
    console.log("3")

    let maaltijd = new Maaltijd(
      req.body.naam,
      req.body.beschrijving,
      req.body.ingredienten,
      req.body.allergie,
      req.body.prijs
    )
    console.log("4")

    let query = {
      sql: 'INSERT INTO maaltijd VALUES (?, ?, ?, ?, ?)',
      values: [maaltijd.naam, maaltijd.beschrijving, maaltijd.ingredienten, maaltijd.allergie, maaltijd.prijs],
      timeout: 2000
    }
    console.log("5")

    db.query('query', (error, rows, fields) => {
      if (error) {
        let error = new ApiError(ex.toString(), 422)
        next(error);
      } else {
        res.status(200).json({
          status: {
            query: 'OK'
          },
          result: rows,
          result: fields
        }).end()
      }
    })
  },


  krijgMaaltijdPerStudentenhuis(req, res, next) {},


  krijgMaaltijdPerStudentenhuis(req, res, next) {},


  vervangMaaltijd(req, res, next) {},

  verwijderMaaltijd(req, res, next) {

  },

  catchAll(req, res, next) {
    res.status(404)
        .json({
            message: 'Deze maaltijd endpoint bestaat nog niet!'
        }).end()
}
}
