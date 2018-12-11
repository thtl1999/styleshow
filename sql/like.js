console.log('enter generaltest');
var ejs_dir = 'ejsTemplate/';

module.exports = function(app,mysql){

	app.get('/like/:cid',function (req,res,next){
	var cType="";

	var cid= req.params.cid
	console.log('CID:'+cid);
	//console.log(req.body);
	var uid = req.session.UID;

	if (!req.session.UID)
	{
		res.send('<script type="text/javascript">alert("로그인 해주세요");</script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8081/login"</script>');

	}
	else
	{

		var  sql = "SELECT * FROM LikeTable where UID= " + uid + ' and CID= ' + cid + ';';
		var re=mysql.query(sql,function (err, rows)
		{
			if (rows[0])
			{
				console.log('why cid?');
				console.log(cid);
				res.send('<script type="text/javascript">alert("이미 좋아요를 눌렀습니다");</script></script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8081/content/' + cid + '"</script>');

			}
			else
			{
				console.log('why cid?');
				console.log(cid);
				var sql2 = 'insert into LikeTable (UID, CID) value (' + uid + ','+cid+');';
				mysql.query(sql2,function (err, rows2)
				{

				var sql3 = 'update Contents set LLike = LLike + 1 where CID=' + cid;
				mysql.query(sql3,function (err, rows2)
				{
					res.send('<script type="text/javascript">alert("좋아요!");</script></script><script language=\"javascript\">window.location=\"http://skkusgg.ga:8081/content/' + cid + '"</script>');
				});

				});

			}

		});

	}

	});




};
