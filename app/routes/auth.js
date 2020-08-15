var authController = require('../controllers/authcontroller.js');
var tasksController = require('../controllers/taskscontroller');

module.exports = function (app, passport, hbs) {

    app.get('/', authController.mainPage);

    app.get('/signin', authController.signin);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/tasks',
        failureRedirect: '/signin'
    }
    ));

    app.get('/logout', authController.logout);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    app.get('/tasks', isLoggedIn, tasksController.tasks);

}