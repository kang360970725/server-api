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
        content.push(' creat_time ');
        content.push(' `desc` ');
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
            content.push(' type ');
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
        where.push(' 1 = 1 ');
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


    //添加活动信息数据
    static async addUserUnion(connection, query) {
        let sql = () => `
        INSERT INTO 
        user_union_info
        (user_id, 
        user_info_type,
        user_info_union,
        end_time,
        is_valid
        ) VALUES 
        (?,?,?,?,?);
        `;
        let params = [];
        params.push(query.id);
        params.push(query.type);
        params.push(query.value);
        params.push(query.endTime);
        params.push(query.isValid);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //添加记录
    static async addRenew(connection, query) {
        let sql = () => `
        INSERT INTO pay_record(account,create_time,type,\`desc\`,price,data_time) VALUES (?,now(),?,?,?,?);
        `;
        let params = [];
        params.push(query.account);
        params.push(query.type);
        params.push(query.desc);
        params.push(query.price);
        params.push(query.id);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //添加记录
    static async addPool(connection, query) {
        let fields = [];
        let values = [];
        let params = [];
        let sql = () => `
        INSERT INTO user_pool_record
        ( ${fields.join(" , ")})
        VALUES 
        ( ${values.join(" , ")});
        `;
        if (!str.isEmpty(query.uuid)) {
            fields.push("user_uuid")
            values.push("?")
            params.push(query.uuid)
        }

        if (!str.isEmpty(query.relname)) {
            fields.push("user_relname")
            values.push("?")
            params.push(query.relname)
        }

        if (!str.isEmpty(query.phone)) {
            fields.push("user_phone")
            values.push("?")
            params.push(query.phone)
        }
        if (!str.isEmpty(query.email)) {
            fields.push("user_email")
            values.push("?")
            params.push(query.email)
        }
        if (!str.isEmpty(query.amount)) {
            fields.push("amount")
            values.push("?")
            params.push(query.amount)
        }
        if (!str.isEmpty(query.updatetime)) {
            fields.push("updatetime")
            values.push("?")
            params.push(query.updatetime)
        }
        if (!str.isEmpty(query.poolId)) {
            fields.push("pool_id")
            values.push("?")
            params.push(query.poolId)
        }
        if (!str.isEmpty(query.unionId)) {
            fields.push("union_id")
            values.push("?")
            params.push(query.unionId)
        }
        if (!str.isEmpty(query.desc)) {
            fields.push("desc")
            values.push("?")
            params.push(query.desc)
        }
        if (fields.length <= 0 || values.length <= 0 || params.length <= 0) {
            return;
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async updateUserUnion(connection, query) {
        let set = [];
        let params = [];
        let sql = () => `
        UPDATE user_union_info 
        SET
        ${set.join(' , ')}
        WHERE
        id = ?
        `;

        if (!str.isEmpty(query.endTime)) {
            set.push('end_time = ?');
            params.push(query.endTime)
        }
        if (!str.isEmpty(query.isValid)) {
            set.push('is_valid = ?');
            params.push(query.isValid)
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

    //添加记录
    static async updateRenew(connection, query) {
        let params = [];
        let sets = [];
        let sql = () => `
        UPDATE pay_record 
        SET 
        ${sets.join(" , ")}
        WHERE 
        id = ?
        ;
        `;

        if (!str.isEmpty(query.credential)) {
            sets.push(" credential= ? ")
            params.push(query.credential);
        }
        if (!str.isEmpty(query.type)) {
            sets.push(" type= ? ")
            params.push(query.type);
        }
        if (!str.isEmpty(query.desc)) {
            sets.push(" `desc` = ? ")
            params.push(query.desc);
        }
        if (!str.isEmpty(query.price)) {
            sets.push(" price = ? ")
            params.push(query.price);
        }
        params.push(query.id);
        if (sets.length <= 0) {
            return
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

//添加记录
    static async queryRenew(connection, query) {
        let params = [];
        let where = [];
        var limit = "LIMIT ";
        let sql = () => `
        SELECT * FROM pay_record 
        WHERE
        ${where.join(" AND ")}
        order by create_time DESC
        ${limit}
        ;
        `;
        where.push(" 1 = 1 ")
        if (!str.isEmpty(query.id)) {
            where.push(" id = ? ")
            params.push(query.id);
        }
        if (!str.isEmpty(query.account)) {
            where.push(" account = ? ")
            params.push(query.account);
        }
        if (!str.isEmpty(query.unionId)) {
            where.push(" data_time = ? ")
            params.push(query.unionId);
        }
        if (!str.isEmpty(query.type)) {
            where.push(" type = ? ")
            params.push(query.type);
        }else if(str.isEmpty(query.id)){
            where.push(" type <> -1 ")
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


    //添加记录
    static async updatePool(connection, query) {
        let params = [];
        let sets = [];
        let sql = () => `
        UPDATE user_pool_record 
        SET 
        ${sets.join(" , ")}
        WHERE 
        id = ?
        ;
        `;

        if (!str.isEmpty(query.relname)) {
            sets.push(" user_relname = ? ")
            params.push("%" + query.relname + "%");
        }

        if (!str.isEmpty(query.nickname)) {
            sets.push(" user_nickname = ? ")
            params.push("%" + query.nickname + "%");
        }

        if (!str.isEmpty(query.phone)) {
            sets.push(" user_phone = ? ")
            params.push("%" + query.phone + "%");
        }

        if (!str.isEmpty(query.email)) {
            sets.push(" user_email = ? ")
            params.push("%" + query.email + "%");
        }

        if (!str.isEmpty(query.amount)) {
            sets.push(" amount = ? ")
            params.push(query.amount);
        }

        if (!str.isEmpty(query.poolId)) {
            sets.push(" pool_id = ? ")
            params.push(query.poolId);
        }
        if (!str.isEmpty(query.token)) {
            sets.push(" token = ? ")
            params.push(query.token);
        }
        params.push(query.id);

        if (sets.length <= 0) {
            return
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    //添加记录
    static async queryPool(connection, query) {
        let params = [];
        let where = [];
        var limit = "LIMIT ";
        let sql = () => `
        SELECT * FROM user_pool_record 
        WHERE
        ${where.join(" AND ")}
        order by updatetime DESC,createtime DESC
        ${limit}
        ;
        `;
        where.push(" 1 = 1 ")
        if (!str.isEmpty(query.id)) {
            where.push(" id = ? ")
            params.push(query.id);
        }

        if (!str.isEmpty(query.uuid)) {
            where.push(" user_uuid = ? ")
            params.push(query.uuid);
        }

        if (!str.isEmpty(query.relname)) {
            where.push(" user_relname like ? ")
            params.push("%" + query.relname + "%");
        }

        if (!str.isEmpty(query.nickname)) {
            where.push(" user_nickname like ? ")
            params.push("%" + query.nickname + "%");
        }

        if (!str.isEmpty(query.phone)) {
            where.push(" user_phone like ? ")
            params.push("%" + query.phone + "%");
        }

        if (!str.isEmpty(query.email)) {
            where.push(" user_email like ? ")
            params.push("%" + query.email + "%");
        }

        if (!str.isEmpty(query.poolId)) {
            if(query.poolId == "ALL"){
                where.push(` pool_id is not null `);
            }else{
                let poolIds = query.poolId.split(',')
                where.push(` pool_id in ( ${poolIds.join(',')} ) `);
            }
        }else{
            where.push(" pool_id is null ")
        }

        if (!str.isEmpty(query.unionId)) {
            where.push(" union_id = ? ")
            params.push(query.unionId);
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

    static async queryUserUnion(connection, query) {
        let where = [];
        var limit = "LIMIT ";
        let sql = () => `
        SELECT 
        *
        FROM user_union_info
        WHERE ${where.join(' AND ')}
        order by creat_time desc 
        ${limit}
        `;
        let params = [];
        params.push(' 1 = 1 ');
        if (!str.isEmpty(query.id)) {
            where.push(' id = ? ');
            params.push(query.id);
        }

        if (!str.isEmpty(query.uuid)) {
            where.push(' user_id = ? ');
            params.push(query.uuid);
        }

        if (!str.isEmpty(query.types)) {
            let types = query.types.split(',')
            where.push(` user_info_type in ( ${types.join(',')} ) `);
        }

        if (!str.isEmpty(query.endTime)) {
            where.push(' end_time <= ? ');
            params.push(query.endTime);
        }

        if (!str.isEmpty(query.isValid)) {
            where.push(' is_valid = ? ');
            params.push(query.isValid);
        } else if(str.isEmpty(query.id)) {
            where.push(' is_valid <> -1 ');
        }
        if(where.length<=0){
            return
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