
const dateFormat = require('../helper/dateFormat');
const Bill = require('../classes/Bill');

exports.tasksBill = function (req, res) {
    console.log(req.body);
    let dateFrom = req.body.from;
    let dateTill = req.body.till;
    if (dateFrom == "")
        dateFrom = new Date();
    if (dateTill == "")
        dateTill = new Date();
    dateFrom = new Date(dateFrom).setHours(0, 0, 0, 0);
    dateTill = new Date(dateTill).setHours(23, 59, 59, 59);
    let dateNow = dateFormat(new Date(), dateFormat.formatDate);

    //console.log(req.session);
    //var passportUser = req.session.passport.user;
    //var id_user = passportUser[0];
    var id_user = 2;

    var bill = new Bill();
    bill.getBill(id_user, dateFrom, dateTill)
        .then(function (result) {
            res.render('taskBill', {
                title: "Счет",
                rows: result,
                dateFrom: dateFormat(dateFrom, dateFormat.formatDate),
                dateTill: dateFormat(dateTill, dateFormat.formatDate),
                dateNow: dateNow
            });
        })
}