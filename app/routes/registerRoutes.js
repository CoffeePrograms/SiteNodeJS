var db = require('../db/database');
module.exports = function (app, hbs)
{
    hbs.registerHelper("greeting", function(data, opts) {
        if (data == "el")
            return opts.fn(this);
        else
            return opts.inverse(this);
    })
    app.post("/register", function (req, res)
    {
        if(!req.body)
            return res.sendStatus(400);

        // //Validate input
        // req.assert("username", 'Invalid login address.').notEmpty();
        // req.assert("password", 'Password cannot be empty.').notEmpty();
        // //Make sure we have no validation errors
        // var pageErrors = req.validationErrors();
        // if (pageErrors)
        //     res.render('error.hbs', { pageErrors: pageErrors });
        console.log("Hi RegRoutes");
        // console.log("query: " + db.sequelize.models.tb_user.findOne({
        //     where: {user_login: req.body.userName},
        //     attributes: ['id_user', 'user_login']
        // }).then(user => {
        //     console.log("user: " + user);
        // }));

        res.render("register.hbs", {
            title: "Инфо",
            userName: req.body.userName,
            userPass: req.body.userPass,
            userRole: req.body.userRole
        });
    });
}
