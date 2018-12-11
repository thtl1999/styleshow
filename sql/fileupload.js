var multer = require('multer');
var upload = multer({ dest: './uploads'});
var html_dir = './views/';
var mysqlDB = require('./mysql-db');


module.exports = function(app){
app.get('/upload', function (req, res, next) {

	res.sendfile( html_dir + 'fileuploadtest.html');

});

app.post('/upload', upload.single('file-to-upload'), function(req, res,next){
	console.log(req.file);
	console.log(req.file.filename);		//file name

	var filenamecreated = req.file.filename;
	var filetype = req.file.mimetype;
	mysqlDB.query('insert into fileuploadtest ( filename , filetype) values ( \'' + filenamecreated + '\',\'' + filetype + '\')'
	, function (err, rows, fields) {//for select. not for insert
        if (!err) {
			res.send('filename: ' + filenamecreated + '\nfiletype: ' + filetype);
        }
    });

	//res.send('업로드 성공!');


});

};
