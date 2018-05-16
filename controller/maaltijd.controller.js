//
// CRUD operaties op maaltijd
//

//Haal alle benodigde bestanden op
const ApiError = require("../model/ApiError")
const assert = require("assert")
const db = require("../config/db")
const Maaltijd = require("../Model/Maaltijd")
const MaaltijdResponse = require("../Model/MaaltijdResponse")
const authentication = require("../util/auth/authentication")
const Studentenhuis = require("../model/Studentenhuis")

module.exports = {

  /*
  Maak nieuwe maaltijd
  */
  maakNieuweMaaltijd(req, res, next) {

    //Token uit header halen
    const token = req.header('x-access-token') || ''

    //Variable voor de Payload aanmaken

    //Token decoderen
    authentication.decodeToken(token, (err, payload) => {
      if (err) {

        //Foutief token, ga naar error endpoint
        next(new ApiError(err.message || err, 401))

      } else {


      //krijg de parameters van het request
      let huisId = Number(req.params.huisId)

      try {

        //controleer of de parameter een getal is
        assert(typeof (huisId) === 'number', 'het id van het huis moet een getal zijn..')
        assert(!isNaN(huisId), 'het id van het huis moet een getal zijn.')

        //Krijg de body van het request en check de JSON
        assert(typeof req.body === "object", "request body must have an object.")

      } catch (ex) {

        //Als de parameter geen nummer is stuur dan een api error naar next
        next(new ApiError(ex.toString(), 412))
        return
      }

      //Maak een nieuwe maaltijd aan
      let maaltijd = new Maaltijd(
        req.body.naam,
        req.body.beschrijving,
        req.body.ingredienten,
        req.body.allergie,
        req.body.prijs
      )

      //Maak een nieuwe query aan om te kijken of het studentenhuis met het id bestaat
      let selectQuery = {
        sql: "SELECT * FROM maaltijd WHERE StudentenhuisId = ?",
        values: [huisId],
        timeout: 2000
      }

      //Voer de query uit
      db.query(selectQuery,(error, rows, fields) => {
          if (error) {

            //als er een error maak dan een api error aan en stuur die naar next
            next(new ApiError(error, 412));
          } else {

            //Check of de query resultaat heeft
            if (rows.length === 0){

              //Als het resultaat leeg is bestaat het studentenhuis voor dat nummer dus niet
              next(new ApiError("Er is geen studentenhuis met het opgegeven studentenhuisId", 404));

            }else {

              //Als de query restultaat heeft ga door
              return
            }
          }
        }
      )

      //Maak een nieuwe query aan om de maaltijd in de database te stoppen
      let insertQuery = {
        sql: "INSERT INTO maaltijd VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
          null,
          maaltijd.naam,
          maaltijd.beschrijving,
          maaltijd.ingredienten,
          maaltijd.allergie,
          maaltijd.prijs,
          payload.sub.id,
          huisId
          ],
        timeout: 2000
      }
      //voer de query uit
      db.query(insertQuery, (error, rows, fields) => {
        if (error) {

          //als er een error maak dan een api error aan en stuur die naar next
          next(new ApiError(error.toString(), 422))
        } else {
          //Maak een nieuwe response aan van hetgene wat er in de database is gestopt
          res
            .status(200)
            .json(
              new MaaltijdResponse(
                rows.insertId,
                maaltijd.naam,
                maaltijd.beschrijving,
                maaltijd.ingredienten,
                maaltijd.allergie,
                maaltijd.prijs
              )
            ).end()
        }
      })
    }
  })
  },

  /*
  Krijg maaltijden per studentenhuis
  */
  krijgMaaltijdenPerStudentenhuis(req, res, next) {

    //Token uit header halen
    const token = req.header('x-access-token') || ''

    //Token decoderen
    authentication.decodeToken(token, (err, payload) => {
      if (err) {

        //Foutief token, ga naar error endpoint
        next(new ApiError(err.message || err, 401))
      }
    })

    //krijg de parameters van het request
    let huisId = Number(req.params.huisId)

    try {

      //controleer of het parameter een getal is
      assert(typeof (huisId) === 'number', 'het id van het huis moet een getal zijn..')
      assert(!isNaN(huisId), 'het id van het huis moet een getal zijn.')
    } catch (ex) {

      //Als de parameter geen nummer is stuur dan een api error naar next
      next(new ApiError(ex.toString(), 412))
      return
    }

    //maak een query aan om een maaltijd te krijgen voor een bepaald studentenhuis id
    let query = {
    sql: "SELECT * FROM maaltijd WHERE StudentenHuisId = ? ",
    values: [huisId],
    timeout: 2000
    }

    //voer de query uit
    db.query(query, (error, rows, fields) => {
      if (error) {
        //Als er een error is stuur een api error naar next
          next(new ApiError(error.toString(), 422))
      } else {

          //Check of de query resultaat heeft
          if (rows.length === 0){

            //Als het resultaat leeg is bestaat het studentenhuis voor dat nummer dus niet
            next(new ApiError("Er is geen studentenhuis met het opgegeven studentenhuisId", 404));

          }else {

          //Maak een nieuwe array aan waar alle resultaten van de query in worden gezet
          let response = new Array()
          rows.forEach(row => {
            //Maak voor elke maaltijd een nieuwe maaltijd response aan en zet hem in de array
            response.push(
              new MaaltijdResponse(
                row.ID,
                row.Naam,
                row.Beschrijving,
                row.Ingredienten,
                row.Allergie,
                row.Prijs
              )
            )
          })
          //Verstuur de array met maaltijd responses
          res.status(200).json(response).end()
        }
      }
    })
  },

  /*
  Krijg maaltijd per studentenhuis
  */
  krijgMaaltijdPerStudentenhuis(req, res, next) {

    //Token uit header halen
    const token = req.header('x-access-token') || ''

    //Token decoderen
    authentication.decodeToken(token, (err, payload) => {
      if (err) {

        //Foutief token, ga naar error endpoint
        next(new ApiError(err.message || err, 401))
      }
    })

    //krijg de parameters van het request
    let huisId = Number(req.params.huisId)
    let maaltijdId = Number(req.params.maaltijdId)

    try {

      //controleer of het parameter een getal is
      assert(typeof (huisId) === 'number', 'het id van het huis moet een getal zijn..')
      assert(!isNaN(huisId), 'het id van het huis moet een getal zijn.')
      assert(typeof (maaltijdId) === 'number', 'het id van de maaltijd moet een getal zijn..')
      assert(!isNaN(maaltijdId), 'het id van de maaltijd moet een getal zijn.')
    } catch (ex) {

      //Als de parameter geen nummer is stuur dan een api error naar next
      next(new ApiError(ex.toString(), 412))
      return
    }

    //maak een query aan om een bepaalde maaltijd te krijgen via het ID voor een bepaald studentenhuis id
    let query = {
      sql: "SELECT * FROM maaltijd WHERE StudentenHuisId = ? AND ID = ?",
      values: [huisId, maaltijdId],
      timeout: 2000
    }

    //voer de query uit
    db.query(query, (error, rows, fields) => {
      if (error) {
        //Als er een error is stuur een api error naar next
        next(new ApiError(error.toString(), 422))
      } else {

        //Check of de query resultaat heeft
        if (rows.length === 0){

          //Als het resultaat leeg is bestaat het studentenhuis voor dat nummer dus niet
          next(new ApiError("Er is geen studentenhuis met het opgegeven studentenhuisId of er is geen maaltijd met het opgegeven maaltijdId", 404));

        }else {
          //Maak een nieuwe array aan waar alle resultaten van de query in worden gezet
          let response = new Array()
          rows.forEach(row => {
            //Maak voor elke maaltijd een nieuwe maaltijd response aan en zet hem in de array
            response.push(
              new MaaltijdResponse(
                row.ID,
                row.Naam,
                row.Beschrijving,
                row.Ingredienten,
                row.Allergie,
                row.Prijs
              )
            )
          })
          //Verstuur de array met maaltijd responses
          res.status(200).json(response).end()
        }
      }
    })
  },

  /*
  Vervang een maaltijd
  */
  vervangMaaltijd(req, res, next) {

    //Token uit header halen
    const token = req.header('x-access-token') || ''

    //Token decoderen
    authentication.decodeToken(token, (err, payload) => {
      if (err) {

        //Foutief token, ga naar error endpoint
        next(new ApiError(err.message || err, 401))
      } else {

        //krijg de parameters van het request
        let huisId = Number(req.params.huisId)
        let maaltijdId = Number(req.params.maaltijdId)

        try {

          //controleer of de parameters een getal zijn
          assert(typeof (huisId) === 'number', 'het id van het huis moet een getal zijn..')
          assert(!isNaN(huisId), 'het id van het huis moet een getal zijn.')
          assert(typeof (maaltijdId) === 'number', 'het id van de maaltijd moet een getal zijn..')
          assert(!isNaN(maaltijdId), 'het id van de maaltijd moet een getal zijn.')

          //Krijg de body van het request en check de JSON
          assert(typeof req.body === "object", "request body must have an object.")

        } catch (ex) {

          //Als een parameter geen nummer is stuur dan een api error naar next
          const error = new ApiError(ex.toString(), 412)
          next(error)
          return
        }

        //Maak een nieuwe maaltijd aan
        let maaltijd = new Maaltijd(
          req.body.naam,
          req.body.beschrijving,
          req.body.ingredienten,
          req.body.allergie,
          req.body.prijs
        )

        //maak een query aan om te kijken of een maaltijd met het maaltijdId bestaat bij het studentenhuis met het studentenhuisId
        let selectQuery = {
          sql: "SELECT * FROM maaltijd WHERE StudentenHuisId = ? AND ID = ?",
          values: [huisId, maaltijdId],
          timeout: 2000
        }

        //voer de query uit
        db.query(selectQuery, (error, rows, fields) => {
          if (error) {
            //Als er een error is stuur een api error naar next
            next(new ApiError(error.toString(), 422))
          } else {

            //Check of de query resultaat heeft
            if (rows.length === 0){

              //Als het resultaat leeg is bestaat het studentenhuis voor dat nummer dus niet
              next(new ApiError("Er is geen studentenhuis met het opgegeven studentenhuisId of er is geen maaltijd met het opgegeven maaltijdId", 404));

            }else {
              let userId = rows[0].UserID
              if (userId !== payload.sub.id){
                next(new ApiError("De ingelogde gebruiker heeft geen rechten op deze maaltijd", 409));
              } else {
                let updateQuery = {
                  sql: "UPDATE maaltijd set Naam = ?, Beschrijving = ?, Ingredienten = ?, Allergie = ?, Prijs = ? WHERE StudentenhuisId = ? AND ID = ?",
                  values: [
                    maaltijd.naam,
                    maaltijd.beschrijving,
                    maaltijd.ingredienten,
                    maaltijd.allergie,
                    maaltijd.prijs,
                    huisId,
                    maaltijdId
                  ],
                  timeout: 2000
                }

                //voer de query uit
                db.query(updateQuery, (error, rows, fields) => {
                  if (error) {
                    //Als er een error is stuur een api error naar next
                    next(new ApiError(error.toString(), 422))
                  } else {

                    //Maak een nieuwe response aan van hetgene wat er in de database is gestopt
                    res
                      .status(200)
                      .json(
                        new MaaltijdResponse(
                          //@ TODO: fix insertedId
                          rows[0].insertId,
                          maaltijd.naam,
                          maaltijd.beschrijving,
                          maaltijd.ingredienten,
                          maaltijd.allergie,
                          maaltijd.prijs
                        )
                      ).send()
                  }
                })
              }
            }
          }
        })
      }
    })
  },

  /*
  Verwijder een maaltijd
  */
  verwijderMaaltijd(req, res, next) {

        //Token uit header halen
        const token = req.header('x-access-token') || ''

        //Variable voor de Payload aanmaken

        //Token decoderen
        authentication.decodeToken(token, (err, payload) => {
          if (err) {

            //Foutief token, ga naar error endpoint
            next(new ApiError(err.message || err, 401))
          } else {

          //krijg de parameters van het request
          let huisId = Number(req.params.huisId)
          let maaltijdId = Number(req.params.maaltijdId)

          try {

            //controleer of de parameters een getal zijn
            assert(typeof (huisId) === 'number', 'het id van het huis moet een getal zijn..')
            assert(!isNaN(huisId), 'het id van het huis moet een getal zijn.')
            assert(typeof (maaltijdId) === 'number', 'het id van de maaltijd moet een getal zijn..')
            assert(!isNaN(maaltijdId), 'het id van de maaltijd moet een getal zijn.')

          } catch (ex) {

            //Als een parameter geen nummer is stuur dan een api error naar next
            next(new ApiError(ex.toString(), 412))
            return
          }

          //maak een query aan om te kijken of een maaltijd met het maaltijdId bestaat bij het studentenhuis met het studentenhuisId
          let selectQuery = {
            sql: "SELECT * FROM maaltijd WHERE StudentenHuisId = ? AND ID = ?",
            values: [huisId, maaltijdId],
            timeout: 2000
          }

          //voer de query uit
          db.query(selectQuery, (error, rows, fields) => {
            if (error) {
              //Als er een error is stuur een api error naar next
              next(new ApiError(error, 422))
            } else {

              //Check of de query resultaat heeft
              if (rows.length === 0){

                //Als het resultaat leeg is bestaat het studentenhuis voor dat nummer dus niet
                next(new ApiError("Er is geen studentenhuis met het opgegeven studentenhuisId of er is geen maaltijd met het opgegeven maaltijdId", 404));
                console.log("en door")
              }else {
                let userId = rows[0].UserID

                if (userId !== payload.sub.id){
                  next(new ApiError("De ingelogde gebruiker heeft geen rechten op deze maaltijd", 409));
                }else {
                  //Maak een nieuwe query aan om de bestaande maaltijd te vervangen door  de database te stoppen
                  let updateQuery = {
                    sql: "DELETE FROM maaltijd WHERE StudentenhuisId = ? AND ID = ?",
                    values: [
                      huisId,
                      maaltijdId
                    ],
                    timeout: 2000
                  }

                  //voer de query uit
                  db.query(updateQuery, (error, rows, fields) => {
                    if (error) {
                      //Als er een error is stuur een api error naar next
                      next(new ApiError(error, 422))
                    } else {
                      //Maak een nieuwe response aan van hetgene wat er in de database is gestopt
                      res.status(200).json({"Status": "succesfully deleted"}).end()
                    }
                  })
                }
              }
            }
          })
        }
      })
    },
}
