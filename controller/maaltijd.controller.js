//
// CRUD operaties op maaltijd
//

//Haal alle benodigde bestanden op
const ApiError = require("../model/ApiError")
const assert = require("assert")
const db = require("../config/db")
const Maaltijd = require("../Model/Maaltijd")
const MaaltijdResponse = require("../Model/MaaltijdResponse")
module.exports = {

  maakNieuweMaaltijd(req, res, next) {

    //Krijg de body van het request en check de JSON
    try {
      assert(typeof req.body === "object", "request body must have an object.")
      assert(typeof req.body.naam === "string", "naam moet text zijn.")
      assert(typeof req.body.beschrijving === "string", "naam moet text zijn.")
      assert(typeof req.body.ingredienten === "string", "ingredienten moet text  zijn.")
      assert(typeof req.body.allergie === "string", "allergie moet text zijn.")
      assert(typeof req.body.prijs === "number", "prijs moet een getal zijn.")
    } catch (ex) {
      const error = new ApiError(ex.toString(), 422)
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

    //Maak een nieuwe query aan om de maaltijd in de database te stoppen
    let query = {
      sql: "INSERT INTO maaltijd VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        null,
        maaltijd.naam,
        maaltijd.beschrijving,
        maaltijd.ingredienten,
        maaltijd.allergie,
        maaltijd.prijs,
        1,
        1
      ],
      timeout: 2000
    }

    //voer de query uit
    db.query(query, (error, rows, fields) => {
      if (error) {
        //als er een error maak dan een api error aan en stuur die naar next
        next(new ApiError(error.toString(), 422))
      } else {
        //Maak een nieuwe response aan van hetgene wat er in de database is gestopt
        res
          .status(200)
          .json(
            new MaaltijdResponse(
              null,
              maaltijd.naam,
              maaltijd.beschrijving,
              maaltijd.ingredienten,
              maaltijd.allergie,
              maaltijd.prijs
            )
          )
          .end()
      }
    })
  },

  krijgMaaltijdenPerStudentenhuis(req, res, next) {

    //krijg de parameters van het request
    let huisId = Number(req.params.huisId)

    //controleer of de parameter een getal is
    try {
      assert(
        typeof huisId === "number", "het id van het huis moet een getal zijn.")
    } catch (ex) {
      //Als de parameter geen nummer is stuur dan een api error naar next
      const error = new ApiError(ex.toString(), 412)
      next(error)
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
      //Als er een error is stuur een api error naar next
      if (error) {
        next(new ApiError(error.toString(), 422))
      } else {
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
        res
          .status(200)
          .json(response)
          .end()
      }
    })
  },

  krijgMaaltijdPerStudentenhuis(req, res, next) {

    //krijg de parameters van het request
    let huisId = Number(req.params.huisId)
    let maaltijdId = Number(req.params.maaltijdId)

    //controleer of de parameters een getal zijn
    try {
      assert(
        typeof huisId === "number",
        "het id van het huis moet een getal zijn."
      )
      assert(
        typeof maaltijdId === "number",
        "het id van de maaltijd moet een getal zijn."
      )
    } catch (ex) {
      //Als een parameter geen nummer is stuur dan een api error naar next
      const error = new ApiError(ex.toString(), 412)
      next(error)
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
        res
          .status(200)
          .json(response)
          .end()
      }
    })
  },

  vervangMaaltijd(req, res, next) {

    //krijg de parameters van het request
    let huisId = Number(req.params.huisId)
    let maaltijdId = Number(req.params.maaltijdId)

    //controleer of de parameters een getal zijn
    try {
      assert(
        typeof huisId === "number",
        "het id van het huis moet een getal zijn."
      )
      assert(
        typeof maaltijdId === "number",
        "het id van de maaltijd moet een getal zijn."
      )
    } catch (ex) {
      //Als een parameter geen nummer is stuur dan een api error naar next
      const error = new ApiError(ex.toString(), 412)
      next(error)
      return
    }

    //Krijg de body van het request en check de JSON
    try {
      assert(
        typeof req.body === "object",
        "request body must have an object."
      )
      assert(typeof req.body.naam === "string", "naam moet text zijn.")
      assert(
        typeof req.body.beschrijving === "string",
        "naam moet text zijn."
      )
      assert(
        typeof req.body.ingredienten === "string",
        "ingredienten moet text  zijn."
      )
      assert(
        typeof req.body.allergie === "string",
        "allergie moet text zijn."
      )
      assert(
        typeof req.body.prijs === "number",
        "prijs moet een getal zijn."
      )
    } catch (ex) {

      //Als er een error is stuur een api error naar next
      const error = new ApiError(ex.toString(), 422)
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

    //Maak een nieuwe query aan om de bestaande maaltijd te vervangen door  de database te stoppen
    let query = {
      sql:
        "UPDATE maaltijd set Naam = ?, Beschrijving = ?, Ingredienten = ?, Allergie = ?, Prijs = ? WHERE StudentenhuisId = ? AND ID = ?",
      values: [
        maaltijd.naam,
        maaltijd.beschrijving,
        maaltijd.ingredienten,
        maaltijd.allergie,
        maaltijd.prijs,
        maaltijdId,
        huisId
      ],
      timeout: 2000
    }

    //voer de query uit
    db.query(query, (error, rows, fields) => {
      if (error) {

        //Als er een error is stuur een api error naar next
        next(new ApiError(error.toString(), 422))
      } else {

        //Maak een nieuwe response aan van hetgene wat er in de database is gestopt
        res
          .status(200)
          .json(
            new MaaltijdResponse(
              null,
              maaltijd.naam,
              maaltijd.beschrijving,
              maaltijd.ingredienten,
              maaltijd.allergie,
              maaltijd.prijs
            )
          )
          .end()
      }
    })
  },

  verwijderMaaltijd(req, res, next) {
    //krijg de parameters van het request
    let huisId = Number(req.params.huisId)
    let maaltijdId = Number(req.params.maaltijdId)

    //controleer of de parameters een getal zijn
    try {
      assert(
        typeof huisId === "number",
        "het id van het huis moet een getal zijn."
      )
      assert(
        typeof maaltijdId === "number",
        "het id van de maaltijd moet een getal zijn."
      )
    } catch (ex) {

      //Als een parameter geen nummer is stuur dan een api error naar next
      next(new ApiError(ex.toString(), 412))
      return
    }

    //Maak een nieuwe query aan om de bestaande maaltijd op te vragen voordat die verwijderd is
    let selectQuery = {
      sql: "SELECT (ID, UserID) FROM maaltijd WHERE StudentenHuisId = ? AND ID = ?",
      values: [huisId, maaltijdId],
      timeout: 2000
    }

    //Maak een nieuw object aan waar alle resultaten van de query in worden gezet
    let selectResponse
    //voer de query uit
    db.query(selectQuery, (error, rows, fields) => {
      if (error) {

        //Als er een error is stuur een api error naar next
        next(new ApiError(error.toString(), 422))

      } else {
        rows.forEach(row => {
          //Maak voor elke maaltijd een nieuwe maaltijd response aan en zet hem in de array
          selectResponse = {
              id: row.ID,
              userID: row.UserID
            }
        })
          //res.status(200).json(selectResponse).end()
      }
    })

    console.console.log(selectResponse.id)

    /*

    //Haal het id uit de Payload op
    //Token decoderen
    let userId
    authentication.decodeToken(token, (err, payload) => {

      if (err) {

        //Foutief token, ga naar error endpoint
        next(new ApiError(err.message || err, 401))

      } else {
        userId = payload.sub.id
      }
    })

    //Check of het id van de maaltijd bestaat en of de gebruiker toegang heeft tot die maaltijdId

    try {
      assert(selectResponse.id === maaltijdId, "het id van de maaltijd moet bestaan.")
      assert(selectResponse.userID === userId,"het id van de maaltijd moet een getal zijn.")
    } catch (ex) {

      //Als een parameter geen nummer is stuur dan een api error naar next
      const error = new ApiError(ex.toString(), 412)
      next(error)
      return
    }

    //Maak een nieuwe query aan om de bestaande maaltijd te verwijderen
    let deleteQuery = {
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

        //Maak een nieuwe response aan van hetgene wat er in de database is gestopt
        res.status(200).json("hoi").end()
      }
    })


    */
  }
}
