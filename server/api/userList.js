
exports.UserList = function (req, res) {
    //var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpGetUserList()';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};
exports.InsertUser = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpInsertUser("' + param.fName + '","' + param.lName + '","' + param.email + '","' + param.password + '")';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};

exports.DeleteBlog = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpDeleteBlog("' + param.id + '")';
            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};
exports.BlogUser = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpGetBlogListByIdRole("' + param.id + '","' + param.role + '")';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};
exports.GetUserById = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {

        try {
            let sql = 'CALL SpGetUserById("' + param.uId + '")';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};
exports.LoginUser = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpSignIn("' + param.email + '","' + param.password + '")';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};
exports.EditUser = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpEditUser("' + param.uId + '","' + param.status + '")';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};

// exports.InsertBlog = function (req, res) {
//     var param = req.body;
//     req.getConnection(function (err, connection) {
//         try {
//             let sql = 'CALL SpInsertBlog("' + param.id + '","' + param.title + '","' + param.discription + '")';

//             connection.query(sql, (error, results, fields) => {
//                 res.json(results[0]);
//             });

//         } catch (e) {
//             res.json(e);
//         }

//     });

// };