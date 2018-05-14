//
// Authentication routes
//
const routes = require('express').Router();
const maaltijdController = require('../controller/maaltijd.controller.js')

//const AuthController = require('../controllers/authentication.controller')

// The router endpoints that we provide
routes.post('/:huisId/maaltijd', maaltijdController.maakNieuweMaaltijd)
//routes.get('/:huisId/maaltijd', maaltijdController.krijgMaaltijdenPerStudentenhuis)
//routes.get('/:huisId/maaltijd/:maaltijdId', maaltijdController.routes.js.krijgMaaltijdPerStudentenhuis)
//routes.put('/:huisId/maaltijd/:maaltijdId', maaltijdController.routes.js.vervangMaaltijd)
//routes.delete('/:huisId/maaltijd/:maaltijdId', maaltijdController.routes.js.verwijderMaaltijd)
routes.all('/*', maaltijdController.catchAll);

module.exports = routes
