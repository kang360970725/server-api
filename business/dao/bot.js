let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    static async getBots(connection, query) { // 查询机器人状态
        var params = [];
        let sql = () => `
            SELECT 
            b.*, 
            r.shortrange,
            r.longrange 
            FROM robot b 
            LEFT JOIN (SELECT shortrange,longrange,user_account FROM robot_parameter) AS r ON 
            r.user_account = b.user_account WHERE b.user_account = ?
            group by b.type
            ;
        `;
        params.push(query.currentUser.account);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async getBotParameter(connection, query) { // 查询机器人参数
        var params = [];

        let sql = () => `
            SELECT shortrange, longrange , user_account FROM robot_parameter WHERE user_account = ?
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

    static async getPoolList(connection, query) { // 查询矿池列表
        var params = [];

        let sql = () => `
            SELECT
                GROUP_CONCAT(r.pool_id) As pools
            FROM
                 user_pool_record r
            LEFT JOIN user_union_info b ON r.union_id = b.id
            WHERE
                b.is_valid = 0
            AND b.user_id = ?
            and b.user_info_type = 2
            ;
        `;
        params.push(query.currentUser.uuid);
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

    static async saveRecord(connection, query) { // 查询机器人状态
        let params = [];
        let sql = () => `
            INSERT INTO ${query.tableName} (
            user_account,
            bot_balance,
            bot_change_num,
            bot_side,
            bot_size,
            bot_avgEntryPrice,
            bot_liquidationPrice,
            bot_mex_last,
            bot_set_time,
            bot_warn_state,
            bot_warn_txt,
            type,
            bonus_base,bot_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;
        params.push(query.account);
        params.push(query._userassets.bot_balance);
        params.push("")
        params.push(query._userparam.bot_side);
        params.push(query._userparam.bot_size);
        params.push(query._userparam.bot_avgEntryPrice);
        params.push(query._userparam.bot_liquidationPrice);
        params.push(query.btcPrice.quotationBTCPrice.mex_last);
        params.push(query._userparam.now);
        params.push("");
        params.push(query._userparam.status);
        params.push("");
        params.push(query._userassets.bot_lirun);
        params.push(query._userassets.bot_type);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async getAccRecordChart(connection, query) { // 查询机器人状态
        let params = [];
        let limit = "LIMIT ";
        let where = [];
        let sql = () => `
            SELECT * , HOUR(e.bot_set_time) as hour
             FROM (
            SELECT * FROM account_record 
            WHERE 
            ${where.join(' AND ')}
            ORDER BY bot_set_time DESC
            ) e  GROUP BY HOUR(e.bot_set_time),bot_type ORDER BY bot_set_time asc ${limit};
        `;

        params.push(query.account);
        where.push(' user_account = ? ');

        if (!str.isEmpty(query.botType)) {
            where.push(' bot_type = ? ');
            params.push(query.botType);
        }

        if (!str.isEmpty(query.limit)) {
            limit += `${query.limit}`;
        } else {
            limit = "";
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async getAccRecordList(connection, query) { // 查询机器人状态
        let params = [];
        let limit = "LIMIT ";
        let where = [];
        let sql = () => `
            select * , DATE_FORMAT(e.bot_set_time,'%Y-%m-%d') as day from 
            (SELECT * FROM account_record WHERE 
            ${where.join(' AND ')}
            
            ORDER BY bot_set_time DESC) e 
            GROUP BY day ,bot_type desc ${limit};
        `;
        params.push(query.account);
        where.push(' user_account = ? ');

        if (!str.isEmpty(query.botType)) {
            where.push(' bot_type = ? ');
            params.push(query.botType);
        }
        if (str.isEmpty(query.pageIndex) || str.isEmpty(query.pageSize)) {
            limit = "";
        } else {
            limit += `${(query.pageIndex) * query.pageSize}, ${query.pageSize}`;
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async getAccRecordListCount(connection, query) { // 查询机器人状态
        let params = [];
        let sql = () => `
            SELECT count(1) as count from 
            (SELECT DATE_FORMAT(e.bot_set_time,'%Y-%m-%d') as day from 
            (SELECT * FROM account_record WHERE user_account = ?) e GROUP BY day ,bot_type) a;;
        `;
        params.push(query.account);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async calcAccRecordByDay(connection, query) { // 查询机器人状态
        let params = [];
        let day = " day ";
        if(query.date){
            day = query.date;
        }
        let sql = () => `
            select a.bonus_base - b.bonus_base as bonus_base from (select * from (SELECT
                sum(bonus_base) as bonus_base,
                DATE_FORMAT(e.bot_set_time, '%Y-%m-%d') AS DAY
            FROM
                (
                    SELECT
                        bot_set_time,bonus_base
                    FROM
                        account_record
                    WHERE
                        user_account = '${query.account}'
                    ORDER BY
                        bot_set_time DESC
                ) e
            
            GROUP BY
                DAY ,bot_type) c where c.DAY = DATE_SUB(DATE_FORMAT(NOW(),'%Y-%m-%d'),INTERVAL ? ${day}) ) a ,
            (select * from (SELECT
                sum(bonus_base) as bonus_base,
                DATE_FORMAT(e.bot_set_time, '%Y-%m-%d') AS DAY
            FROM
                (
                    SELECT
                        bot_set_time,bonus_base
                    FROM
                        account_record
                    WHERE
                        user_account = '${query.account}'
                    ORDER BY
                        bot_set_time DESC
                ) e
            
            GROUP BY
                DAY ,bot_type) c where c.DAY = DATE_SUB(DATE_FORMAT(NOW(),'%Y-%m-%d'),INTERVAL ? ${day}) ) b ;
        `;
        params.push(query.day1);
        params.push(query.day2);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
}


module.exports = dao;






