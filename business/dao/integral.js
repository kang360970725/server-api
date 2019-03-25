let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    //添加活动主数据
    static async creatIntegral(connection, query) {
        let sql = () => `
        INSERT INTO 
        user_integral (
        user_uuid)
        VALUES 
        (?)
        ON
		DUPLICATE KEY
		UPDATE
		${set.join(' , ')}
        ;
        `;
        let params = [];
        let set = [];
        params.push(query.id);
        set.push('id=VALUES(id)')
        if (!str.isEmpty(query.integral) && query.integral > 0) {
            params.push(query.integral)
            params.push(query.integral)
            set.push('integral_total= VALUES(integral_total) + ?')
            set.push('integral_current=VALUES(integral_current) + ?')
        } else if (query.integral <= 0) {
            params.push(query.integral)
            set.push('integral_current=VALUES(integral_current) + ?')
        } else {
            return;
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    //添加活动主数据
    static async creatIntegralInfo(connection, query) {
        let sql = () => `
        INSERT INTO 
        user_integral_info (
        user_uuid,integral,integral_explain)
        VALUES 
        (?,?,?)
        ;
        `;
        let params = [];

        params.push(query.id);
        params.push(query.integral);
        params.push(query.explain);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async queryIntegral(connection, query) {
        let where = [];
        let sql = () => `
        SELECT *
        FROM user_integral
        WHERE ${where.join(' AND ')} ;
        `;
        let params = [];
        where.push(' 1 = 1 ')
        if (!str.isEmpty(query.id)) {
            where.push(' user_uuid = ?  ')
            params.push(query.id)
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async queryIntegralInfo(connection, query) {
        let where = [];
        let sql = () => `
        SELECT *
        FROM user_integral_info
        WHERE ${where.join(' AND ')};
        `;
        let params = [];
        where.push(' 1 = 1 ')
        if (!str.isEmpty(query.id)) {
            where.push(' user_uuid = ?  ')
            params.push(query.id)
        }

        if (!str.isEmpty(query.startTime)) {
            where.push('creattime >= ?')
            params.push(query.startTime)
        }
        if (!str.isEmpty(query.endTime)) {
            where.push('creattime <= ?')
            params.push(query.endTime)
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

}

module.exports = dao