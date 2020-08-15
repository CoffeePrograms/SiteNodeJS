var Minute = require('./ClassMinute');
var plusMinutes = require('./static/Minutes').plusMinutes;


module.exports =
    class Hour {
        constructor(hour) {
            this.hour = hour;
            this.minutes = [];
            let iMinute = -plusMinutes;
            while (iMinute < 60) {
                this.minutes.push(new Minute(iMinute += plusMinutes, -1));
            }
        }

        getMinuteById(id) {
            return this.minutes[id];
        }

        setIsGoodWorkById(id, val) {
            this.minutes[id].isGoodWork = val;
        }
    }