const dbUtility = require('../db/database');
const workerInfo = require('../classes/WorkerInfo')
const dateFormat = require('../helper/dateFormat');
//const forEP = require('foreach-promise');

exports.tasks = function (req, res) {
    var squelTask = function (id_role) {
        if (id_role == 1) {
            return dbUtility.squel
                .select()
                .from('tb_task', 't')
                .where('t.id_user = ' + id_user)
                .toString();
        }
        else if (id_role == 2) {
            return dbUtility.squel
                .select()
                .from('tb_worker', 'wer')
                .where('wer.id_user = ' + id_user)
                .join('tb_task', 't', 't.id_task = wer.id_task')
                .toString();
        }
        else {
            return null;
        }
    }

    var passportUser = req.session.passport.user;
    //console.log(req.session);
    // console.log("id_user: " + passportUser[0]);
    // console.log("id_role: " + passportUser[1]);

    var id_user = passportUser[0];
    var id_role = passportUser[1];
    if (id_role == 3) {
        console.log("'If id_role == 3' works");
        res.redirect('admin');
        return;
    }
    //иначе продолжаем выполнение порграммы

    dbUtility.db.query(
        "SELECT * FROM tb_user WHERE id_user = " + id_user,
        function (err, rows) {
            if (err) {
                console.log("Error in  tasksController");
                throw err;
            }
            console.log('Yhey! First query success complited');

            var squel = squelTask(id_role);
            //console.log(squel);
            if (squel == null)
                res.render('tasks');

            dbUtility.db.query(
                squel,
                function (err, rows) {
                    if (err) {
                        console.log("Error:", err);
                        return;
                    }
                    console.log('Yhey! Task query success complited');
                    console.log(rows);
                    res.render('tasks', {
                        tasks: rows
                    });
                }
            );
        }
    );
}

exports.admin = function (req, res) {
    res.render('admin');
}

exports.tasksIdAbout = function (req, res) {
    var rWorker;
    // console.log("req.params");
    // console.log(req.params);

    var rWorkerIsNotEmpty = true;

    dbUtility.db.query(
        dbUtility.squel
            .select()
            .from('tb_worker', 'w')
            .where('id_task = ' + req.params.id)
            .join('tb_user', 'u', 'u.id_user = w.id_user')
            .join('tb_user_info', 'ui', 'ui.id_user_info = u.id_user_info')
            .toString()
        ,
        function (err, rows) {
            if (err) {
                console.log("Error:", err);
                rWorkerIsNotEmpty = false;
                return;
            }
            //console.log("rWorker");
            //console.log(rows);
            rWorker = rows;
            if (rWorker == undefined || !rWorker.length) {
                //  console.log("Array rWorker is empty!!!");
                rWorkerIsNotEmpty = false;
            }

            dbUtility.db.query(
                "SELECT task_title FROM tb_task WHERE id_task = " + req.params.id,
                function (err, rowsTask) {
                    if (err) {
                        console.log("Err:" + err);
                        return null;
                    }
                    //console.log("task_title");
                    //console.log(rowsTask[0].task_title);
                    //console.log("Before render rWorker:");
                    //console.log(rWorker);
                    res.render('tasksIdAbout',
                        {
                            id_task: req.params.id,
                            task_title: rowsTask[0].task_title,
                            rWorker: rWorker,
                            rWorkerIsNotEmpty: rWorkerIsNotEmpty
                        });
                });
        }
    )
}
exports.tasksIdTab = function (req, res) {
    console.log("id: " + req.params.id);
    var daysInMonth = 31;
    class DaysF {
        constructor(days, name) {
            this.days = days;
            this.name = name;
        }
    };

    var daysS = [], days = [];
    var iDay = 1;
    while (iDay < 16) {
        days.push(iDay++);
    }
    DaysF.prototype.dass = "l";
    let daysF = new DaysF(days, "dhjj");
    DaysF.prototype.das = "k";
    console.log(daysF.das);

    while (iDay < daysInMonth + 1) {
        daysS.push(iDay++);
    }
    res.render('tasksIdTab',
        {
            daysF: daysF,
            daysS: daysS
        });
}