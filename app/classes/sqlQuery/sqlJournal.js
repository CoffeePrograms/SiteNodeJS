const squel = require('../../db/database').squel;
const dateFormat = require('../../helper/dateFormat');
const sqlQuery = require('./sql');

exports.workTitle = function (id_user_info) {
    let sql = new sqlQuery(
        squel
        .select()
        .from("tb_user_info")
        .where("id_user_info = " + id_user_info)
        .toString()
    )
    return sql;
}

exports.workRows = function (id_worker, dateFrom, dateTill) {
    let sql = new sqlQuery(
        squel
        .select()
        .from("tb_work", "w")
        .where("id_worker = " + id_worker)
        .where("work_datetime between '" + dateFormat(dateFrom, dateFormat.formatDateTimeMySql) + "' and '" + dateFormat(dateTill, dateFormat.formatDateTimeMySql) + "'")
        //slow  
        //it will calculate DATE() for all rows, including those, that don't match 
        //.where("work_datetime like " + dateFrom + "%")
        //the same
        //.where("date(work_datetime) = " + dateFrom)
        .order("work_datetime")
        .toString()
    )
    return sql;
}