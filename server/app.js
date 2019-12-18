var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');
var index = require('./routes/index');


var _ = require("lodash");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'jade');
//app.set('port', process.env.PORT || 1337);

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/client/public/index.html'));
// })


app.use(

  connection(mysql, {

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_helious_test'

  }, 'request'), //or single

);

// Index router
app.use('/', index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
