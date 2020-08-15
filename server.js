// Write in browser: 
// http://localhost:3000/
var flash = require('connect-flash');
var express = require("express")
var hbs = require("hbs");
var bodyParser = require("body-parser");
var passport   = require('passport')
var session    = require('express-session')
var env = require('dotenv').load();
var path = require('path');
//var promise = require('bluebird');
//var squel = require('squel');
//var db = require('./app/db/database');
//---
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(expressValidator());
// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(flash());
console.log(path.join(__dirname + '/public'));
app.use(express.static(path.join(__dirname + '/public')));
//app.use(express.static('/public'));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
hbs.registerPartials("./app/views/partials");
app.set("view engine", "hbs");
app.set('views', './app/views');

//Routes
require('./app/routes/auth.js')(app, passport, hbs);
//load passport strategies
require('./app/config/passport')(passport);
//
require('./app/routes/tasks.js')(app, hbs);
require('./app/routes/hbsHelper')(hbs);
//
require("./app/routes/indexRoutes")(app);
require("./app/routes/registerRoutes")(app, hbs);
//-------

app.listen(3000, function(err) {
    if (err)
        console.log("Error " + err);
    else
        console.log("It's alive!!!");
});

module.exports = app;