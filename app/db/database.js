var mysql      = require('mysql');
var env       = process.env.NODE_ENV || 'development';
var squel = require('squel');
var squelMysql = squel.useFlavour('mysql');
var config    = require('./config/database.json')[env];
if (config.use_env_variable) {
    var connection = mysql.createConnection(process.env[config.use_env_variable]);
} else {
    var connection = mysql.createConnection({
        host     : config.host,
        user     : config.username,
        password : config.password,
        database : config.database
      });
}
 
connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
//connection.end();

module.exports.db = connection;
module.exports.squel = squelMysql;