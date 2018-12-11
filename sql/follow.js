var mysqlDB = require('./mysql-db');
var mysql      = require('mysql');
var firebase = require("./firebase");
module.exports = function (app,fs) {
  //  app.get('/profile/' + UID, function (req, res) {
    app.get('/follow/:uid;', function (req, res) {
        //res.sendfile( html_dir + 'profile.html');
        var uid = req.params.uid;
        //var my_uid = userSessionCheck();
        var my_uid = req.session.UID;
        var my_nick = req.session.Nickname;
        var follow =0;
        console.log(my_uid);
        console.log("uid : ",uid);

        if (!req.session.UID){
          res.send('<script type="text/javascript">alert("로그인 해주세요");</script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8082/login"</script>');
        }else{
          var sql = "SELECT * FROM Follower where FUID=\'"+uid+"\'";
          mysqlDB.query(sql,function(err,rows){
            if(err) throw err;

            for(var i=0; i<rows.length; i++){
              if(rows[i].Follower == my_uid){
                //follower에 my_uid 존재 -> unfollow함
                follow =1;


                res.send('<script type="text/javascript">alert("구독을 취소합니다");</script></script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8082/profile/' + uid + ';' + '"</script>');

              }
            }

            if (follow == 0){
              //follower에 my_uid존재안함 -> follow
              var sql2 = 'insert into Follower (FUID, Follower, Fnick) value (' + uid + ','+my_uid+','+my_nick+');';
              res.send('<script type="text/javascript">alert("이 사용자를 구독합니다");</script></script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8082/profile/' + uid + ';' + '"</script>');
            }
          });
        }
        });
}
