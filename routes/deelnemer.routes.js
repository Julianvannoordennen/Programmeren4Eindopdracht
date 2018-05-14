//
// Authentication routes
//
const routes = require('express').Router();
const AuthController = require('../controllers/authentication.controller')

// The router endpoints that we provide
routes.post('/', controller/deelnemer.routes.js.maakNieuwStudentenhuis)
routes.get('/', controller/deelnemer.routes.js.krijgStudentenHuizen)
routes.get('/:huisId', controller/deelnemer.routes.js.krijgStudentenhuis)
routes.put('/:huisId', controller/deelnemer.routes.js.vervangStudentenhuis)
routes.delete('/:huisId', controller/deelnemer.routes.js.verwijderStudentenhuis)

module.exports = routes
