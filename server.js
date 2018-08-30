var env = process.env.NODE_ENV || 'development';
var express = require('express');
var app = express();
var morgan = require('morgan');
var config = require('./app/config')[env]; // get our config file
var apiName = config.api.name;
var apiVersion = config.api.version;
var apiUrl = '/' + apiName + '/' + apiVersion

var transactions = require('./app/routes/transactions');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || config.port;

// use morgan to log requests to the console
app.use(morgan('dev'));

// Enabling CORS on ExpressJS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// =======================
// routes ================
// =======================
// basic route
app.use(apiUrl + '/transactions', transactions)

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);