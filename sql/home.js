var mysqlDB = require('./mysql-db');

module.exports = function(app)
{	



	app.get('/',function (req,res){
		 
		var arr = new Array();
		var arr2 = new Array();
		var arr3 = new Array();
		var arr4 = new Array();
		var arr5 = new Array();
		var arr6 = new Array();
		var img = new Array();
		var img2 = new Array();
		var img3 = new Array();
		var fol = new Array();
		var folid = new Array();
		var con = new Array();
		var con2 = new Array();
		var con3 = new Array();
		var user = new Array();
			
		mysqlDB.query('SELECT * FROM Contents ORDER BY Views DESC limit 0, 10', function(err, rows){
			
			if(err) throw err;
			
			for(var i=0; i<rows.length; i++)
			{
				arr[i] = rows[i]['Type'];
				arr2[i] = rows[i]['Title'];
				img[i] = '../uploads/' + rows[i]['thumbnail'];
				con[i] = rows[i]['CID'];
			}
				
			mysqlDB.query('SELECT * FROM Contents ORDER BY Insertdate DESC limit 0, 10', function(err, rows){
				
				if(err) throw err;

				for(var i=0; i<rows.length; i++)
				{
					arr3[i] = rows[i]['Type'];
					arr4[i] = rows[i]['Title'];
					img2[i] = '../uploads/' + rows[i]['thumbnail'];
					con2[i] = rows[i]['CID'];
				}
				
				mysqlDB.query('SELECT * FROM Contents ORDER BY LLike DESC limit 0, 10', function(err, rows){
				
					if(err) throw err;
					
					for(var i=0; i<rows.length; i++)
					{
						arr5[i] = rows[i]['Type'];
						arr6[i] = rows[i]['Title'];
						img3[i] = '../uploads/' + rows[i]['thumbnail'];
						con3[i] = rows[i]['CID'];
					}
					
					mysqlDB.query('SELECT * FROM Follower WHERE FUID = 1', function(err, rows){
				
						if(err) throw err;
						
						for(var i=0; i<rows.length; i++)
						{
							fol[i] = rows[i]['Fnick'];
							folid[i] = rows[i]['Follower'];
						}
						
						mysqlDB.query('SELECT * FROM User WHERE UID = 1', function(err, rows){
				
							if(err) throw err;
							
							user[0] = rows[0]['Id'];
							user[1] = rows[0]['Name'];
							user[2] = rows[0]['Nickname'];
							user[3] = rows[0]['Email'];
							user[4] = rows[0]['Img_url'];
							user[5] = rows[0]['UID'];

							res.render('homepage', {
								Type: arr,
								Title: arr2,
								Typee: arr3,
								Titlee: arr4,
								Typeee: arr5,
								Titleee: arr6,
								Img: img,
								Img2: img2,
								Img3: img3,
								Fol: fol,
								Len: i,
								Folid: folid,
								Con1: con,
								Con2: con2,
								Con3: con3,
								User: user
							});
						});
					});
				});
			});
		});
	});
}
/*
//thumbnail
var ffmpeg = require('fluent-ffmpeg');

ffmpeg('./views/videos/pubg.mp4')
  .on('filenames', function(filenames) {
	console.log('Will generate ' + filenames.join(', '))
  })
  .on('end', function() {
	console.log('Screenshots taken');
  })
  .screenshots({
	// Will take screens at 20%, 40%, 60% and 80% of the video
	filename: 'good.png',
	count: 1,
	folder: './views/videos/'
  });
  mysqlDB.query('insert into Contents(CUID, LLike, DDislike, Views, Type, Page_url, Title) values(1, 170, 132, 240, \'Video\', \'videos/good.png\', \'초록 스웨터\')', function(err, rows){
				
		if(err) throw err;
		
	});
 
 // thumbnail*/