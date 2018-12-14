//var html_dir = './views/';

//module.exports = function(app){
//app.get('/profilemodify',function (req,res,next){
//	console.log('profilemodify GET ' );
//	res.sendfile( html_dir + 'profileModify.html');
//});
var mysqlDB = require('./mysql-db');
//};

var firebase = require("./firebase");
var html_dir = './views/';
var mysql      = require('mysql');


module.exports = function(app,fs){
//1
app.get('/profilemodify',function (req,res,next){
    var testid = userSessionCheck();
    console.log("id = " + testid);
	console.log('profilemodify GET ' );
	var user_name = req.body['name'];
	console.log(user_name);

		var user_info=[];
		console.log('y');

		var sql = 'SELECT * FROM User';

			mysqlDB.query(sql,function (err, rows) {
		        if(err){
		       console.log('[SELECT ERROR] - ',err.message);
		      return;}

		       for(var i=0; i < rows.length; i++) {
		      user_info[i] = {
		        id: rows[i].Id,
		        Nickname: rows[i].Nickname
		      }
			   }
			  console.log(user_info[2]);
			});

	res.sendfile( html_dir + 'profileModify.html');
//	var userId = req.body['mail'];


});

	//2
	app.post('/profilemodify/productList',function (req,res,next){

		var datas=[];
		console.log('product GET ' );



	var  sql = 'SELECT * FROM Contents WHERE CUID = "' + req.session.UID + '"';

	mysqlDB.query(sql,function (err, rows) {
        if(err){
       console.log('[SELECT ERROR] - ',err.message);
      return;}

       for(var i=0; i < rows.length; i++) {
      datas[i] = {
        CID: rows[i].CID,
        Views: '../uploads/' + rows[i]['thumbnail'],
        Type: rows[i].Type,
		  Title:rows[i].Title,
		  Page_url:rows[i].Page_url

      }
	   }
	  console.log(datas[0]);
	  res.json(datas);
	  console.log(datas[0]);
       //console.log(result);

});


//res.sendfile( html_dir + 'profileModify.html');
		//res.json([{"CID":"1","Type":"video","Title":"title for test1111111111111111111111111111111111111","Views":"clothes.png","Page_url":"Unknown"}]);
	//res.send('[{"CID":"1","Type":"video","Title":"title for test1111111111111111111111111111111111111","Views":"clothes.png","Page_url":"Unknown"}]');

});

    //3
	app.post('/profilemodify/getUser', function (req, res, next) {

	    var userdatas = [];
	    console.log('Get User table from DB');
	   


	    var sql = 'SELECT * FROM User';

	    mysqlDB.query(sql, function (err, rows) {
	        if (err) {
	            console.log('[SELECT ERROR] - ', err.message);
	            return;
	        }

	        for (var i = 0; i < rows.length; i++) {
	            userdatas[i] = {

	                UID: rows[i].UID,

	                pwd: rows[i].Pw,
	                Id: rows[i].Id,
	                Nickname: rows[i].Nickname,
	                Mail: rows[i].Email,
	                Address: rows[i].Address,
	                Phone: rows[i].Phone_num,
	                Bdate: rows[i].Bdate,
	                Gender: rows[i].Gender,
	                Name: rows[i].Name

	            }
	        }
	        console.log(userdatas[0]);
	        res.json(userdatas);
	        console.log(userdatas[0]);
	        //console.log(result);

	    });

	});
    //4
	app.post('/profilemodify/modify', function (req, res) {

	    var field = ['Nickname',  'Email', 'Address', 'Phone_num', 'Bdate', 'Gender'];

	    var UID = req.body.UID;
	    console.log('modify user information ' + UID);

	    for (var i = 0; i < field.length; i++) {
	        
	        var sql;
	        switch (i) {
	            case 0:sql = 'update User set ' + field[i] + "= \'" +req.body.Nickname+"\' where UID = \'" + UID + "\'";break;
	            case 1: sql = 'update User set ' + field[i] + "= \'" + req.body.Email + "\' where UID = \'" + UID + "\'"; break;
	            case 2: sql = 'update User set ' + field[i] + "= \' " + req.body.Address + "\' where UID = \'" + UID + "\'"; break;
	            case 3: sql = 'update User set ' + field[i] + "= \' " + req.body.Phone + "\' where UID = \'" + UID + "\'"; break;
	            case 4: sql = 'update User set ' + field[i] + "= \' " + req.body.Badate + " \' where UID = \'" + UID + "\'"; break;
	            case 5: sql = 'update User set ' + field[i] + "= \' " + req.body.Gender + " \' where UID = \'" + UID + "\'"; break;
	        }
	        console.log(sql);

	        mysqlDB.query(sql, function (err) {
	            if (err) {
	                console.log(field[i] + 'ERROR - ', err.message);
	                return;
	            }
	            else{
	           
	                console.log(field[i] + 'is updated');
	            }
	           
	            //console.log(result);

	        });

	    };
	    res.redirect("/profilemodify");
	});


	app.post('/profilemodify/delete', function (req, res) {
	    var cid = req.body.delete_cid;
	    var sql = 'DELETE FROM Contents WHERE CID = "' +cid +'"' ;
	    console.log("SQL : " + sql);
	    mysqlDB.query(sql, function (err, rows) {
	        if (err) {
	            console.log('[SELECT ERROR] - ', err.message);
	            res.json({ result: 'fail' });
	        }
	        else
	        {
	            console.log("success : Delete " + cid);
	            
	            res.json({ result: 'Success' });
	        }
	        //console.log(result);

	    });
	    
	});
};
function userSessionCheck() {
    var id = null;

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('There are user ' + user.uid + 'login');
            id = user.uid;

            // User is signed in.
        } else {
            console.log("No User on Login State");
        }
    });
    return id;
}
