//Deelnemer class
class Deelnemer {

    //Constructor voor JSON Bericht gegevens
    constructor(huisId, maaltijdId){

        //Testen
        try {
            assert(typeof (huisId) === 'number', 'huisId must be a number.')
            assert(!isNaN(huisId), 'huisId must be a number.')
            assert(typeof (maaltijdId) === 'number', 'maaltijdId must be a number.')
            assert(!isNaN(maaltijdId), 'maaltijdId must be a number.')
        }
    
        catch (ex) {
            next(new ApiError(ex.toString(), 412))
            return
        }

        this.huisId = huisId;
        this.maaltijdId = maaltijdId;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = Deelnemer;
