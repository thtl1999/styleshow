var express = require('express');
var app = express();
var mysqlDB = require('./mysql-db');
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

exports.posttest = function (req, res, next) {
	console.log('yes');
};