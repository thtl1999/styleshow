var html_dir = './views/';
var mysqlDB = require('./mysql-db');


module.exports = function(app){
app.get('/sqlread', function (req, res, next) {
	console.log('ok');
	mysqlDB.query('select * from fileuploadtest'
	, function (err, rows, fields) {
        if (!err) {
			
			var string = '';
			for(var i=0;i<rows.length;i=i+1)
			{
				string = string + 'filename: ' + rows[i]['filename'] + '  filetype: ' + rows[i]['filetype'] + '<br />';
			}
			res.send(string);
			
        }
    });
	
	
});
};