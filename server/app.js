var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');
var index = require('./routes/index');
var multer = require('multer');
var mimetype = require('mimetype');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/UploadImage/');
    },
    filename: (req, file, cb) => {
        var filename1 = file.originalname;       
        var fileextension = filename1.substring(0, filename1.lastIndexOf('.'));
        cb(null, fileextension + '-' + Date.now() + '.png');
    },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({
    storage: storage
});


var _ = require("lodash");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('port', process.env.PORT || 1337);

var staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));


app.use(

  connection(mysql, {

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_innvonix'

  }, 'request'), //or single

);

// Index router
app.use('/', index);

app.post('/InsertBlog', upload.single('selectedFile'), function (req, res) {
  try {
    var param=req.body;
    req.getConnection(function (err, connection) {
      if (req.file) {
        
          if (req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/png" || req.file.mimetype == "image/gif" || req.file.mimetype == "image/jpg") {
           
              var imgname = req.file.filename;
              var path = req.file.path;
              var sql = 'CALL SpInsertBlog("' + param.id + '","' + param.title + '","' + param.discription + '","'+imgname+'")';
              connection.query(sql, (error, results, fields) => {  
                if(error){
                  console.log(error);
                }           
                res.send('/');
            });

          }
      }
      else {
          var imgname = "noimage.jpg";
          var path = null;
          var sql = 'CALL SpInsertBlog("' + param.id + '","' + param.title + '","' + param.discription + '","'+imgname+'")';
          connection.query(sql, (error, results, fields) => { 
            if(error){
              console.log(error);
            }           
            res.send('/');
        });
      }
      
    });
  }
  catch (e) {
      res.json(e);
  }   
});

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
