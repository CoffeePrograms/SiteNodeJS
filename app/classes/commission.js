const dbUtility = require('../../db/database');

module.exports.getcommission = function() {
    console.log("Query commission------------------------------");
    dbUtility.db.query(
        dbUtility.squel
        .select()
        .from("tb_manual_commission")
        .where("year(curdate()) between from_date and (case when till_date is null then '2999' end)")
        .toString()
        ,
        function(err, rows){
        if (err) {
            console.log("Err: " + err);
            throw err;
        }
        console.log("Query commission------------------------------");
        console.log(rows);
        console.log("endRows");
        return rows;
    });
}