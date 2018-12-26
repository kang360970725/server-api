let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    static async getBots(connection, query) {
        var params = [];

        let sql = () => `
            SELECT 
            b.*, 
            r.shortrange,
            r.longrange 
            FROM robot b 
            LEFT JOIN (SELECT shortrange,longrange,user_account FROM robot_parameter) AS r ON 
            r.user_account = b.user_account WHERE b.user_account = ?
            ;
        `;
        params.push(query.account);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async getBotPram(connection, query) {
        var params = [];

        let sql = () => `
        SELECT 
        * 
        FROM 
        robot_parameter 
        WHERE 
        user_account = \'${query.account}\';
        `;
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    //写入用户默认bot配置数据
    static async setBotPram(connection, param) {
        let sql = () => `
        UPDATE 
        robot_parameter 
        SET 
        api=\'${param.api}\',
        secret=\'${param.secret}\',
        open=\'${param.open}\',
        entry=\'${param.entry}\',
        trendfollow=\'${param.trendfollow}\',
        mm=\'${param.mm}\',
        mmpercent=\'${param.mmpercent}\',
        nanpin=\'${param.nanpin}\',
        maxnanpin=\'${param.maxnanpin}\',
        mmnanpin=\'${param.mmnanpin}\',
        maxleverage=\'${param.maxleverage}\',
        leverage=\'${param.leverage}\',
        sleep=\'${param.sleep}\',
        longrange=\'${param.longrange}\',
        longstop=\'${param.longstop}\',
        shortrange=\'${param.shortrange}\',
        shortstop=\'${param.shortstop}\',
        losscut=\'${param.losscut}\',
        time=\'${param.time}\',
        longstopx=\'${param.longstopx}\',
        shortstopx=\'${param.shortstopx}\',
        longorder=\'${param.longorder}\',
        shortorder=\'${param.shortorder}\',
        nanpin_cancel=\'${param.nanpin_cancel}\',
        nanpin_order=\'${param.nanpin_order}\',
        doten=\'${param.doten}\' 
        WHERE user_account = ?
        `;
        var params = [];
        params.push(param.account);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                console.log(err);
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
}


module.exports = dao;






