module.exports = function (hbs) {

    // hbs.registerHelper("showTaskTitle",
    //     function (id_task) {
    //         dbUtility.db.query(
    //             "SELECT * FROM tb_task WHERE id_task = " + id_task,
    //             function (err, rows) {
    //                 if (err) {
    //                     console.log("Err:" + err);
    //                     return null;
    //                 }
    //                 console.log("title_task");
    //                 console.log(rows[0].task_title);
    //                 return rows[0].task_title.toString()
    //             }
    //         );
    //     }
    // )

    hbs.registerHelper("DateNow",
        function () {
            return new Date();
        }
    )

    // hbs.registerHelper("createCbRoles",
    //     function (name, arr) {
    //         var result = "";
    //         for (var i = 0; i < arr.length; i++) {
    //             result += "<option value = " + arr[i].id_role + ">" + arr[i].role_title + "</option>";
    //         }
    //         return new hbs.SafeString("<select name = " + name + ">" + result + "</select>");
    //     }
    // )


    hbs.registerHelper("createCbRoles",
        function (arr) {
            var result = "";
            for (var i = 0; i < arr.length; i++) {
                result += "<option value = " + arr[i].id_role + ">" + arr[i].role_title + "</option>";
            }
            return new hbs.SafeString(result);
        }
    )

    hbs.registerHelper("createCbWorker",
        function (arr) {
            //console.log("arr");
            console.log(arr);
            if (arr == undefined || !arr.length) {
                console.log("Array is empty!!!");
                return new hbs.SafeString("Работников нет");
            }
            else {

                var result = "";
                for (var i = 0; i < arr.length; i++) {
                    // var arrRes = [];
                    // arrRes = [arr[i].id_user, arr[i].id_worker, arr[i].id_user_info];
                    // console.log("arrRes");
                    // console.log(arrRes);

                    result += "<option value = "
                        + [arr[i].id_user, arr[i].id_worker, arr[i].id_user_info]
                        // + arrRes
                        // + new workerInfo(arr[i].id_user, arr[i].id_worker, 
                        //     arr[i].id_task, arr[i].id_user_info) 
                        + ">" + arr[i].user_info_fio + "</option>";
                }
                //console.log("result");
                //console.log(result);
                // return new hbs.SafeString("<select name = " + name + ">" + result + "</select>");
                console.log("result");
                console.log(result);
                return new hbs.SafeString(result);
            
            }
        }
    )

    hbs.registerHelper("inc", function (value, options) {
        return parseInt(value) + 1;
    });

    hbs.registerHelper("setPaymentType", function (value, options) {
        return parseInt(value) == 1 ? "Почасовая" : "Фиксированная";
    });

    hbs.registerHelper("setWorkType", function (value, options) {
        // -1 - нет работы
        // 1 - не проверена
        // 2 - не зачтенная
        // 3 - зачтенная
        switch (parseInt(value)) {
            case -1:
                return ""
                break;
            case 1:
                return "?"
                break;
            case 2:
                return "-"
                break;
            case 3:
                return "+"
                break;
        }
    });

}