var express = require('express');
var router = express.Router();
var userlist = require('../api/userList');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/GetUser', userlist.UserList);
router.post('/InsertUser', userlist.InsertUser);
router.post('/DeleteUser', userlist.DeleteUser);
router.post('/SearchUser', userlist.SearchUser);
router.post('/GetUserById', userlist.GetUserById);
router.post('/EditUser', userlist.EditUser);

module.exports = router;
