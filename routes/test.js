const routes = require('express').Router();
const studentenhuisController = require('../controller/studentenhuis.controller.js')


routes.get('/', (req, res, next) => {
  res.status(200).json("hallo").end()
})
module.exports = routes
