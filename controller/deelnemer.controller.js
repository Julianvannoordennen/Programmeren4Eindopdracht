//
// CRUD operations on deelnemer
//
const Person = require('../model/Person')
const ApiError = require('../model/ApiError')
const assert = require('assert')

let personlist = []

module.exports = {

  routes.post('/:huisId/maaltijd/:maaltijdId', controller/deelnemer.controller.js.registreerVoorMaaltijd)
  routes.get('/:huisId/maaltijd/:maaltijdId/deelnemers', controller/deelnemer.controller.jsr.krijgDeelnemers)
  routes.delete('/:huisId/maaltijd/:maaltijdId/deelnemers/', controller/deelnemer.controller.js.verwijderDeelnemer)


    registreerVoorMaaltijd(req, res, next) {
    },


    krijgDeelnemers(req, res, next) {
    },

    verwijderDeelnemer(req, res, next) {
    }
}
