console.log('enter generaltest');
var ejs_dir = 'ejsTemplate/';

module.exports = function(app,mysql){
	
	app.get('/content/:CID',function (req,res,next){
	var	filePath=ejs_dir+'general.ejs';
	var cType="";
	var cid=req.params.CID;
	console.log('CID:'+cid);
	
	
	
		var  sql = "SELECT * FROM Contents where CID='"+cid+"'";
		var re=mysql.query(sql,function (err, rows)
		{
			var usql = 'select * from User where UID=' + rows[0].CUID + ';';
			mysql.query(usql,function(err, urows)
			{
			
				var streamingid = urows[0].Id;
			
				cType=rows[0].Type;
				console.log("Type: "+cType); 
				var roomid =  rows[0].CID;
				var cdatetemp = Date(rows[0].Insertdate);
				var cdatetemp2 = cdatetemp.split(':');
				var cdate = cdatetemp2[0].slice(0,cdatetemp2[0].length-2)
				console.log(cdate);
			 
				var html;
			 
			
			if (cType=="Streaming")
			{
				html='<a href="https://get.adobe.com/flashplayer">재생이 안될시 클릭</a>\
                                <video id="vplear"\
                                       id="livestream"\
                                       class="video-js vjs-default-skin vjs-big-play-centered"\
                                     controls\
                                       autoplay\
                                       preload="auto"\
                                       width="1080"\
                                       data-setup="{ }">\
                                    <source src="rtmp://skkusgg.ga/live/' + streamingid + '" type="rtmp/mp4">\
                                </video>'
	  
			  
	  }
	  else if (cType=="Video")
	  {
		  html='<video id="vplear"\
                                       id="livestream"\
                                       class="video-js vjs-default-skin vjs-big-play-centered"\
                                       controls\
                                       autoplay\
                                       preload="auto"\
                                       width="1080"\
                                       data-setup="{ }">\
                                     <source src="' + '../uploads/' + rows[0].file + '" type="video/mp4">\
                                </video>'
			  
	  }
	  else if(cType=="Picture")
	  {
		  //get picture_url from db
		  
			 html=' <img id="ImgView" src="../uploads/' + rows[0].file +'"  />';
			 
			  
		 
	  }
	  
	  
	  res.render(filePath,{
				 TypeFollowHTML:html,
				 roomID:roomid,
				 Viewcount:rows[0].Views,
				 ContentDate:cdate,
				 Titledata:rows[0].Title,
				 Usernamedata:urows[0].Nickname,
				 Profileimage: '../uploads/' + urows[0].Img_url,
				 Productdata: rows[0].html,
				 ContentData: rows[0].text,
				 LLikevalue: rows[0].LLike,
				 Cid: cid
		 
		  });
	  
	  
		mysql.query(
		'update Contents set Views=' + String(1+rows[0].Views) + ' where CID=' + String(cid) + ' ;'
		, function (err, rows, fields) {
        if (!err) {//res.send('filename: ' + filenamecreated + '\nfiletype: ' + filetype);
		}
		});
	  

		});

		});
	});


};
