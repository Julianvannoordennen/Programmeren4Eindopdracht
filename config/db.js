//MYSQL Library inladen
const mysql = require('mysql');

//Verbindingsarray maken
var connectionData = {
    host: process.env.DB_HOST || config.dbHost,
    user: process.env.DB_USER || config.dbUser,
    password: process.env.DB_PASSWORD || config.dbPassword,
    database: process.env.DB_DATABASE || config.dbDatabase
};

//Verbinding opzetten d.m.v. omgevingsvariabelen
const connection = mysql.createConnection(connectionData);

//Verbinden
connection.connect((error) => {

    //Controleren op fouten
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Connected to " + connectionData.host + ":" + connectionData.database);
    }
});

//Connectie beschikbaar maken
module.exports = connection;
/*
//
// ./config/connection.js
//
// Configuratiebestand voor MySql database.
//
//MYSQL Library inladen

var mysql = require('mysql');
var config = require('../config/config');

const connectionSettings = {
    host: process.env.DB_HOST || config.dbHost,
    user: process.env.DB_USER || config.dbUser,
    password: process.env.DB_PASSWORD || config.dbPassword,
    database: process.env.DB_DATABASE || config.dbDatabase,
    port: 3306,
    debug: false
}
const reconnectTimeout = 2000; // ms.

var connection;

// http://sudoall.com/node-js-handling-mysql-disconnects/
function handleDisconnect() {
    connection = mysql.createConnection(connectionSettings);

    connection.connect(function (error) {
        if (error) {
            console.error('Error connecting to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message);
            connection.end();
            setTimeout(handleDisconnect, reconnectTimeout);
        } else {
            console.log('Connected to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ', state = ' + connection.state);
        }
    });
    connection.on('error', function (error) {
        if (error.code === 'ECONNRESET') {
            console.error('Connection state = ' + connection.state + ' - reconnecting');
            connection.end();
            handleDisconnect();
        } else {
            console.error('Connection ERROR - database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message);
            connection.end();
            handleDisconnect();
        }
    });
}

handleDisconnect();

module.exports = connection;
*/
