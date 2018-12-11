var html_dir = './views/';
var multer = require('multer');
var upload = multer({ dest: './uploads'});
var mysqlDB = require('./mysql-db');
var ffmpeg = require('fluent-ffmpeg');
var FB = require('./firebase');

module.exports = function(app){
app.get('/upload',function (req,res,next){
	//console.log('upload GET ' + req.params.id);
	//console.log(req);
	
	console.log('load id--------------------------');
	console.log(req.session);
	
	if (req.session.UID){
		res.sendfile( html_dir + 'upload.html');
	}
	else
	{
		res.redirect('http://skkusgg.ga:8081/');
	}
	//res.sendfile( html_dir + 'upload.html');
});

var CID = 0;

app.post('/uploadcontent', upload.single('inputs'), function(req, res,next){
	
	//console.log(req.file);
	//console.log(req.file.filename);		//file name
	
	var title = req.body.contenttitle.toString("utf8");
	var contenttext = req.body.content.toString("utf8");
	var productinfo = req.body.productinfo.toString("utf8");
	var files = req.file;
	var contenttype = 'Picture';	//Picture, Streaming, Video
	
	
	var CUID = 1;
	var filenamestring;
	
	CUID = req.session.UID;
	console.log('test');
	console.log(req.session);
	
	console.log(title);
	console.log(contenttext);
	console.log(productinfo);
	console.log(files);
	//console.log(files.mimetype);
	
	if (files) filenamestring = files.filename;
	
	
	if (!files)
	{
		console.log ('no file');
		filenamestring = 123;
		var thumbnail = 'StreamingThumbnail.png';
		contenttype = 'Streaming';
		
	}
	else if (files.mimetype == 'image/png')
	{
		console.log('pngok');
		var thumbnail = files.filename;
		contenttype = 'Picture';
	}
	else if (files.mimetype == 'image/jpeg')
	{
		var thumbnail = files.filename;
		contenttype = 'Picture';
	}
	else if (files.mimetype == 'video/mp4')	//generate videoname + tb.png
	{
		ffmpeg('./uploads/' + files.filename)
		.on('filenames', function(filenames) {
			console.log('Will generate ' + filenames.join(', '))
			})
			.on('end', function() {
				console.log('Screenshots taken');
				})
			.screenshots({
		// Will take screens at 20%, 40%, 60% and 80% of the video
		filename: files.filename + 'tb',
		count: 1,
		folder: './uploads/'
		});
		
		var thumbnail = files.filename + 'tb' + '.png';
		contenttype = 'Video'
	}
	
	var tagstring = contenttext.split('#');
	var tags = [];
	for (var i = 1;i<tagstring.length;i++)
	{
		var tagstring2 = tagstring[i].split(' ');
		tags.push(tagstring2[0]);
	}
	
	//for async, put sql functions in sql function
	
	mysqlDB.query('select max(CID) from Contents'
	, function (err, rows, fields) {
        if (!err) {
			
			var rowstring = JSON.stringify(rows);
			rowstring = rowstring.replace(/[^0-9]/g,"");
			console.log(rowstring);
			CID = parseInt(rowstring) + 1;
			
        }
		
		
		
		
		mysqlDB.query(
		'insert into Contents ( LLike, CID, CUID, Type, Title, text, html, Views, file, thumbnail)' +
		'values ( 0, ' + CID + ',' + CUID + ',\'' + contenttype +
		'\',\'' + title + '\',\'' + contenttext + '\',\'' + productinfo + '\',0' +
		',\'' + filenamestring + '\',\'' + thumbnail  + '\')'
		, function (err, rows, fields) {
        if (!err) {//res.send('filename: ' + filenamecreated + '\nfiletype: ' + filetype);
		}
		});
	
	console.log(tags);
	
	for(var i = 0;i < tags.length ; i++)
	{
		console.log('insert tag' + tags[i]);
		mysqlDB.query(
		'insert into Tags ( CID, tag)' +
		'values ( ' + CID + ',\'' + tags[i] + '\')'
		, function (err, rows, fields) {
		if (!err) {
				//res.send('filename: ' + filenamecreated + '\nfiletype: ' + filetype);
		}
		}
		);
	}
	
	/*
	mysqlDB.query(
		'insert into Contentfiles ( text, html, file, thumbnail, CID)' +
		'values ( \'' + contenttext + '\',\'' + productinfo + '\',\'' + files.filename +
		'\',\'' + thumbnail + '\',' + CID + ')'
	, function (err, rows, fields) {
        if (!err) {
			//res.send('filename: ' + filenamecreated + '\nfiletype: ' + filetype);
        }
    }
	);
	*/
		
		
		
		
		
    });
	
	
	
	res.redirect('http://skkusgg.ga:8081/profile/' + CUID + ';');
	//res.send('업로드 성공!');
	
	
});

};
