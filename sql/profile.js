var mysqlDB = require('./mysql-db');
var mysql      = require('mysql');
var firebase = require("./firebase");
module.exports = function (app,fs) {
  //  app.get('/profile/' + UID, function (req, res) {
    app.get('/profile/:uid;', function (req, res) {
        //res.sendfile( html_dir + 'profile.html');
        var uid = req.params.uid;
        var type = new Array();
        var title = new Array();
        var img = new Array();
        var view = new Array();
        var date = new Array();
        var con = new Array();

		var type2 = new Array();
        var title2 = new Array();
        var img2 = new Array();
        var view2 = new Array();
        var date2 = new Array();
        var con2 = new Array();

		var type3 = new Array();
        var title3 = new Array();
        var img3 = new Array();
        var view3 = new Array();
        var date3 = new Array();
        var con3 = new Array();

		var type4 = new Array();
        var title4 = new Array();
        var img4 = new Array();
        var view4 = new Array();
        var date4 = new Array();
        var con4 = new Array();
        //var my_uid = userSessionCheck();
        var my_uid = req.session.UID;
        var my_nick = req.session.Nickname;
        console.log(my_uid);
        console.log(my_nick);
		var Picture = "Picture";
		var Video = "Video";
		var Streaming = "Streaming";

        console.log("uid : ",uid);
        var sql = "SELECT * FROM User where UID=\'"+uid+"\'";
        var sql1 = "SELECT * FROM Contents WHERE CUID=\'"+uid+"\' ORDER BY Views DESC limit 0, 1";
        var sql2 = "SELECT * FROM Contents WHERE CUID=\'"+uid+"\' ORDER BY Insertdate DESC limit 0, 8";
		var sql3 = "SELECT * FROM Contents WHERE CUID = \'"+uid+"\' AND Type = \'"+Picture+"\' ORDER BY Insertdate DESC limit 0, 8";
		var sql4 = "SELECT * FROM Contents WHERE CUID = \'"+uid+"\' AND Type = \'"+Video+"\' ORDER BY Insertdate DESC limit 0, 8";
		var sql5 = "SELECT * FROM Contents WHERE CUID = \'"+uid+"\' AND Type = \'"+Streaming+"\' ORDER BY Insertdate DESC limit 0, 8";

        mysqlDB.query(sql,function(err,rows){
          if(err) throw err;
          //console.log(rows);

          var nickname = rows[0].Nickname;
		  var name = rows[0].Name;
		  var address = rows[0].Address;
		  var birthday = rows[0].Bdate;
          var email = rows[0].Email;
          var user_img = rows[0].Img_url;
          console.log(rows[0].Nickname, rows[0].Email, rows[0].Img_url)
          console.log(nickname,email,user_img);


        mysqlDB.query(sql1,function(err,rows){
          if(err) throw err;
          if (rows[0] == undefined) {
              title_best = "컨텐츠가 존재하지 않습니다.";
              img_best = '../uploads/basic_contents.png';
          }
          else {
              console.log(rows);
              //type_best = rows[0]['Type'];
              var title_best = rows[0].Title;
              var img_best = '../uploads/' + rows[0].thumbnail;
              var view_best = rows[0].Views;
              if (view_best == null) view_best = '0';
              var date_best = rows[0].Insertdate;
              var con_best = rows[0].CID;
			  var con_context = rows[0].text;
			  var con_product = rows[0].html;
          }

          console.log(title_best, img_best, view_best, date_best);

        mysqlDB.query(sql2, function(err, rows){
          if(err) throw err;
          //console.log(rows2);
          for(var i=0; i<rows.length; i++)
          {
            //type[i] = rows[i]['Type'];
              if (rows[i] == undefined) {
                  for (var i = j; j < 8; j++) {
                      title[j] = "컨텐츠가 존재하지 않습니다.";
                      img[j] = '../uploads/basic_contents.png';
                  }
            }
            else{
              title[i] = rows[i]['Title'];
              img[i] = '../uploads/' + rows[i]['thumbnail'];
              view[i] = rows[i]['Views'];
              if(view[i]==null) view[i]='0';
              date[i] = rows[i]['Insertdate'];
              con[i] = rows[i]['CID'];
              console.log(title[i],img[i],view[i],date[i],con_best[i]);
            }
          }
          if (rows.length < 8) {
              for (var j = rows.length; j < 8; j++) {
                  title[j] = "컨텐츠가 존재하지 않습니다.";
                  img[j] = '../uploads/basic_contents.png';
              }
          }
        mysqlDB.query("SELECT * FROM Follower WHERE FUID=\'" + my_uid + "\'",function(err,rows){
          if(err) throw err;
		  var followee = rows.length;
          var follow ="구독하기";

          console.log(rows);

          for(var i=0; i<followee; i++)
          {
            if(rows[i]['Follower']== uid){
              follow = "구독 끊기";
            }
          }
			mysqlDB.query(sql3,function(err,rows){
				  if(err) throw err;

				  for(var i=0; i<rows.length; i++)
				  {
					//type[i] = rows[i]['Type'];
					  if (rows[i] == undefined) {
						  for (var i = j; j < 8; j++) {
							  title2[j] = "컨텐츠가 존재하지 않습니다.";
							  img2[j] = '../uploads/basic_contents.png';
						  }
					}
					else{
					  title2[i] = rows[i]['Title'];
					  img2[i] = '../uploads/' + rows[i]['thumbnail'];
					  view2[i] = rows[i]['Views'];
					  if(view2[i]==null) view[i]='0';
					  date2[i] = rows[i]['Insertdate'];
					  con2[i] = rows[i]['CID'];
					}
				  }
				  if (rows.length < 8) {
					  for (var j = rows.length; j < 8; j++) {
						  title2[j] = "컨텐츠가 존재하지 않습니다.";
						  img2[j] = '../uploads/basic_contents.png';
					  }
				  }
					mysqlDB.query(sql4,function(err,rows){
						  if(err) throw err;

						  for(var i=0; i<rows.length; i++)
						  {
							//type[i] = rows[i]['Type'];
							  if (rows[i] == undefined) {
								  for (var i = j; j < 8; j++) {
									  title3[j] = "컨텐츠가 존재하지 않습니다.";
									  img3[j] = '../uploads/basic_contents.png';
								  }
							}
							else{
							  title3[i] = rows[i]['Title'];
							  img3[i] = '../uploads/' + rows[i]['thumbnail'];
							  view3[i] = rows[i]['Views'];
							  if(view3[i]==null) view[i]='0';
							  date3[i] = rows[i]['Insertdate'];
							  con3[i] = rows[i]['CID'];
							}
						  }
						  if (rows.length < 8) {
							  for (var j = rows.length; j < 8; j++) {
								  title3[j] = "컨텐츠가 존재하지 않습니다.";
								  img3[j] = '../uploads/basic_contents.png';
							  }
						  }
						  mysqlDB.query(sql5,function(err,rows){
						  if(err) throw err;

						  for(var i=0; i<rows.length; i++)
						  {
							//type[i] = rows[i]['Type'];
							  if (rows[i] == undefined) {
								  for (var i = j; j < 8; j++) {
									  title4[j] = "컨텐츠가 존재하지 않습니다.";
									  img4[j] = '../uploads/basic_contents.png';
								  }
							}
							else{
							  title4[i] = rows[i]['Title'];
							  img4[i] = '../uploads/' + rows[i]['thumbnail'];
							  view4[i] = rows[i]['Views'];
							  if(view4[i]==null) view[i]='0';
							  date4[i] = rows[i]['Insertdate'];
							  con4[i] = rows[i]['CID'];
							}
						  }
						  if (rows.length < 8) {
							  for (var j = rows.length; j < 8; j++) {
								  title4[j] = "컨텐츠가 존재하지 않습니다.";
								  img4[j] = '../uploads/basic_contents.png';
							  }
						  }
						  mysqlDB.query("SELECT * FROM Follower WHERE Follower=\'" + uid + "\'",function(err,rows){
							  if(err) throw err;

							  var follow_num = rows.length;

							res.render('profile',{
							  My_nick : my_nick,
							  My_uid : my_uid,
							  Uid : uid,
							  Title : title,
							  Img : img,
							  View : view,
							  Date : date,
							  Con : con,
							  Title2 : title2,
							  Img2 : img2,
							  View2 : view2,
							  Date2 : date2,
							  Con2 : con2,
							  Title3 : title3,
							  Img3 : img3,
							  View3 : view3,
							  Date3 : date3,
							  Con3 : con3,
							  Title4 : title4,
							  Img4 : img4,
							  View4 : view4,
							  Date4 : date4,
							  Con4 : con4,
							  Title_best : title_best,
							  //Type_best : type_best,
							  Img_best : img_best,
							  View_best : view_best,
							  Date_best : date_best,
							  Con_best : con_best,
							  Name : name,
							  Address : address,
							  Bdate : birthday,
							  Nickname : nickname,
							  Email : email,
							  User_img : user_img,
							  Follow_num : follow_num,
							  Follow : follow,
							  Contextdata : con_context,
							  Productdata : con_product
							});
						  });
					  });
				  });
			  });
		  });
      });
    });
  });
});
}
/*
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
*/
