var html_dir = './views/';

module.exports = function(app){
app.get('/firsttest/:name', function (req, res, next) {
	console.log(req.params.name);
	res.sendfile( html_dir + 'sqltest.html');

    mysqlDB.query('select * from User', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(result);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });

});
};

exports.posttest = function (req, res, next) {
	console.log('yes');
    //var para1 = req.body['param1'];
    //var para2 = req.body['param2'];
	var para1 = req.body.param1;
	var para2 = req.body.param2;

	console.log(para1 + ' and ' + para2);

	mysqlDB.query('SELECT * FROM User', function(error, result, fields){
		if(error){
			console.log('쿼리 문장에 오류가 있습니다.');
		}else{
			res.send(result);
		}
	});

    mysqlDB.query('insert into User ( pa1 , pa2 ) values ( \'' + para1 + '\' ,\'' + para2 + '\')'
	, function (err, rows, fields) {//for select. not for insert
        if (!err) {
            if (rows[0]!=undefined) {
                res.send('id : ' + rows[0]['id'] + '<br>' +
                    'pw : ' + rows[0]['pw']);
            } else {
                res.send('no data');
            }

        } else {
            res.send('error : ' + err);
        }
    });
    console.log('yes3');
};


//module.exports = router;

/*
mysql_db.query('select * from User where id=\'' + userId + '\' and pw=\'' + userPw + '\'', function (err, rows, fields) {
        if (!err) {
            if (rows[0]!=undefined) {
                res.send('id : ' + rows[0]['id'] + '<br>' +
                    'pw : ' + rows[0]['pw']);
            } else {
                res.send('no data');
            }

        } else {
            res.send('error : ' + err);
        }
    });

*/
