class rowBill {
    constructor() {
        this.employer = "";
        this.worker = "";
        this.task = "";
        this.currency = "";
        this.payment = "";
    }
}

module.exports =
class Bill {
    constructor() {
        this.resRows = [];
    }

    getBill(id_user, dateFrom, dateTill) {
        return new Promise(function (resolve, reject) {
            var rCommission;
            dbUtility.db.query(
                sqlQueryText.sqlCommission()
                ,
                function (err, rows) {
                    if (err) {
                        console.log("Err: " + err);
                        throw err;
                    }
                    // console.log("Query commission------------------------------");
                    rCommission = rows;
                    // console.log(rCommission);
                    // console.log("endRows");
                    // 1 - налог за месяц
                    if (rCommission[0].type_commission == 1) {
                        months = dateFormat.DateDiff(dateFrom, dateTill);
                        // console.log("months");
                        // console.log(months);
                        comm += months * rCommission[0].commission;
                    }
                }
            );

            var comm = 0;
            var sum = 0;

            let resRows;
            dbUtility.db.query(
                sqlQueryText.sqlEmployer(id_user, dateFrom, dateTill)
                ,
                function (err, rowsEmployer) {
                    if (err) {
                        console.log("Error: " + err);
                        throw err;
                    }

                    //console.log("rowsEmployer");
                    //console.log(rowsEmployer);
                    var arr_id_task = [];
                    for (let i = 0; i < rowsEmployer.length; i++) {
                        arr_id_task.push(rowsEmployer[i].id_task);
                    }
                    // 2 - налог за проект
                    if (rCommission[0].type_commission = 2)
                        comm += rCommission[0].commission * arr_id_task.length;
                    dbUtility.db.query(
                        sqlQueryText.sqlWorker(arr_id_task)
                        ,
                        function (err, rowsWorker) {
                            // console.log("rowsWorker");
                            // console.log(rowsWorker);

                            var arr_id_worker = [];
                            for (let i = 0; i < rowsWorker.length; i++) {
                                arr_id_worker.push(rowsWorker[i].id_worker);
                            }
                            dbUtility.db.query(
                                sqlQueryText.sqlWork(arr_id_worker, dateFrom, dateTill)
                                ,
                                function (err, rowsWork) {
                                    // console.log("rowsWork");
                                    // console.log(rowsWork);

                                    resRows = [];
                                    resRows.push(new rowBill());
                                    let iResRow = 0;
                                    resRows[iResRow].employer = rowsEmployer[0].user_info_fio;

                                    for (let i = 0; i < arr_id_task.length; i++) {
                                        resRows[iResRow].task = rowsEmployer[i].task_title;
                                        var rate = parseInt(rowsEmployer[i].rate);
                                        for (let j = 0; j < rowsWorker.length; j++) {
                                            if (rowsWorker[j].id_task == rowsEmployer[i].id_task) {
                                                resRows[iResRow].worker = rowsWorker[j].user_info_fio;
                                                resRows[iResRow].currency = "RUB";
                                                if (rowsEmployer[i].payment_type == 0) {
                                                    resRows[iResRow].payment = rate;
                                                }
                                                else {
                                                    let sumTime = 0;
                                                    for (let k = 0; k < rowsWork.length; k++) {
                                                        if (rowsWork[k].id_worker == rowsWorker[j].id_worker) {
                                                            sumTime += parseInt(rowsWork[k].work_period);
                                                        }
                                                    }
                                                    if (sumTime == 0) {
                                                        delete resRows[iResRow--];
                                                        break;
                                                    }
                                                    resRows[iResRow].payment = sumTime * (rate / 60);
                                                    // console.log("sumTime");
                                                    // console.log(sumTime);
                                                }
                                                // 0 - процент от суммы
                                                if (rCommission[0].type_commission == 0) {
                                                    comm += resRows[iResRow].payment
                                                        * (rCommission[0].commission / 100);
                                                }
                                                sum += resRows[iResRow].payment;
                                                resRows[iResRow].payment = resRows[iResRow].payment.toFixed(2);
                                                resRows.push(new rowBill());
                                                iResRow++;
                                            }
                                        }
                                        //resRows.push(new Bill());
                                    }
                                    sum += comm;

                                    iResRow = resRows.length - 1;
                                    resRows[iResRow].task = "Услуги фриланс-портала"
                                    resRows[iResRow].worker = "ЧП \"Посредник\"";
                                    resRows[iResRow].currency = "RUB";
                                    resRows[iResRow].payment = comm.toFixed(2);

                                    resRows.push(new rowBill());
                                    iResRow = resRows.length - 1;
                                    resRows[iResRow].employer = "Всего";
                                    resRows[iResRow].currency = "RUB";
                                    resRows[iResRow].payment = sum.toFixed(2);
                                    this.resRows = resRows;
                                    resolve(resRows);
                                });
                        });
                });
        })
    }
}
