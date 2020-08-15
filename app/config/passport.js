var dbUtility = require('../db/database');

module.exports = function (passport) {
    var LocalStrategy = require('passport-local-roles').Strategy;

    function funcRowRightRole(rows, role) {
        var a = rows.filter(elem => elem.id_role == role);
        console.log("funcRowRightRole");
        console.log(a);
        return a;
    }

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password',
            roleField: 'role',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, function (req, login, password, role, done) {
            console.log("Hi Passport");
            var db = dbUtility.db;
            var squel = dbUtility.squel
                .select()
                .from('tb_user', 'u')
                .join('tb_user_info', 'ui', 'u.id_user_info = ui.id_user_info')
                .join('tb_role', 'r', 'u.id_role = r.id_role')
                .where('ui.user_info_login = \'' + login + '\'').toString();
            //console.log(squel);
            db.query(
                squel,
                function (err, rows) {
                    if (err) {
                        console.log("Oh, no! Error:", err);
                        return done(err);
                    }
                    var rowRightRole = funcRowRightRole(rows, role);
                    // console.log("Rows:");
                    // console.log(rows);
                    if (!rows.length) {
                        console.log("Length: ");
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }
                    // if the user is found but the password is wrong
                    if (!(rows[0].user_info_password == password)) {
                        console.log("Pass: " + rows[0].password);
                        console.log("Pass in textblock: " + password);
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                    }
                    //if the user is found but the role is wrong
                    //console.log("isRightRole 454 : " + isRightRole);
                    //if (isRightRole === false) {
                    if (!rowRightRole.length) {
                        //if (!(rows[0].id_role == role)) {
                        console.log("rowRightRole.length: " + rowRightRole.length);
                        //console.log("id_role: " + rows[0].id_role);
                        console.log("Role in select: " + role);
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong role.')); // create the loginMessage and save it to session as flashdata
                    }
                    // all is well, return successful user
                    console.log("Ok: ");
                    //console.log(rowRightRole);
                    //console.log("rowRightRole.id_role: " + rowRightRole[0].id_role);
                    return done(null, rowRightRole[0]);
                })
        }
    ));

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        var attr = [user.id_user, user.id_role]
        //console.log("user.id_role: " + user.id_role);
        //done(null, user.id_user);
        done(null, attr);
    });

    // used to deserialize the user
    passport.deserializeUser(function (attr, done) {
        dbUtility.db.query("select * from tb_user "
            + "where id_user = " + attr[0], // + ' and id_role = ' + attr[1],
            function (err, rows) {
                done(err, rows[0]);
            });
    });
    // passport.deserializeUser(function (id, done) {
    //     dbUtility.db.query("select * from tb_user where id_user = " + id,
    //         function (err, rows) {
    //             done(err, rows[0]);
    //         });
    // });
}