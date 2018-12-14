var mysqlDB = require('./mysql-db');
var mysql      = require('mysql');
var firebase = require("./firebase");
module.exports = function (app,fs) {
  //  app.get('/profile/' + UID, function (req, res) {
    app.get('/follow/:uid;', function (req, res) {
        //res.sendfile( html_dir + 'profile.html');
        var uid = req.params.uid; // followee's uid
        //var my_uid = userSessionCheck();
        var my_uid = req.session.UID; // follower's uid
        var my_nick = req.session.Nickname; // follower's nick
        var follow =0;

        console.log(my_uid);
        console.log("uid : ",uid);

        mysqlDB.query("SELECT * FROM User where UID=\'"+uid+"\'",function(err,rows){
          if(err) throw err;

          var nick = rows[0].Nickname; // followee's nick

          var sql = "SELECT * FROM Follower where Follower=\'"+uid+"\'";
          var sql1 = "delete from Follower where FUID = \'"+my_uid+"\' and Follower = \'"+uid+"\'";
          var sql2 = "insert into Follower (FUID, Follower, Fnick) value (\'" + my_uid + "\',\'"+uid+"\',\'"+nick+"\')";


        if (!req.session.UID){
          res.send('<script type="text/javascript">alert("로그인 해주세요");</script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8081/login"</script>');
        }else{
          console.log("y");
          mysqlDB.query(sql,function(err,rows){
            if(err) throw err;

            console.log(rows);
            for(var i=0; i<rows.length; i++){
              if(rows[i].FUID == my_uid){
                //follower에 my_uid 존재 -> unfollow함
                follow =1;
                break;
              }
            }

            console.log(follow);
            if (follow == 0){
              //follower에 my_uid존재안함 -> follow
              mysqlDB.query(sql2, function(err,rows){
              if(err) throw err;
              console.log("y");
              res.send('<script type="text/javascript">alert("이 사용자를 구독합니다");</script></script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8081/profile/' + uid + ';' + '"</script>');
            });
          }else {
            mysqlDB.query(sql1,function(err,rows){
            if(err) throw err;

            console.log("y");
            res.send('<script type="text/javascript">alert("구독을 취소합니다");</script></script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8081/profile/' + uid + ';' + '"</script>');
        });
      }
        });
      }
});
});
}
