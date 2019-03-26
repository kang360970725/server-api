let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    //添加活动主数据
    static async addMain(connection, query) {
        let sql = () => `
        INSERT INTO 
        activity_main (
        activity_name, 
        activity_title, 
        activity_code, 
        activity_content, 
        start_time,
        end_time,type)
        VALUES 
        (?, ?, ?, ?, ?, ?,?);
        `;
        let params = [];
        params.push(query.name);
        params.push(query.title);
        params.push(query.code);
        params.push(query.content);
        params.push(query.startTime);
        params.push(query.endTime);
        params.push(query.type);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async updateMain(connection, query) {
        var set = [];
        var where = [];
        let params = [];
        let sql = () => `
        UPDATE activity_main 
        SET
        ${set.join(' , ')}
        WHERE
        ${where.join(' and ')}
        `;
        if (!str.isEmpty(query.name)) {
            set.push('activity_name = ?');
            params.push(query.name)
        }
        if (!str.isEmpty(query.title)) {
            set.push('activity_title = ?');
            params.push(query.title)
        }
        if (!str.isEmpty(query.code)) {
            set.push('activity_code = ?');
            params.push(query.code)
        }
        if (!str.isEmpty(query.content)) {
            set.push('activity_content = ?');
            params.push(query.content)
        }
        if (!str.isEmpty(query.startTime)) {
            set.push('start_time = ?');
            params.push(query.startTime)
        }
        if (!str.isEmpty(query.endTime)) {
            set.push('end_time = ?');
            params.push(query.endTime)
        }

        if (!str.isEmpty(query.forbidden)) {
            set.push('activity_forbidden = ?');
            params.push(query.forbidden)
        }

        where.push('activity_id = ?')
        params.push(query.id)
        if (set.length <= 0 || str.isEmpty(query.id)) {
            return 0;
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async queryMain(connection, query) {
        let where = [];
        let content = [];
        var limit = "LIMIT ";
        let sql = () => `
        SELECT 
        ${content.join(' , ')}
        FROM activity_main
        WHERE ${where.join(' and ')}
        
        ${limit};
        `;
        let params = [];
        content.push(' activity_id ');
        content.push(' activity_name ');
        content.push(' activity_title ');
        content.push(' activity_code ');
        if (!str.isEmpty(query.content)) {
            content.push(' content ');
        }
        where.push(' 1 = 1 ');
        if (!str.isEmpty(query.forbidden)) {
            where.push(' activity_forbidden = ? ');
            params.push(query.forbidden);
        }

        if (!str.isEmpty(query.id)) {
            where.push(' activity_id = ? ');
            params.push(query.id);
        }

        if (!str.isEmpty(query.name)) {
            where.push(' activity_name like ? ');
            params.push("%" + query.name + "%");
        }
        if (!str.isEmpty(query.title)) {
            where.push(' activity_title like ? ');
            params.push("%" + query.title + "%");
        }
        if (!str.isEmpty(query.code)) {
            where.push(' activity_code = ? ');
            params.push(query.code);
        }

        if (!str.isEmpty(query.type)) {
            where.push(' type = ? ');
            params.push(query.type);
        }

        if (query.startTime) {
            where.push(' start_time >= ? ');
            params.push(query.startTime);
        }

        if (query.endTime) {
            where.push(' end_time <= ? ');
            params.push(query.endTime);
        }

        limit += `${(query.pageIndex) * query.pageSize}, ${query.pageSize}`;

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async queryMainCount(connection, query) {
        let where = [];
        let sql = () => `
        SELECT 
        count(1) as count
        FROM activity_main
        WHERE ${where.join(' and ')}
        `;
        let params = [];
        where.push(' 1 = 1 ');
        if (!str.isEmpty(query.forbidden)) {
            where.push(' activity_forbidden = ? ');
            params.push(query.forbidden);
        }

        if (!str.isEmpty(query.id)) {
            where.push(' activity_id = ? ');
            params.push(query.id);
        }

        if (!str.isEmpty(query.name)) {
            where.push(' activity_name like ? ');
            params.push("%" + query.name + "%");
        }
        if (!str.isEmpty(query.title)) {
            where.push(' activity_title like ? ');
            params.push("%" + query.title + "%");
        }
        if (!str.isEmpty(query.code)) {
            where.push(' activity_code = ? ');
            params.push(query.code);
        }

        if (!str.isEmpty(query.type)) {
            where.push(' type = ? ');
            params.push(query.type);
        }

        if (query.startTime) {
            where.push(' start_time >= ? ');
            params.push(query.startTime);
        }

        if (query.endTime) {
            where.push(' end_time <= ? ');
            params.push(query.endTime);
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //添加活动信息数据
    static async addInfo(connection, query) {
        let sql = () => `
        INSERT INTO 
        activity_info (
        activity_id, 
        info_type, 
        info_value, 
        info_explain)
        VALUES 
        (?, ?, ?, ?);
        `;
        let params = [];
        params.push(query.id);
        params.push(query.type);
        params.push(query.value);
        params.push(query.explain);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    //添加活动信息数据
    static async deleteInfo(connection, query) {
        let params = [];
        let where = [];
        let sql = () => `
        DELETE FROM activity_info WHERE ${where.join(' and ')}
        `;

        if (!str.isEmpty(query.id)) {
            where.push("activity_id = ?");
            params.push(query.id);
        }
        if (!str.isEmpty(query.infoId)) {
            where.push("id = ?");
            params.push(query.infoId);
        }

        if (where.length <= 0) {
            return;
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async updateInfo(connection, query) {
        let set = [];
        let where = [];
        let params = [];
        let sql = () => `
        UPDATE activity_info 
        SET
        ${set.join(' , ')}
        WHERE
        ${where.join(' and ')}
        `;
        if (!str.isEmpty(query.value)) {
            set.push('info_value = ?');
            params.push(query.value)
        }
        if (!str.isEmpty(query.explain)) {
            set.push('info_explain = ?');
            params.push(query.explain)
        }
        if (!str.isEmpty(query.type)) {
            set.push('info_type = ?');
            params.push(query.type)
        }
        if (!str.isEmpty(query.id)) {
            where.push('id = ?');
            params.push(query.id)
        }
        if (!str.isEmpty(query.mainId)) {
            where.push('activity_id = ?');
            params.push(query.mainId)
        }
        if (set.length <= 0 || where.length <= 0 || params.length <= 0) {
            return 0;
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async queryInfo(connection, query) {
        let where = [];
        let sql = () => `
        SELECT 
        *
        FROM activity_info
        WHERE ${where.join(' AND ')}
        `;
        let params = [];
        params.push(' 1 = 1 ');
        if (!str.isEmpty(query.id)) {
            where.push(' activity_id = ? ');
            params.push(query.id);
        }

        if (!str.isEmpty(query.types)) {
            let types = query.types.split(',')
            where.push(` info_type in ( ${types.join(',')} ) `);
            // params.push(query.type);
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