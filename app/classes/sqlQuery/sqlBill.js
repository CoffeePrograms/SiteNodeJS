const dateFormat = require('../../helper/dateFormat');
const squel = require('../../db/database').squel;

module.exports.sqlCommission = function () {
    return squel
        .select()
        .from("tb_manual_commission")
        .where("year(curdate()) between from_date and (case when till_date is null then '2999' end)")
        .toString();
}

module.exports.sqlEmployer = function (id_user, dateFrom, dateTill) {
    dateFrom = dateFormat(dateFrom, dateFormat.formatDateTimeMySql)
    dateTill = dateFormat(dateTill, dateFormat.formatDateTimeMySql)
    var sq = squel
        .select()
        .from("tb_user", "u")
        .join("tb_task", "t", "t.id_user = u.id_user")
        .join("tb_user_info", "ui", "ui.id_user_info = u.id_user_info")
        .where("u.id_user = " + id_user)
        .where("case when t.task_type = 1 then t.closing_datetime between '" + dateFrom + "' and '" + dateTill + "' "
            + "when t.task_type != 1 then t.task_type = t.task_type end")
        .toString();
    console.log(sq);
    return sq;
}

module.exports.sqlWorker = function (arr_id_task) {
    var sq = squel
        .select()
        .from("tb_worker", "w")
        .where("w.id_task in ?", arr_id_task)
        .join("tb_user", "u", "w.id_user = u.id_user")
        .join("tb_user_info", "ui", "ui.id_user_info = u.id_user_info")
        .toString()
    //console.log(sq);
    return sq;
}

module.exports.sqlWork = function (arr_id_worker, dateFrom, dateTill) {
    dateFrom = dateFormat(dateFrom, dateFormat.formatDateTimeMySql)
    dateTill = dateFormat(dateTill, dateFormat.formatDateTimeMySql)
    var sq1 = squel
        .select()
        .from("tb_work", "work")
        .where("work.id_worker in ?", arr_id_worker)
        // 3 - одобренно.
        .where("work.id_status_work = " + 3)
        .where("work.work_datetime between '" + dateFrom + "' and '" + dateTill + "'")
        .join("tb_worker", "w", "w.id_worker = work.id_worker")
        .toString()
    // console.log(sq1);
    return sq1;
}
