var express = require("express");
var path = require('path');
var app = express();
var router = express.Router();
var mysqlDB = require('./sql/mysql-db');
var http = require('http').Server(app);
var fs = require('fs');
var url = require('url');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var session = require('express-session'); // ejs


//mysqlDB.connect();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//ejs
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


router = require('./sql/home')(app, fs);
// ejs

app.use(express.static('views'));	//users can read inside views folder
app.use('/general', express.static('views'));	//if in 'general.html', redirect to 'views'
app.use('/profile', express.static('views'));
//app.use ('/like',express.static('views'));
var html_dir = './views/';
app.use('/uploads', express.static('uploads'));	//if there is '/uploads' dir, redirect to node's
app.use('/generaltestforejs', express.static('views'));//new code

//html functions
require('./sql/firsttest')(app);	//sqltest.html get /firsttest/:name
require('./sql/fileupload')(app);	//fileuploadtest.html get /upload, post /upload
require('./sql/general')(app);		//general.html get /general/:id
//require('./sql/home')(app);		//homepage.html get /
require('./sql/sqlreadtest')(app);	//get /sqlread
require('./sql/registertest')(app);	//get /register
require('./sql/profilemodify')(app,fs);	//get/profileModify
require('./sql/upload')(app,fs);	//upload.html get/uploadtest post/uploadcontent
require('./sql/generaltest')(app);

require('./sql/ejs')(app,mysqlDB);	 //new code

require('./sql/chat')(io);
//listen
http.timeout = 0;
http.listen(8082,function () {
  console.log('Example app listening on port 8082!')
})









