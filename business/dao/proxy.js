let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    //添加申请
    static async addProxy(connection, query) {
        let sql = () => `
        INSERT INTO 
        user_proxy_apply (
        user_id, 
        user_name, 
        user_phone, 
        user_email 
        )
        VALUES 
        (?, ?, ?, ?);
        `;
        let params = [];
        params.push(query.uuid);
        params.push(query.name);

        if(!str.isEmpty(query.phone)){
            params.push(query.phone);
        }else{
            params.push('');
        }

        if(!str.isEmpty(query.email)){
            params.push(query.email);
        }else{
            params.push('');
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject("重复录入");
                resolve(result);
            });
        })
    }

    static async updateProxy(connection, query) {
        var set = [];
        var where = [];
        let params = [];
        let sql = () => `
        UPDATE user_proxy_apply 
        SET
        ${set.join(' , ')}
        WHERE
        ${where.join(' and ')}
        `;
        if (!str.isEmpty(query.name)) {
            set.push('user_name = ?');
            params.push(query.name)
        }
        if (!str.isEmpty(query.phone)) {
            set.push('user_phone = ?');
            params.push(query.phone)
        }
        if (!str.isEmpty(query.email)) {
            set.push('user_email = ?');
            params.push(query.email)
        }
        if (!str.isEmpty(query.status)) {
            set.push('status = ?');
            params.push(query.status)
        }
        if (!str.isEmpty(query.level)) {
            set.push('proxy_level = ?');
            params.push(query.level)
        }
        if (set.length <= 0 || str.isEmpty(query.id)) {
            return 0;
        }
        set.push('updatetime = ?');
        params.push(new Date())

        where.push('id = ?')
        params.push(query.id)

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async queryProxy(connection, query) {
        let where = [];
        let content = [];
        var limit = "LIMIT ";
        let sql = () => `
        SELECT 
        *
        FROM user_proxy_apply a
        WHERE ${where.join(' and ')}
        order by a.creattime desc
        ${limit};
        `;
        let params = [];

        where.push(' 1 = 1 ');
        if (!str.isEmpty(query.uuid)) {
            where.push(' a.user_id = ? ');
            params.push(query.uuid);
        }

        if (!str.isEmpty(query.id)) {
            where.push(' a.id = ? ');
            params.push(query.id);
        }

        if (!str.isEmpty(query.name)) {
            where.push(' a.user_name like ? ');
            params.push("%" + query.name + "%");
        }
        if (!str.isEmpty(query.phone)) {
            where.push(' a.user_phone like ? ');
            params.push("%" + query.phone + "%");
        }
        if (!str.isEmpty(query.email)) {
            where.push(' a.user_email like ? ');
            params.push("%" + query.email + "%");
        }

        if (!str.isEmpty(query.status)) {
            where.push(' a.status = ? ');
            params.push(query.status);
        }

        if (!str.isEmpty(query.level)) {
            where.push(' a.proxy_level = ? ');
            params.push(query.level);
        }



        if (query.startTime) {
            where.push(' a.creattime >= ? ');
            params.push(query.startTime);
        }

        if (query.endTime) {
            where.push(' a.creattime <= ? ');
            params.push(query.endTime);
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


    static async queryProxyCount(connection, query) {
        let where = [];
        let sql = () => `
        SELECT 
        count(1) as count
        FROM user_proxy_apply a
        WHERE ${where.join(' and ')}
        `;
        let params = [];

        where.push(' 1 = 1 ');
        if (!str.isEmpty(query.uuid)) {
            where.push(' a.user_id = ? ');
            params.push(query.uuid);
        }

        if (!str.isEmpty(query.id)) {
            where.push(' a.id = ? ');
            params.push(query.id);
        }

        if (!str.isEmpty(query.name)) {
            where.push(' a.user_name like ? ');
            params.push("%" + query.name + "%");
        }
        if (!str.isEmpty(query.phone)) {
            where.push(' a.user_phone like ? ');
            params.push("%" + query.phone + "%");
        }
        if (!str.isEmpty(query.email)) {
            where.push(' a.user_email like ? ');
            params.push("%" + query.email + "%");
        }

        if (!str.isEmpty(query.status)) {
            where.push(' a.status = ? ');
            params.push(query.status);
        }

        if (!str.isEmpty(query.level)) {
            where.push(' a.proxy_level = ? ');
            params.push(query.level);
        }

        if (query.startTime) {
            where.push(' a.creattime >= ? ');
            params.push(query.startTime);
        }

        if (query.endTime) {
            where.push(' a.creattime <= ? ');
            params.push(query.endTime);
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