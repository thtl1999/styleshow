var express = require('express');
var app = express();
var mysqlDB = require('./mysql-db');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var html_dir = './views/';
app.use(bodyParser.json());


module.exports = function (app) {
   
    app.get('/register',function (req,res){

        console.log('register GET ' );
        res.sendfile( html_dir + 'register.html');

    });

    app.get('/login',function (req,res){

        console.log('login GET ' );
        res.sendfile( html_dir + 'login.html');

    });

    app.post('/register/regist', function (req, res, next) {

          var id = req.body.UID;
        var password = req.body.pwd;
        var name = req.body.name;
        var phone= req.body.phone;
        var email = req.body.id;
        logUser(name, password, id, phone);
        console.log("regist start");
     function logUser(name, pw, id,phone) {
        //var UID = uid;
        var Name = "Blank";
        var PW = "hidden";
        var Nickname = name;
        var Page_url = "Blank";
        var Email = email;
        var Address = "Blank";
        var Phone_num = phone;
        var Bdate = '0000-00-00';
        var Gender = '-';
        var Id = id;
        var Img_url = "Blank";
        var string;
        console.log(Name);
        console.log(id);
        mysqlDB.query('insert into User (Name,PW,Nickname,Page_url,Email,Address,Phone_num,Bdate,Gender,Id,Img_url) values ( \'' + Name + '\' ,\'' + PW + '\',\'' + Nickname + '\',\'' + Page_url + '\',\'' + Email + '\',\'' + Address + '\',\'' + Phone_num + '\',\'' + Bdate + '\',\'' + Gender + '\',\'' + Id + '\',\'' + Img_url + '\')', function (err, rows, fields) {
            if (!err) {
                console.log('New User Register Success');
                res.redirect('/');
            }

            else {
                console.log(err.message);
                res.send('<script type="text/javascript">alert("' + err.message + ' Please retry");window.location.href = "/register";</script>');
            }
        });


        
        //var ref = firebaseDatabase.ref("users/"+userInfo.uid); 
        //res.send(string);
        //alert("Sign Up Success");
        //window.location.href = "/login.html"
    }
    
   });
};