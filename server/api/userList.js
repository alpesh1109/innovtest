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
            let sql = 'CALL SpInsertUser("' + param.fName + '","' + param.lName + '","' + param.email + '","' + param.role + '","' + param.status + '")';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};

exports.DeleteUser = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpDeleteUser("' + param.id + '")';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};
exports.SearchUser = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpSearchUser("' + param.searchname + '")';

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
exports.EditUser = function (req, res) {
    var param = req.body;
    req.getConnection(function (err, connection) {
        try {
            let sql = 'CALL SpEditUser("' + param.uId + '","' + param.fName + '","' + param.lName + '","' + param.email + '","' + param.role + '","' + param.status + '")';

            connection.query(sql, (error, results, fields) => {
                res.json(results[0]);
            });

        } catch (e) {
            res.json(e);
        }

    });

};