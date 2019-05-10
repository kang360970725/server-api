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
        user_account = \'${query.account}\'
        AND bot_type = \'${query.bot_type}\'
        ;
        `;
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async getExchange(connection, query) {
        var params = [];
        let sql = () => `
        SELECT 
        api,secret,bot_type
        FROM 
        robot_parameter 
        WHERE 
        user_account = \'${query.account}\'
        ;
        `;
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    //编辑交易所参数
    static async exitExchange(connection, param) {
        let sql = () => `
        UPDATE 
        robot_parameter 
        SET 
        api=\'${param.api}\',
        secret=\'${param.secret}\' 
        WHERE user_account = ? 
        AND bot_type = ?
        `;
        var params = [];
        params.push(param.currentUser.account);
        params.push(param.bot_type);
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
        AND bot_type = ?
        `;
        var params = [];
        params.push(param.currentUser.account);
        params.push(param.bot_type);
        console.log(params);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //系统推荐的bot配置数据
    static async setBotPramRec(connection, param) {
        let sql = () => `
        UPDATE 
        robot_parameter 
        SET 
        api=\'${param.api}\',
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
        AND bot_type = ?
        `;
        var params = [];
        params.push(param.currentUser.account);
        params.push(param.bot_type);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
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
        params.push(query._userparam.bot_type);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async saveRotBot(connection, query) { // 查询机器人状态
        let params = [];
        let sql = () => `
            INSERT INTO robot(
            level,
            new_position_qty,
            bot_nanpin,
            max_position_qty,
            nanpin_count,
            status,
            bot_side,
            bot_size,
            bot_avgEntryPrice,
            bot_liquidationPrice,
            bot_mex_last,
            bot_balance,
            user_account,
            type,
            bot_prevDeposited,
            bot_prevWithdrawn,
            bot_amount,
            bot_lirun) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,?
            )
            ON
            DUPLICATE KEY
            UPDATE
            level=VALUES(level),
            new_position_qty=VALUES(new_position_qty),
            max_position_qty=VALUES(max_position_qty),
            bot_nanpin=VALUES(bot_nanpin),
            nanpin_count=VALUES(nanpin_count),
            status=VALUES(status),
            bot_side=VALUES(bot_side),
            bot_size=VALUES(bot_size),
            bot_avgEntryPrice=VALUES(bot_avgEntryPrice),
            bot_liquidationPrice=VALUES(bot_liquidationPrice),
            bot_mex_last=VALUES(bot_mex_last),
            bot_balance=VALUES(bot_balance),
            user_account=VALUES(user_account),
            type=VALUES(type)
            ,
            bot_prevDeposited=VALUES(bot_prevDeposited)
            ,
            bot_prevWithdrawn=VALUES(bot_prevWithdrawn)
            ,
            bot_amount=VALUES(bot_amount)
            ,
            bot_lirun=VALUES(bot_lirun);
            ;
        `;
        params.push(query._userparam.bot_version);
        params.push(query._userparam.entry);
        params.push(query._userparam.nanpin)
        params.push(query._userparam.maxleverage);
        params.push(query._userparam.nanpin_count);
        params.push(query._userparam.status);
        params.push(query._userparam.bot_side);
        params.push(query._userparam.bot_size);
        params.push(query._userparam.bot_avgEntryPrice);
        params.push(query._userparam.bot_liquidationPrice);
        params.push(query.btcPrice.quotationBTCPrice.mex_last);
        params.push(query._userassets.bot_balance);
        params.push(query.account);
        params.push(query._userparam.bot_type);
        params.push(query._userassets.bot_prevDeposited);
        params.push(query._userassets.bot_prevWithdrawn);
        params.push(query._userassets.bot_amount);
        params.push(query._userassets.bot_lirun);

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
        let time = query.timeType == 1 ?"day":"hour";

        let where = [];
        let sql = () => `
            SELECT * , ${time}(e.bot_set_time) as ${time}
             FROM (
            SELECT * FROM account_record 
            WHERE 
            ${where.join(' AND ')}
            ORDER BY bot_set_time DESC
            ) e  GROUP BY ${time}(e.bot_set_time) ORDER BY bot_set_time DESC ${limit};
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
            
            ORDER BY bot_set_time DESC ) e 
            GROUP BY day ,bot_type 
            ORDER BY day
            desc ${limit};
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
        if (query.date) {
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
                DAY ) c where c.DAY = DATE_SUB(DATE_FORMAT(NOW(),'%Y-%m-%d'),INTERVAL ? ${day}) ) a ,
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
                DAY ) c where c.DAY = DATE_SUB(DATE_FORMAT(NOW(),'%Y-%m-%d'),INTERVAL ? ${day}) ) b ;
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






