var mysql = require('mysql');

var connection = mysql.createPool({
	connectionLimit : 10,
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'soft14#Skku',
    database: 'ss_db'
});

// connection.connect();
function giveMariaDB() {
    console.log('give maria db start');

    return connection;
}