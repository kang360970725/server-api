let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    static async add(connection, query) {
        let sql = () => ` 
        INSERT INTO sys_config ( sys_type, sys_value) VALUES (?, ?);
        `;
        let params = [];
        params.push(query.type);
        params.push(query.value);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async update(connection, query) {
        let set = [];
        let params = [];
        let sql = () => `
        UPDATE sys_config 
        SET
        ${set.join(' , ')}
        WHERE
        id = ?
        `;

        if (!str.isEmpty(query.type)) {
            set.push('sys_type = ?');
            params.push(query.type)
        }
        if (!str.isEmpty(query.value)) {
            set.push('sys_value = ?');
            params.push(query.value)
        }
        params.push(query.id)
        if (set.length <= 0 || params.length <= 0) {
            return 0;
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async query(connection, query) {
        let params = [];
        let where = [];
        var limit = "LIMIT ";
        let sql = () => `
        SELECT * FROM  ( SELECT * FROM sys_config 
        WHERE
        ${where.join(" AND ")}
        order by createtime DESC
        ${limit}
        ) A
	    GROUP BY sys_type
        ;
        `;
        where.push(" 1 = 1 ")
        if (!str.isEmpty(query.id)) {
            where.push(" id = ? ")
            params.push(query.id);
        }
        if (!str.isEmpty(query.type)) {
            where.push(" sys_type = ? ")
            params.push(query.type);
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
}

module.exports = dao