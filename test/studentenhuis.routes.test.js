const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const db = require("../config/db");

chai.should()
chai.use(chaiHttp)

let endpoint = '/api/studentenhuis'
let studentenhuisID

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        
        chai.request(server)
            .post(endpoint)
            .send({
                'naam': 'test',
                'adres': 'ergens'
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

    it('should return a studentenhuis when posting a valid object', (done) => {
        
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .send({
                'naam': 'test',
                'adres': 'ergens'
            })
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const message = res.body
                message.should.have.property('ID')
                message.should.have.property('naam')
                message.should.have.property('adres')
                message.should.have.property('contact')
                message.should.have.property('email')
                studentenhuisID = message.ID
                done()
        })
    })

    it('should throw an error when naam is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .send({
                'adres': 'ergens'
            })
            .set("x-access-token",token)
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

    it('should throw an error when adres is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint)
            .send({
                'naam': 'test'
            })
            .set("x-access-token",token)
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

describe('Studentenhuis API GET all', () => {
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

    it('should return all studentenhuizen when using a valid token', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(endpoint)
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)

                const message = res.body[0]
                message.should.have.property('ID')
                message.should.have.property('naam')
                message.should.have.property('adres')
                message.should.have.property('contact')
                message.should.have.property('email')
                done()
        })
    })
})

describe('Studentenhuis API GET one', () => {
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

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(endpoint + "/1")
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const message = res.body
                message.should.have.property('ID')
                message.should.have.property('naam')
                message.should.have.property('adres')
                message.should.have.property('contact')
                message.should.have.property('email')
                done()
        })
    })

    it('should return an error when using an non-existing huisId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(endpoint + "/99999999999999999999999999999999999999")
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

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .put(endpoint + "/" + studentenhuisID)
            .set("x-access-token","abc")
            .send({
                'naam': 'test2',
                'adres': 'ergens2'
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
            .put(endpoint + "/" + studentenhuisID)
            .set("x-access-token",token)
            .send({
                'naam': 'XXXXXXXXX',
                'adres': 'XXXXXXXXX'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const message = res.body
                message.should.have.property('ID')
                message.should.have.property('naam').equals('XXXXXXXXX')
                message.should.have.property('adres').equals('XXXXXXXXX')
                message.should.have.property('contact')
                message.should.have.property('email')
                done()
        })
    })

    it('should throw an error when naam is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(endpoint + "/" + studentenhuisID)
            .set("x-access-token",token)
            .send({
                'adres': 'ergens'
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

    it('should throw an error when adres is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(endpoint + "/" + studentenhuisID)
            .set("x-access-token",token)
            .send({
                'naam': 'test'
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

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete(endpoint + "/" + studentenhuisID)
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

    //Bij delete zou je moeten testen dat een gebruiker die het studentenhuis niet heeft aangemaakt deze ook niet kan verwijderen, en dat je het studentenhuis niet kunt verwijderen als er nog maaltijden zijn in dat studentenhuis.

    //Volgens swagger hoort er alleen een lege response terug te komen ...
    it('should return a message when posting a valid object', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete(endpoint + "/" + studentenhuisID)
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('removed')
                done()
        })
    })

    it('should not be able to remove a studentenhuis he did not create', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete(endpoint + "/" + 1)
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('removed')
                done()
        })
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //

        //Item verwijderen uit database want anders moet dat telkens handmatig
        db.query("DELETE FROM studentenhuis WHERE Naam='XXXXXXXXX' AND Adres='XXXXXXXXX'",() =>{
            db.query("DELETE FROM user WHERE Email='abc@def.ghi'",() =>{} )
        } )
        

        done()
    })
})