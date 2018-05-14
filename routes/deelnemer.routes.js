//
// Authentication routes
//
const routes = require('express').Router();
const AuthController = require('../controllers/authentication.controller')

// The router endpoints that we provide
routes.post('/:huisId/maaltijd/:maaltijdId', controller/deelnemer.controller.js.registreerVoorMaaltijd)
routes.get('/:huisId/maaltijd/:maaltijdId/deelnemers', controller/deelnemer.controller.jsr.krijgDeelnemers)
routes.delete('/:huisId/maaltijd/:maaltijdId/deelnemers/', controller/deelnemer.controller.js.verwijderDeelnemer)

module.exports = routes
