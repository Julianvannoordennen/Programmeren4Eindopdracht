//
// Authentication routes
//
const routes = require("express").Router()
const deelnemerController = require("../controller/deelnemer.controller.js")

//const AuthController = require('../controllers/authentication.controller')

// The router endpoints that we provide
routes.post('/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemerController.registreerVoorMaaltijd)
routes.get('/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemerController.krijgDeelnemers)
routes.delete('/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemerController.verwijderDeelnemer)

module.exports = routes
