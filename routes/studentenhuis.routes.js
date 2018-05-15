//
// Authentication routes
//
const routes = require("express").Router()
const studentenhuisController = require("../controller/studentenhuis.controller.js")

//const AuthController = require('../controllers/authentication.controller')

// The router endpoints that we provide
routes.post("/", studentenhuisController.maakNieuwStudentenhuis)
routes.get("/", studentenhuisController.krijgStudentenHuizen)
//routes.get('/:huisId', studentenhuisController.krijgStudentenhuis)
//routes.put('/:huisId', studentenhuisController.vervangStudentenhuis)
//routes.delete('/:huisId', studentenhuisController.verwijderStudentenhuis)

module.exports = routes
