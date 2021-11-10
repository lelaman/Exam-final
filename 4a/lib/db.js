const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : null,
  database : 'area',
});

connection.connect(function (error) {
   if (error) throw error;
   console.log('DB Connected !');
});


module.exports = connection;
