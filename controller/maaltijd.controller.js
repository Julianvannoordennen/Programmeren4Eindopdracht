//
// CRUD operations on person
//
const ApiError = require('../model/ApiError')
const assert = require('assert')
const db = require('../config/db');
const Maaltijd = require('../Model/Maaltijd')
const MaaltijdResponse =  require('../Model/MaaltijdResponse')
module.exports = {

  maakNieuweMaaltijd(req, res, next) {

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

    let maaltijd = new Maaltijd(
      req.body.naam,
      req.body.beschrijving,
      req.body.ingredienten,
      req.body.allergie,
      req.body.prijs
    )
    let query = {
      sql: 'INSERT INTO maaltijd VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      values: [null, maaltijd.naam, maaltijd.beschrijving, maaltijd.ingredienten, maaltijd.allergie, maaltijd.prijs, 1, 1],
      timeout: 2000
    }

    db.query(query, (error, rows, fields) => {
      if (error) {
        next(new ApiError(error.toString(), 422));
      } else {
        res.status(200).json(new MaaltijdResponse(null, maaltijd.naam, maaltijd.beschrijving, maaltijd.ingredienten, maaltijd.allergie, maaltijd.prijs)).end()
      }
    })
  },


  krijgMaaltijdPerStudentenhuis(req, res, next) {
    // const URL = window.location.href
    //
    // let studentenHuisId = URL.search
    // console.log(studentenHuisId)
    console.log('hoi')

    let maaltijd = new Maaltijd(
      "a",
      "b",
      "c",
      "d",
      "e",
    )

    res.status(200).json(new MaaltijdResponse(null, maaltijd.naam, maaltijd.beschrijving, maaltijd.ingredienten, maaltijd.allergie, maaltijd.prijs)).end()

  },


  krijgMaaltijdPerStudentenhuis(req, res, next) {},


  vervangMaaltijd(req, res, next) {},

  verwijderMaaltijd(req, res, next) {

  }
}
