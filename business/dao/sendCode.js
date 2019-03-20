let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    //验证码发送成功，写入记录
    static async sendCode(connection, query) {
        let sql = () => `INSERT 
        INTO 
        code_verification(code,account,type,endtime,terminal) 
        VALUES (?,?,?,?,?)
        `;
        let params = [];
        let data = new Date();
        data.setMinutes(data.getMinutes() + 5);
        let time = moment(data).format('YYYY-MM-DD HH:mm:ss');
        params.push(query.code);
        params.push(query.account);
        params.push(query.busType);
        params.push(time);
        params.push(query.terminal);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
}

module.exports = dao