"use strict"
//Actual Server code
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

//for extracting post parameters
app.use(bodyParser.urlencoded({extended : true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(morgan('dev')); //use the new format

app.use('/js', express.static(__dirname + "/web/js"));
app.use('/web', express.static(__dirname + "/web/html"));
app.use('/css', express.static(__dirname + "/web/css"));

var apiRouter = require('./api/api.js').router;
app.use('/api', apiRouter);

app.listen(8002);
console.log("Server listening on port 8002");