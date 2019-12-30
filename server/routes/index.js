var express = require('express');
var router = express.Router();
var userlist = require('../api/userList');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/GetUser', userlist.UserList);
router.post('/InsertUser', userlist.InsertUser);
// router.post('/InsertBlog', upload.single('selectedFile'), userlist.InsertBlog);
router.post('/DeleteBlog', userlist.DeleteBlog);
router.post('/GetBlog', userlist.BlogUser);
router.post('/GetUserById', userlist.GetUserById);
router.post('/EditUser', userlist.EditUser);
router.post('/SignInData', userlist.LoginUser);


module.exports = router;
