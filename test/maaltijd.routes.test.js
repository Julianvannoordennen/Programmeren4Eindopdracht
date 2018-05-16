const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const db = require("../config/db");
const authentication = require("../util/auth/authentication");

chai.should()
chai.use(chaiHttp)

let endpoint = '/api/studentenhuis/1/maaltijd'
let maaltijdId

describe('Maaltijd API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {

        chai.request(server)
            .post(endpoint)
            .send({
              "naam": "Eten",
              "beschrijving": "lekker",
              "ingredienten": "veel",
              "allergie": "test",
              "prijs": 0
            })
            .set("x-access-token","blah")
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should return a maaltijd when posting a valid object', (done) => {

        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .send({
              "naam": "Eten",
              "beschrijving": "lekker",
              "ingredienten": "veel",
              "allergie": "test",
              "prijs": 0
            })
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const message = res.body
                message.should.have.property('ID')
                message.should.have.property('naam')
                message.should.have.property('beschrijving')
                message.should.have.property('ingredienten')
                message.should.have.property('allergie')
                message.should.have.property('prijs')
                maaltijdId = message.ID
                done()
        })
    })

    it('should throw an error when naam is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .set("x-access-token",token)
            .send({
              "beschrijving": "HARSTIKKE LEKKERJOH",
              "ingredienten": "AARDAPPEL",
              "allergie": "geen",
              "prijs": 2
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should throw an error when beschrijving is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .set("x-access-token",token)
            .send({
              "naam": "PATAT",
              "ingredienten": "AARDAPPEL",
              "allergie": "adfadsf",
              "prijs": 2
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })
    it('should throw an error when ingredienten is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .set("x-access-token",token)
            .send({
              "naam": "PATAT",
              "beschrijving": "HARSTIKKE LEKKERJOH",
              "allergie": "adfadsf",
              "prijs": 2
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should throw an error when allergie is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .set("x-access-token",token)
            .send({
              "naam": "PATAT",
              "beschrijving": "HARSTIKKE LEKKERJOH",
              "ingredienten": "AARDAPPEL",
              "prijs": 2
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should throw an error when prijs is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .set("x-access-token",token)
            .send({
              "naam": "PATAT",
              "beschrijving": "HARSTIKKE LEKKERJOH",
              "ingredienten": "AARDAPPEL",
              "allergie": "adfadsf",
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })
})

describe('Maaltijd API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get(endpoint)
            .set("x-access-token","abc")
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get(endpoint)
            .set("x-access-token","abc")
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should return all maaltijden when using a valid token', (done) => {
      const token = require('./authentication.routes.test').token
      chai.request(server)
          .get(endpoint)
          .set("x-access-token",token)
          .end((err, res) => {
              res.should.have.status(200)

              const message = res.body[0]
              message.should.have.property('ID')
              message.should.have.property('naam')
              message.should.have.property('beschrijving')
              message.should.have.property('ingredienten')
              message.should.have.property('allergie')
              message.should.have.property('prijs')
              done()
          })
      })
  })

describe('Maaltijd API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get(endpoint + "/1")
            .set("x-access-token","abc")
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should return the correct maaltijd when using an existing huisId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(endpoint + "/1")
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')

                const message = res.body[0]
                message.should.have.property('ID')
                message.should.have.property('naam')
                message.should.have.property('beschrijving')
                message.should.have.property('ingredienten')
                message.should.have.property('allergie')
                message.should.have.property('prijs')
                done()
        })
    })

    it('should return an error when using an non-existing maaltijdId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(endpoint + "/99999999999999")
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
        })
    })
})

describe('Maaltijd API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .put(endpoint + "/" + maaltijdId)
            .set("x-access-token","abc")
            .send({
              "naam": "Een ander lekker hapje",
              "beschrijving": "maar nog net zolekker",
              "ingredienten": "Dingen enzo en wat meer nog",
              "allergie": "geen",
              "prijs": 15
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(endpoint + "/" + maaltijdId)
            .set("x-access-token",token)
            .send({
              "naam": "Een ander lekker hapje",
              "beschrijving": "maar nog net zo lekker",
              "ingredienten": "Dingen enzo en wat meer nog",
              "allergie": "geen",
              "prijs": 15
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const message = res.body
                message.should.have.property('naam').equals("Een ander lekker hapje")
                message.should.have.property('beschrijving').equals("maar nog net zo lekker")
                message.should.have.property('ingredienten').equals("Dingen enzo en wat meer nog")
                message.should.have.property('allergie').equals("geen")
                message.should.have.property('prijs').equals(15)
                done()
        })
    })

    it('should throw an error when naam is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(endpoint + "/" + maaltijdId)
            .set("x-access-token",token)
            .send({
              "beschrijving": "HARSTIKKE LEKKERJOH",
              "ingredienten": "AARDAPPEL",
              "allergie": "geen",
              "prijs": 2
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should throw an error when beschrijving is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(endpoint + "/" + maaltijdId)
            .set("x-access-token",token)
            .send({
              "naam": "PATAT",
              "ingredienten": "AARDAPPEL",
              "allergie": "adfadsf",
              "prijs": 2
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })
    it('should throw an error when ingredienten is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(endpoint + "/" + maaltijdId)
            .set("x-access-token",token)
            .send({
              "naam": "PATAT",
              "beschrijving": "HARSTIKKE LEKKERJOH",
              "allergie": "adfadsf",
              "prijs": 2
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should throw an error when allergie is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(endpoint + "/" + maaltijdId)
            .set("x-access-token",token)
            .send({
              "naam": "PATAT",
              "beschrijving": "HARSTIKKE LEKKERJOH",
              "ingredienten": "AARDAPPEL",
              "prijs": 2
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should throw an error when prijs is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(endpoint + "/" + maaltijdId)
            .set("x-access-token",token)
            .send({
              "naam": "PATAT",
              "beschrijving": "HARSTIKKE LEKKERJOH",
              "ingredienten": "AARDAPPEL",
              "allergie": "adfadsf",
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
        })
    })
})

describe('Maaltijd API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete(endpoint + "/" + maaltijdId)
            .set("x-access-token","abc")
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should not be able to remove a maaltijd he did not create', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete(endpoint + "/" + 1)
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(409)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(409)
                error.should.have.property('datetime')
                done()
        })
    })

    it('should return a message when succesfully deleting', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete(endpoint + "/" + maaltijdId)
            .set("x-access-token",token)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')

              const error = res.body
              error.should.have.property('removed')

                //Item verwijderen uit database want anders moet dat telkens handmatig
                db.query("DELETE FROM maaltijd WHERE Naam = 'Een ander lekker hapje' AND Ingredienten = 'Dingen enzo en wat meer nog'",() =>{})
                db.query("DELETE FROM user WHERE Email ='abc@def.ghi'",() =>{} )

                done()

        })
    })
})
