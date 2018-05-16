/**
 * Testcases aimed at testing the deelnemers endpoints. 
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken
let endpoint1 = '/api/studentenhuis/'
let endpoint2 = '/maaltijd/'
let endpoint3 = '/deelnemers'

describe('Deelnemers API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        
        chai.request(server)
            .post(endpoint1 + 1 + endpoint2 + 1 + endpoint3)
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

    it('should return a deelnemer when posting a valid huisId and MaaltijdId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint1 + 1 + endpoint2 + 1 + endpoint3)
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const message = res.body
                message.should.have.property('voornaam')
                message.should.have.property('achternaam')
                message.should.have.property('email')
                done()
        })
    })

    it('should return an error when using an non-existing huisId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint1 + 999999999999999 + endpoint2 + 1 + endpoint3)
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

    it('should return an error when using an non-existing maaltijdId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint1 + 1 + endpoint2 + 999999999999999 + endpoint3)
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

    it('should not be able to register himself for the same meal twice', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpoint1 + 1 + endpoint2 + 1 + endpoint3)
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
})

describe('Deelnemers API GET', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get(endpoint1 + 1 + endpoint2 + 1 + endpoint3)
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

    it('should return an array of deelnemers when using an existing huisId and maaltijdId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(endpoint1 + 1 + endpoint2 + 1 + endpoint3)
            .set("x-access-token",token)
            .end((err, res) => {
                res.should.have.status(200)

                const message = res.body[0]
                message.should.have.property('voornaam')
                message.should.have.property('achternaam')
                message.should.have.property('email')
                done()
        })
    })

    it('should return an error when using an non-existing huisId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(endpoint1 + 999999999999999 + endpoint2 + 1 + endpoint3)
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

    it('should return an error when using an non-existing maaltijdId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(endpoint1 + 1 + endpoint2 + 999999999999999999 + endpoint3)
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

    describe('Deelnemers API DELETE', () => {
        it('should throw an error when using invalid JWT token', (done) => {
            chai.request(server)
                .delete(endpoint1 + 1 + endpoint2 + 1 + endpoint3)
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

        it('should return an error when using an non-existing huisId', (done) => {
            const token = require('./authentication.routes.test').token
            chai.request(server)
                .delete(endpoint1 + 9999999999999999 + endpoint2 + 1 + endpoint3)
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

        it('should return an error when using an non-existing maaltijdId', (done) => {
            const token = require('./authentication.routes.test').token
            chai.request(server)
                .delete(endpoint1 + 1 + endpoint2 + 999999999999999 + endpoint3)
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
    
        it('should return a message when posting a valid object', (done) => {
            const token = require('./authentication.routes.test').token
            chai.request(server)
                .delete(endpoint1 + 1 + endpoint2 + 1 + endpoint3)
                .set("x-access-token",token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
    
                    const error = res.body
                    error.should.have.property('removed')    
                    done()
            })
        })
    
        it('should not be able to remove a deelnemer he did not create', (done) => {
            const token = require('./authentication.routes.test').token
            chai.request(server)
                .delete(endpoint1 + 1 + endpoint2 + 1 + endpoint3)
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
    })
})