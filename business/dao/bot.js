let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    static async getBots(connection, query) {
        var params = [];

        let sql = () => `
            SELECT 
            b.*, 
            r.shortrange,
            r.longrange 
            FROM robot b 
            LEFT JOIN (SELECT shortrange,longrange,user_account FROM robot_parameter) AS r ON 
            r.user_account = b.user_account WHERE b.user_account = ?
            ;
        `;
        params.push(query.account);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async getUsersByAccount(connection, query) {
        var params = [];

        let sql = () => `
            SELECT
            *
            FROM
            users
            where account = \'${query.account}\'
            ;
        `;
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                console.log(err);
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    //写入用户默认bot配置数据
    static async insertUserBotSetting(connection, query) {
        let sql = () => `
        INSERT INTO robot_parameter
         (
         user_account, 
         \`api\`, 
         \`secret\`,
         \`open\`, 
         entry, 
         trendfollow, 
         mm, 
         mmpercent, 
         nanpin, 
         maxnanpin, 
         mmnanpin, 
         maxleverage, 
         leverage, 
         sleep, 
         longrange, 
         longstop, 
         shortrange, 
         shortstop, 
         losscut, 
         \`time\`, 
         longstopx, 
         shortstopx, 
         longorder, 
         shortorder, 
         nanpin_cancel, 
         nanpin_order, 
         doten
         ) VALUES (
         ?, 
         '', '', '0', '250', '1', '1', '0.0007', '250', '28', '1.25', '50', '0', '40', '80', '28', '80', '28', '1', '5', '1999', '1999', '2', '2', '0', '0', '1'
         )        
        `;
        var params = [];
        params.push(query.account);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                console.log(err);
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
}


module.exports = dao