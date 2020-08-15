var Promise = require("bluebird");
const Journal = require('../classes/Journal');
const Hour = require('../classes/time/ClassHours');

//const setIsGoodWork = require('../classes/Journal').setIsGoodWork;
const getMinutes = require('../classes/time/static/Minutes').getMinutes;
//const plusMinutes = staticMinute.plusMinutes;
const dateFormat = require('../helper/dateFormat');

exports.tasksIdJournal = function (req, res) {
    //#region Header 
    var minutesF = getMinutes();
    //console.log(minutesF);
    let arrHours = [];
    var iHour = 0;
    while (iHour < 24) {
        arrHours.push(new Hour(iHour++));
    }
    //#endregion

    // Преобразование значения списка из формы
    // в массив значений.
    //Записывалось: 
    // [arr[i].id_user, arr[i].id_worker, arr[i].id_worker_info]
    var worker = req.body.worker.split(',');
    var dateFrom = req.body.date;
    console.log(dateFrom);
    if (dateFrom == undefined || dateFrom == "")
        dateFrom = new Date();
    else
        dateFrom = new Date(dateFrom);
    //#region worker_title 
    // var worker_title;
    journal = new Journal();
    journal.setJournal(dateFrom, arrHours, worker[0], worker[1], worker[2])
    .then(function(result) {
                    res.render('tasksIdJournal',
                        {
                            title: "Рабочий журнал",
                            minutesF: minutesF,
                            worker_title: result[0],
                            hours: result[1],
                            dateW: dateFormat(dateFrom, dateFormat.formatDate)
                        });
                    });
    //#endregion
}
