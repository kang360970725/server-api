let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    //添加申请
    static async addProposal(connection, query) {
        let sql = () => `
        INSERT INTO 
        user_proposal (
        user_id, 
        user_name, 
        user_phone, 
        user_email,
        content,
        type 
        )
        VALUES 
        (?, ?, ?, ?, ? ,?);
        `;
        let params = [];
        if(!str.isEmpty(query.uuid)){
            params.push(query.uuid);
        }else{
            params.push('');
        }
        if(!str.isEmpty(query.name)){
            params.push(query.name);
        }else{
            params.push('');
        }
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

        if(!str.isEmpty(query.content)){
            params.push(query.content);
        }else{
            params.push('');
        }

        if(!str.isEmpty(query.type)){
            params.push(query.type);
        }else{
            params.push(0);
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject("重复录入");
                resolve(result);
            });
        })
    }

    static async updateProposal(connection, query) {
        var set = [];
        var where = [];
        let params = [];
        let sql = () => `
        UPDATE user_proposal 
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
        if (!str.isEmpty(query.content)) {
            set.push('content = ?');
            params.push(query.content)
        }
        if (!str.isEmpty(query.type)) {
            set.push('type = ?');
            params.push(query.type)
        }
        if (!str.isEmpty(query.reply)) {
            set.push('reply = ?');
            params.push(query.reply)
        }

        if (set.length <= 0 || str.isEmpty(query.id)) {
            return 0;
        }

        where.push('id = ?')
        params.push(query.id)

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async queryProposal(connection, query) {
        let where = [];
        var limit = "LIMIT ";
        let sql = () => `
        SELECT 
        *
        FROM user_proposal a
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

        if (!str.isEmpty(query.type)) {
            where.push(' a.type = ? ');
            params.push(query.type);
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


    static async queryProposalCount(connection, query) {
        let where = [];
        let sql = () => `
        SELECT 
        count(1) as count
        FROM user_proposal a
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

        if (!str.isEmpty(query.type)) {
            where.push(' a.type = ? ');
            params.push(query.type);
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