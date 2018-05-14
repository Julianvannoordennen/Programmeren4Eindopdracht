//NodeJS Plugins
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

//Project bestanden
const ApiError = require('./model/ApiError')
const settings = require('./config/config')

//Express laden
let app = express()

//Bodyparser parsed de body van een request
app.use(bodyParser.json())

//Installeer Morgan als logger
app.use(morgan('dev'))

//Deze routes mogen worden bereikt zonder Authenticatie
/*
    app.use('/api', auth_routes)
*/

const connection = require('./config/db')
//Persoon verkrijgen
let query = {
    sql: "INSERT INTO user VALUES(null,?,?,?,?)",
    values: ['test', 'test2', 'test3', 'test4'],
    timeout: 2000
}
connection.query(query, (err, rows, fields) => {
    
    if(err) {
        console.log('Error: ' + err)
    }
    if(rows) {
        console.log('We got rows!')
        console.dir(rows)
    }
})

//Authenticatie voor alle standaard endpoints
/*
    app.all('*', AuthController.validateToken);
*/

//Standaard endpoints
/*
    app.use('/api', person_routes)
*/

//Niet bestaande endpoint getriggerd
app.use('*', function (req, res, next) {
	const error = new ApiError("Deze endpoint bestaat niet", 404)
	next(error)
})

//Alle errors komen hier als APIError class
app.use((err, req, res, next) => {
	// console.dir(err)
	res.status((err.code || 404)).json(err).end()	
})

//Luisteren naar poort
app.listen(settings.webPort, () => {
	console.log('Server running on port ' + settings.webPort)
})

//Exporteren voor Testcases
module.exports = app