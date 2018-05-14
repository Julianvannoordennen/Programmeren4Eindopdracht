//
// Authentication routes
//
const routes = require('express').Router();
const AuthController = require('../controllers/authentication.controller')

// The router endpoints that we provide
routes.post('/:huisId/maaltijd', controller/maaltijd.routes.js.maakNieuweMaaltijd)
routes.get('/:huisId/maaltijd', controller/maaltijd.routes.js.krijgMaaltijdenPerStudentenhuis)
routes.get('/:huisId/maaltijd/:maaltijdId', controller/maaltijd.routes.js.krijgMaaltijdPerStudentenhuis)
routes.put('/:huisId/maaltijd/:maaltijdId', controller/maaltijd.routes.js.vervangMaaltijd)
routes.delete('/:huisId/maaltijd/:maaltijdId', controller/maaltijd.routes.js.verwijderMaaltijd)

module.exports = routes
