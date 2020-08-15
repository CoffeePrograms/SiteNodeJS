var dbUtility = require('../db/database');

exports.mainPage = function (req, res) {
    res.render('index', {
        title: "Диплом"
    })
}

exports.signin = function (req, res) {
    dbUtility.db.query('SELECT * FROM tb_role',
        function (err, rows) {
            if (err) {
                console.log("Error:", err);
                res.render('signin', {
                    title: "Авторизация",
                    rRole: []
                })
            }
            res.render('signin', {
                title: "Авторизация",
                rRole: rows
            })
        }
    )
    //res.render('signin');
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}