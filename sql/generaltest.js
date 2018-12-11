var express = require('express');
var app = express();
var mysqlDB = require('./mysql-db');
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//document.write("<script src='https://www.gstatic.com/firebasejs/4.10.1/firebase.js'></script>");


module.exports = function (app) {
    app.post('/like', function (req, res, next) {
        var Like=req.body.like;
        var Dislike=req.body.dislike;
		var cuid='1';
		var Views=req.body.see;
        console.log('여기까지');
        generalUser(Like,Dislike,cuid,Views);

        console.log('요기까지');
    function generalUser(Like,Dislike,cuid,Views) {
        console.log('ok');
		//var cid=CID;
		var CUID = cuid;
        var liKe = Like;
        var disLike = Dislike;
		var views=Views;
		var Type='test';
        var page_URL='www.com';
        var Title = 'This is title';
        mysqlDB.query('insert into Contents (CUID,liKe,Type,Title) values ( \'' + CUID + '\' , \'' + liKe+ '\',\''+Type+'\',\''+Title+'\')', function (err,rows,fields) {
            if (!err) {
               console.log( 'Success');
			   
            }

            else {
                console.log(err.message);
            }
        });
        
        //var ref = firebaseDatabase.ref("users/"+userInfo.uid); 
        //res.send(string);
        //alert("Sign Up Success");
        //window.location.href = "/login.html"
    }
    
   });
};