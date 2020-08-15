var plusMinutes = 10;

module.exports.plusMinutes = plusMinutes;

module.exports.getMinutes =
    function getMinutes() {
        var minutesInHour = 60;
        var arrMinutes = [];
        var iMinute = -plusMinutes;
        while (iMinute < minutesInHour) {
            arrMinutes.push(iMinute += plusMinutes);
        }
        return arrMinutes;
    }

