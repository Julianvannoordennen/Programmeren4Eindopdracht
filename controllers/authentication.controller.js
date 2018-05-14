//Plugins
const assert = require('assert')
const bcrypt = require('bcryptjs')

//Project bestanden
const ApiError = require('../model/ApiError')
const UserLoginJSON = require('../model/UserLoginJSON')
const UserRegisterJSON = require('../model/UserRegisterJSON')
const authentication = require('../util/auth/authentication')
const connection = require('../config/db')

module.exports = {

    //Valideren van de token
    validateToken(req, res, next) {

        //Token uit header halen
        const token = req.header('x-access-token') || ''

        //Token decoderen
        authentication.decodeToken(token, (err, payload) => {

            if (err) {
               
                //Foutief token, ga naar error endpoint
                const error = new ApiError(err.message || err, 401)
                next(error)

            } else {

                //Correct
                console.log('Authenticated! Payload = ')
                console.dir(payload)
                req.user = payload.sub
                next()
            }
        })
    },

    //Inloggen
    login(req, res, next) {

        //Input controleren
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        }

        catch (ex) {

            //Foutieve input
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        //Person maken
        const person = new UserLoginJSON(
            req.body.email, 
            req.body.password
        )

        //Persoon verkrijgen
        connection.query({
            sql: "SELECT * FROM user WHERE Email = ? LIMIT 1",
            values: [person.email],
            timeout: 2000
        }, (err, rows, fields) => {

            //Controleren of de person bestaat
            if(err || rows.length != 1) {
                
                //Email bestaat niet
                next(new ApiError('Invalid credentials, bye.', 401))

            } else {
                
                //Controleren of wachtwoord klopt
                bcrypt.compare(person.password.trim(), rows[0].Password.trim(), (err, success) => {

                    //Gelukt
                    if (success) {
                        
                        //Payload maken
                        const payload = {
                            user: rows[0].Email,
                            role: 'admin, user'
                        }

                        //Informatie terugsturen die voor de gebruiker relevant is
                        const userinfo = { 
                            token: authentication.encodeToken(payload),
                            email: rows[0].Email
                        }
                        res.status(200).json(userinfo).end()

                    } else {

                        //Fout wachtwoord
                        next(new ApiError('Invalid credentials.', 401))
                    }
                })
            }
        })
    },
    
    //Registreren
    register(req, res, next) {

        //Controleren of de meegestuurde gegevens kloppen
        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string.')
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string.')
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        }
        catch (ex) {

            //Error
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }

        //Person maken
        const person = new UserRegisterJSON(
            req.body.firstname, 
            req.body.lastname,
            req.body.email,
            req.body.password
        )
        
        //Persoon toevoegen
        connection.query({
            sql: "INSERT INTO user VALUES(null,?,?,?,?)",
            values: [person.firstname, person.lastname, person.email, person.password],
            timeout: 2000
        }, (err, rows, fields) => {
            if(err) {
                
                //Email bestaat al
                const error = new ApiError(err, 412)
                next(error)

            } else {
               
                //Payload maken
                const payload = {
                    user: person.email,
                    role: 'admin, user'
                }

                //Token terugsturen
                const userinfo = {
                    token: authentication.encodeToken(payload),
                    email: person.email
                }
               console.log(userinfo);
                res.status(200).json(userinfo).end()
            }
        })
    }

}
