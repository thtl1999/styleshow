var mysql = require('mysql');

var connection = mysql.createPool({
	connectionLimit : 10,
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'PASSWORD',
    database: 'ss_db'
});

// connection.connect();
 module.exports = connection;
