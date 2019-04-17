const str = require("../../utils/stringHelper");

class dao {
    //添加活动信息数据
    static async delete(connection, query) {
        let params = [];
        let where = [];
        let sql = () => `
        DELETE FROM ${query.tableName} WHERE ${where.join(' and ')}
        `;
        if (!str.isEmpty(query.fieldValue)) {
            where.push(`${query.fieldName} = ?`);
            params.push(query.fieldValue);
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
}

module.exports = dao