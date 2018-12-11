console.log('enter generaltest');
var ejs_dir = 'ejsTemplate/';

module.exports = function(app,mysql){
	
	app.get('/generaltestforejs/:CID',function (req,res,next){
	var	filePath=ejs_dir+'general.ejs';
	var cType="";
	var cid=req.params.CID;
	console.log('CID:'+cid);
	
		var  sql = "SELECT * FROM Contents where CID='"+cid+"'";
		var re=mysql.query(sql,function (err, rows)
		{
			cType=rows[0].Type;
			 console.log("Type: "+cType); 
			
			if (cType=="Streaming")
	  {
		  var html='<a href="https://get.adobe.com/flashplayer">재생이 안될시 클릭</a>\
                                <video id="vplear"\
                                       id="livestream"\
                                       class="video-js vjs-default-skin vjs-big-play-centered"\
                                     controls\
                                       autoplay\
                                       preload="auto"\
                                       width="1080"\
                                       data-setup="{ }">\
                                    <source src="rtmp://skkusgg.ga/live/test" type="rtmp/mp4">\
                                </video>'
	  
			  res.render(filePath,{
				  TypeFollowHTML:html,
				  roomID:"StreamingRoom"
			  });
	  }
	  else if (cType=="Video")
	  {
		  var html='<a href="https://get.adobe.com/flashplayer">재생이 안될시 클릭</a>\
                                <video id="vplear"\
                                       id="livestream"\
                                       class="video-js vjs-default-skin vjs-big-play-centered"\
                                       controls\
                                       autoplay\
                                       preload="auto"\
                                       width="1080"\
                                       data-setup="{ }">\
                                     <source src="videos/pubg.mp4" type="video/mp4">\
                                </video>'
			  res.render(filePath,{
				  TypeFollowHTML:html,
				  roomID:"VideoRoom"
			  });
	  }
	  else if(cType=="Picture")
	  {
		  //get picture_url from db
		  
			  var html=' <img id="ImgView" src="./clothes.png"  />';
			 res.render(filePath,{
				 TypeFollowHTML:html,
				 roomID:"PictureRoom"
			 
		 
		  });
			  
		 
	  }
	  

		});

	  
	});


};
