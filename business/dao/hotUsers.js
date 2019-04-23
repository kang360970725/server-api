let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    //查询热门用户榜单
    static async getHotUserList(connection, query) {
        let sql = () => `
        SELECT
            a.account,
            a.uuid,
            a.nickname,
            c.bot_amount,
            c.bot_lirun,
            c.bot_prevDeposited,
            c.bot_prevWithdrawn
        FROM
            users a
        LEFT JOIN robot c ON a.account = c.user_account
        WHERE
            a.popular_user = 1 AND a.level < 5 AND c.bot_amount IS NOT NULL
        ORDER BY
            c.bot_amount DESC
        LIMIT ?,?
        `;
        let params = [];
        params.push((parseInt(query.index)) * parseInt(query.pagesize));
        params.push(parseInt(query.pagesize));
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
    //统计热门用户榜单总数
    static async getHotUserListCount(connection, query) {
        let sql = () => `
        SELECT
            count(1) as count
        FROM
            users a
        LEFT JOIN robot c ON a.account = c.user_account
        WHERE
            a.popular_user = 1 AND a.level < 5 AND c.bot_amount IS NOT NULL
        ORDER BY
            c.bot_amount DESC
        `;
        let params = [];
        params.push((parseInt(query.index) - 1) * parseInt(query.pagesize));
        params.push(parseInt(query.pagesize));
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result[0].count);
            });
        })
    }


    //查询排行榜榜单
    static async getRankingUserList(connection, query) {
        let sql = () => `
        SELECT
            c.*, a.uuid,a.nickname,
            IFNULL(b.integral_current, 0) AS current,
            IFNULL(b.integral_total, 0) AS total
        FROM
            robot c
        LEFT JOIN users a ON a.account = c.user_account
        LEFT JOIN user_integral b ON a.uuid = b.user_uuid
        ORDER BY
            c.bot_lirun DESC
        LIMIT 0,10
        `;
        let params = [];
        // params.push((parseInt(query.index) - 1) * parseInt(query.pagesize));
        // params.push(parseInt(query.pagesize));
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
    //统计热门用户榜单总数
    static async getRankingUserListCount(connection, query) {
        let sql = () => `
        SELECT
            count(1) as count
        FROM
            users a
        LEFT JOIN robot c ON a.account = c.user_account
        WHERE
            a.popular_user = 1 AND a.level < 5 AND c.bot_amount IS NOT NULL
        ORDER BY
            c.bot_amount DESC
        `;
        let params = [];
        params.push((parseInt(query.index)) * parseInt(query.pagesize));
        params.push(parseInt(query.pagesize));
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result[0].count);
            });
        })
    }
}

module.exports = dao