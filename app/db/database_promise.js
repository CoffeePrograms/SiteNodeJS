var MySQL = require('mysql-bluebird');
var Promise = require('bluebird');
var env = process.env.NODE_ENV || 'development';
var squel = require('squel');
var squelMysql = squel.useFlavour('mysql');
var config = require('./config/database.json')[env];
// if (config.use_env_variable) {
//     var db = new MySQL(process.env[config.use_env_variable]);
// } else {
//     var db = new MySQL({
//         host     : config.host,
//         user     : config.username,
//         password : config.password,
//         database : config.database
//       });
// }
  
// Promise.resolve()
//   .then(function () {
//     // Call the start function which will connect to the database.
//     return db.start();
//   }).then(function () {
//     // Call the start function which will connect to the database.
//     return db.end();
//   }).catch(function(err) {
//       console.log("Db failed. Error:" + err);
//   })
// Promise.resolve()
//   .then(function () {
//     // Call the start function which will connect to the database.
//     return db.start();
//   }).then(function () {
//     // Perform a query to the database to get all the rows from the test table.
//     return db.query('SELECT * FROM tb_user');
//   }).then(function (res) {
//     // Console print the returned rows.
//     console.log(res);
//   });

//  module.exports.db = db;
module.exports.db = function(a) 
{
    if (config.use_env_variable) {
        var db = new MySQL(process.env[config.use_env_variable]);
    } else {
        var db = new MySQL({
            host     : config.host,
            user     : config.username,
            password : config.password,
            database : config.database
        });
    }
    // Promise.resolve()
    // .then(function () {
    // // Call the start function which will connect to the database.
    //     return db.start();
    // })
    // .catch(function(err) 
    // {
    //     console.log("Connect with db failed. Error:" + err);
    // });
    return db.start();
}
module.exports.Promise = Promise;
module.exports.squelMysql = squelMysql;