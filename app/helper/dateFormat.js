function dateFormat() {
    var dateFormat = require('dateformat')    
    dateFormat.i18n = {
        dayNames: [
            'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
            'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
        ],
        monthNames: [
            'Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноябр', 'Дек',
            'Янаварь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 
            'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        timeNames: [
            'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
        ]
    }
    return dateFormat;
}
module.exports = dateFormat();
module.exports.formatDateTimeMySql = "yyyy-mm-dd HH:MM:ss";
module.exports.formatDate = "dd.mm.yyyy";
module.exports.monthDiff = function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
