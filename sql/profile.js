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
        //var my_uid = userSessionCheck();
        var my_uid = req.session.UID;
        var my_nick = req.session.Nickname;
        console.log(my_uid);
        console.log(my_nick);

        console.log("uid : ",uid);
        var sql = "SELECT * FROM User where UID=\'"+uid+"\'";
        var sql1 = "SELECT * FROM Contents WHERE CUID=\'"+uid+"\' ORDER BY Views DESC limit 0, 1";
        var sql2 = "SELECT * FROM Contents WHERE CUID=\'"+uid+"\' ORDER BY Insertdate DESC limit 0, 8";

        mysqlDB.query(sql,function(err,rows){
          if(err) throw err;
          //console.log(rows);

          var nickname = rows[0].Nickname;
          var email = rows[0].Email;
          var user_img = rows[0].Img_url;
          console.log(rows[0].Nickname, rows[0].Email, rows[0].Img_url)
          console.log(nickname,email,user_img);


        mysqlDB.query(sql1,function(err,rows){
          if(err) throw err;
          if(rows[0]==undefined) title_best = "컨텐츠가 존재하지 않습니다.";
          else {
            console.log(rows);
            //type_best = rows[0]['Type'];
            var title_best = rows[0].Title;
            var img_best = '../uploads/' + rows[0].thumbnail;
            var view_best = rows[0].Views;
            if(view_best==null) view_best ='0';
            var date_best = rows[0].Insertdate;
            var con_best = rows[0].CID;
          }

          console.log(title_best, img_best, view_best, date_best);

        mysqlDB.query(sql2, function(err, rows){
          if(err) throw err;
          //console.log(rows2);
          for(var i=0; i<rows.length; i++)
          {
            //type[i] = rows[i]['Type'];
            if(rows[i]==undefined) {
              title[i] = "컨텐츠가 존재하지 않습니다.";
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

        mysqlDB.query("SELECT * FROM Follower WHERE FUID=1",function(err,rows){
          if(err) throw err;

          var follow_num = rows.length;
          var follow ="구독하기";

          for(var i=0; i<follow_num; i++)
          {
            if(rows[i]['Follower']== my_uid){
              follow = "구독 끊기";
            }
          }
        res.render('profile',{
          My_nick : my_nick,
          My_uid : my_uid,
          Uid : uid,
          Title : title,
          //Type : type,
          Img : img,
          View : view,
          Date : date,
          Title_best : title_best,
          //Type_best : type_best,
          Img_best : img_best,
          View_best : view_best,
          Date_best : date_best,
          Con_best : con_best,
          Nickname : nickname,
          Email : email,
          User_img : user_img,
          Follow_num : follow_num,
          Follow : follow,
          Con : con
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
