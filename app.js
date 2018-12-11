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
var cookieParser = require("cookie-parser");
app.use(cookieParser());




var GUD = 0;
//var ejs = require('ejs');


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
app.use('/content', express.static('views'));//new code
app.use('/search', express.static('views'));//new code
app.use('/content/uploads', express.static('uploads'));

//html functions
require('./sql/firsttest')(app);	//sqltest.html get /firsttest/:name
//require('./sql/fileupload')(app);	//fileuploadtest.html get /upload, post /upload
require('./sql/general')(app);		//general.html get /general/:id
//require('./sql/home')(app);		//homepage.html get /
require('./sql/sqlreadtest')(app);	//get /sqlread
require('./sql/registertest')(app);	//get /register
require('./sql/getUserInfo')(app, mysqlDB);	//get/profileModify
require('./sql/profilemodify')(app,fs);	//get/profileModify
require('./sql/upload')(app,fs);	//upload.html get/upload post/uploadcontent
require('./sql/content')(app,mysqlDB);
//require('./sql/generaltest')(app);
require('./sql/profile')(app,fs); 
require('./sql/search')(app,mysqlDB);
require('./sql/like')(app,mysqlDB);
//require('./sql/like')(app,fs);
//html functions


//chat function
require('./sql/chat')(io);


//listen
http.timeout = 0;
http.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})
