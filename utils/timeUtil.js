'use strict';
let moment = require('moment');
class timeUtil {

    /**
     *
     * @param index
     * @param type hours 小时 days 天 weeks 周 months 月 years 年
     * @returns {moment.Moment}
     */
    static add(index,type) {
        return moment(new Date()).add(index, type);
    }
    static subtract(index,type) {
        return moment(new Date()).subtract(index, type);
    }
}


module.exports = timeUtil;
