const dbUtility = require('../db/database');
const plusMinutes = require('./time/static/Minutes').plusMinutes;
const squel = require('../classes/sqlQuery/sqlJournal');

class Journal {
    constructor() {
        this.arrHours = [];
    }
    static setIsGoodWork(hour, timeBegin, timeEnd, work) {
        for (let k = 0; k < hour.minutes.length - 1;) {
            let isChange = false;
            if (hour.minutes[k].minute <= timeBegin
                && (k == 0
                    && ((timeBegin - hour.minutes[k].minute)
                        <= plusMinutes))
                || (k != 0
                    && ((timeBegin - hour.minutes[k].minute)
                        < plusMinutes))) {
                for (; (k < hour.minutes.length)
                    && (timeEnd > hour.minutes[k].minute);) {
                    hour.minutes[k].isGoodWork = work.id_status_work;
                    k++;
                }
                isChange = true;
            }
            else
                k++;
            if (isChange)
                break;
        }
        return hour;
    }

    setJournal(dateFrom, arrHours, id_user, id_worker, id_worker_info) {
        return new Promise(function (resolve, reject) {
            dbUtility.db.query(
                squel.workTitle(id_worker_info).getQuery(),
                function (err, rowsUserInfo) {
                    if (err) {
                        console.log("Err:" + err);
                        worker_title = "";
                    }
                    var worker_title = rowsUserInfo[0].user_info_fio;
                    // console.log(worker_title);
                    // console.log("dateFrom");
                    dateFrom.setHours(0, 0, 0, 0);
                    // console.log(dateFrom);
                    var dateTill = new Date(dateFrom);
                    dateTill.setHours(23, 59, 59, 59);
                    // console.log("dateTill");
                    // console.log(dateTill);
                    dbUtility.db.query(
                        squel.workRows(id_worker, dateFrom, dateTill).getQuery(),
                        function (err, rowsWorks) {
                            if (err) {
                                console.log("Err: " + err);
                                return;
                            }
                            // console.log("rowsWorks");
                            // console.log(rowsWorks);
                            if (!rowsWorks.length) {
                                console.log("Записей с работой нет.");
                            } else {
                                let date;
                                let i = 0, j = 0;
                                for (; j < arrHours.length && i < rowsWorks.length;) {
                                    let hour = arrHours[j];
                                    // console.log("hour.hour");
                                    // console.log(hour.hour);
                                    let work = rowsWorks[i];
                                    date = work.work_datetime;
                                    if (hour.hour == date.getHours()) {
                                        let timeEnd = parseInt(date.getMinutes()) + parseInt(work.work_period);
                                        // console.log("timeEnd");
                                        // console.log(timeEnd);
                                        if (timeEnd < 60) {
                                            hour = Journal.setIsGoodWork(hour, date.getMinutes(), timeEnd, work);
                                        }
                                        else {
                                            //console.log("Over hour!");
                                            let timeEnd1 = 61;
                                            hour = Journal.setIsGoodWork(hour, date.getMinutes(), timeEnd1, work);
                                            if (j == arrHours.length)
                                                break;
                                            let timeEnd2 = timeEnd - 60;
                                            // console.log("timeEnd2");
                                            // console.log(timeEnd2);
                                            let hour1 = arrHours[j + 1];
                                            // console.log("hour1");
                                            // console.log(hour1.hour);
                                            arrHours[j + 1] = Journal.setIsGoodWork(hour1, 0, timeEnd2, work);
                                        }
                                        i++;
                                    }
                                    else {
                                        j++;
                                    }
                                };
                            }
                            this.arrHours = arrHours;
                            var res = [];
                            res.push(worker_title);
                            res.push(arrHours);
                            resolve(res);
                        }
                    );
                }
            );
        });
    }
    
}

module.exports = Journal;


// module.exports.setIsGoodWork = Journal.setIsGoodWork();