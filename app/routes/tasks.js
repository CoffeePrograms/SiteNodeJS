const taskController = require('../controllers/taskscontroller');
const taskJournalController = require('../controllers/taskJournalController');
const taskBillController = require('../controllers/taskBillController');

module.exports = function (app, hbs) {
    // Находится в auth.js и tasksController.js
    // app.get('/tasks',..)


    //#region HTTP GET 

    app.get('/admin', taskController.admin);

    app.get('/tasks/:id', taskController.tasksIdAbout);

    app.get('/tasks/:id/tab', taskController.tasksIdTab);

    app.get('/*', function (req, res) {
        res.status(404);
        res.render('404');
    });


    //#endregion

    //#region HTTP POST 

    app.post('/tasks/:id/journal', taskJournalController.tasksIdJournal);

    app.post('/tasks/bill', taskBillController.tasksBill);

    //app.post('/billPrint', taskBillController.billPrint);

    //#endregion  

}