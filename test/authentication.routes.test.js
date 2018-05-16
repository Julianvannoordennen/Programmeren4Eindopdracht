/**
 * Testcases aimed at testing the authentication process.
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken
let endpoint = '/api/register'
let endpoint2 = '/api/login'

/* OM EEN OF ANDERE REDEN WERKT DE 1STE ERG LANGZAAM EN ZORGT DEZE SOMS VOOR TIMEOUT WAARDOOR MEERDERE TESTS CRASHEN */
describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post(endpoint)
            .send({
                'firstname': 'TestFirst',
                'lastname': 'TestLast',
                'email': 'abc@gmail.com',
                'password': 'Test'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('token').which.is.a('string')
                response.should.have.property('email').which.is.a('string')

                //Token opslaan
                const validToken = res.body.token
                module.exports = {token: validToken}
                done()
        })
    })

    it('should return an error on GET request', (done) => {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when the user already exists', (done) => {
        chai.request(server)
            .post(endpoint)
            .send({
                'email': 'abc@def.ghi',
                'password': 'Test'
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

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server)
            .post(endpoint)
            .send({
                'lastname': 'TestLast',
                'email': 'abc@def.ghi',
                'password': 'Test'
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

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when no lastname is provided', (done) => {
        chai.request(server)
            .post(endpoint)
            .send({
                'firstname': 'TestFirst',
                'email': 'abc@def.ghi',
                'password': 'Test'
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

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when email is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

})

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post(endpoint2)
            .send({
                'email': 'abc@def.ghi',
                'password': 'Test'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('token').which.is.a('string')
                response.should.have.property('email').which.is.a('string')

                done()
        })
    })

    it('should throw an error when email does not exist', (done) => {
        chai.request(server)
            .post(endpoint2)
            .send({
                'password': 'Test'
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

    it('should throw an error when email exists but password is invalid', (done) => {
        chai.request(server)
            .post(endpoint2)
            .send({
                'email': 'abc@def.ghi',
                'password': 'TestFout'
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

    it('should throw an error when using an invalid email', (done) => {
        chai.request(server)
            .post(endpoint2)
            .send({
                'password': 'Test'
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
