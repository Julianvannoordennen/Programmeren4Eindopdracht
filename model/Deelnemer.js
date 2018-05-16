//Deelnemer class
class Deelnemer {

    //Constructor voor JSON Bericht gegevens
    constructor(huisId, maaltijdId){
        this.huisId = huisId;
        this.maaltijdId = maaltijdId;
    }
}

//Exporteren voor gebruik bij andere files
module.exports = Deelnemer;
