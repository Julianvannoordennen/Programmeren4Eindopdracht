//NodeJS Plugins
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Project bestanden
const ApiError = require('./model/ApiError')
const settings = require('./config/config')
const AuthController = require('./controller/authentication.controller')
const authenticationRoutes = require('./routes/authentication.routes')
const deelnemerRoutes = require('./routes/deelnemer.routes')
const maaltijdRoutes = require('./routes/maaltijd.routes')
const studentenhuisRoutes = require('./routes/studentenhuis.routes')
const apiTest = require('./routes/test')

//Express laden
let app = express();

//Bodyparser parsed de body van een request
app.use(bodyParser.json());

//Installeer Morgan als logger
app.use(morgan("dev"));

//Deze routes mogen worden bereikt zonder Authenticatie
app.use('/api', authenticationRoutes)

//Authenticatie voor alle standaard endpoints
app.all('*', AuthController.validateToken);

//Standaard endpoints
app.use("/api/studentenhuis", deelnemerRoutes);
app.use("/api/studentenhuis", maaltijdRoutes);
app.use("/api/studentenhuis", studentenhuisRoutes);
app.use("/test", apiTest)

//Niet bestaande endpoint getriggerd
app.use("*", function(req, res, next) {
  const error = new ApiError("Deze endpoint bestaat niet", 404);
  next(error);
});

//Alle errors komen hier als APIError class
app.use((err, req, res, next) => {
  // console.dir(err)
  res
    .status(err.code || 404)
    .json(err)
    .send();
});

//Luisteren naar poort
app.listen(settings.webPort, () => {
});

//Exporteren voor Testcases
module.exports = app;
