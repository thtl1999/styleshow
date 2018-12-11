//var mysql = require('mysql');
var firebase = require("./firebase");

firebaseEmailAuth = firebase.auth();

module.exports = function (app, mysqlDB, session) {
    app.post('/getLoginUser', function (req, res, next) {
        var id = req.body.data;
        var test = userSessionCheck();
        console.log("test = " + test);
        console.log("start");
        var userdatas;
        console.log('Get User table from DB');
        console.log(id);
        if(id)
        {
            var sql = 'SELECT * FROM User where Id = \''+id+'\'';
			var arr = new Array();
			var arr2 = new Array();
			var arr3 = new Array();
			var i;

            mysqlDB.query(sql, function (err, rows) {

                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                else {
					var UID = rows[0].UID;
                    var pwd = rows[0].Pw;
                    var Id = rows[0].Id;
                    var Nickname = rows[0].Nickname;
                    var Mail = rows[0].Email;
                    var Address = rows[0].Address;
                    var Phone = rows[0].Phone_num;
                    var Bdate = rows[0].Bdate;
                    var Gender = rows[0].Gender;
                    var Name = rows[0].Name;
					 
					mysqlDB.query('select * from Follower where FUID = \'' + UID + '\'', function (err, rows) {										
						if (err) {
							console.log('[SELECT ERROR] - ', err.message);
						}
						else{
							//console.log(UID);
							for(i=0; i<rows.length; i++)
							{
								arr[i] = rows[i].FUID;  
								arr2[i] = rows[i].Follower;
								arr3[i] = rows[i].Fnick;
							}
							userdatas = {

								UID: UID,
								pwd: pwd,
								Id: Id,
								Nickname: Nickname,
								Mail: Mail,
								Address: Address,
								Phone: Phone,
								Bdate: Bdate,
								Gender: Gender,
								Name: Name,
								FUID: arr,
								Follower: arr2,
								Fnick: arr3,
								Length: i

							};
							
							req.session.UID = UID;
							req.session.Id = Id;
							req.session.Nickname = Nickname;
							
									 
							
								//console.log(arr);
							
							res.json(userdatas);	
							//console.log(userdatas);
						}
					});         
                }
            });

       
        }//end if
        else
        {
            userdatas = {

                UID:null,
                pwd: null,
                Id: null,
                Nickname: null,
                Mail: null,
                Address: null,
                Phone: null,
                Bdate: null,
                Gender: null,
                Name: null

            }
            console.log(userdatas);
            res.json(userdatas);
        }
    });
}
function userSessionCheck() {
    var id = null;
    
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('There are user ' + user.uid+'login');
        id = user.uid;
            
        // User is signed in.
    } else {
        console.log("No User on Login State");
    }
    });
    return id;
}
