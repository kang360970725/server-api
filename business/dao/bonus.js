let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    //添加分红支付记录
    static async payments(connection, query) {
        let sql = () => `
        INSERT INTO 
        platform_bonus(
        account,
        create_time,
        price,
        base,
        type,
        \`desc\`
        ) 
        VALUES (?,?,?,?,2,?)
        `;
        let params = [];
        let timeNum = new Date().getTime();
        let time = moment(timeNum).format('YYYY-MM-DD HH:mm:ss');
        params.push(query.account);
        params.push(time);
        params.push(query.price);
        params.push(query.base);
        params.push('API提供，第三方(许总会员支付分红记录)：' + query.desc);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
}

module.exports = dao