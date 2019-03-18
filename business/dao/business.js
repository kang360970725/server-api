let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    static async getUsers(connection, query) {
        var where = []
        var params = [];

        let sql = () => `
            SELECT
            *
            FROM
            users
            where type <> ${BUSINESS.delete.notDelete} and ${where.join(' and ')}
            ;
        `;
        if (query.uuId) {
            where.push('uuid = ?');
            params.push(query.uuId);
        }
        // where.push('third_party = 1');
        params.push(query.uuId);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                console.log(result);
                console.log('123');
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
    //添加用户
    static async addUsers(connection, query) {
        var params = [];
        let Invitdcode = s8();

        let sql = () => `
            INSERT INTO users(
            uuid,
            account,
            password,
            email,
            phone,
            nickname,
            Invitcode,
            Invitdcode,
            starttime,
            createtime,
            endtime,
            bot_type,
            third_party,
            type,
            activation_state
            ) 
            VALUES (
            LPAD((select max(a.id)+1 from users a), 7, 0),
            ?,?,?,?,?,?,?,?,?,?,?,1,2,0)
            ;
        `;
        let timeNum = new Date().getTime();
        let time = moment(timeNum).format('YYYY-MM-DD HH:mm:ss');

        let EndTime = timeNum + (86400000 * parseInt(query.openingtime));
        let endTimes = moment(EndTime).format('YYYY-MM-DD HH:mm:ss');
        params.push(query.account);
        params.push('e10adc3949ba59abbe56e057f20f883e');
        params.push(query.email || '');
        params.push(query.phone || '');
        params.push(query.nickname || '');
        params.push(Invitdcode);
        params.push(query.Invitcode || '');
        params.push(time);
        params.push(time);
        params.push(endTimes);
        params.push(query.version);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                console.log(err);
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //添加用户
    static async updatePwd(connection, query) {


        let sql = () => `
            update users set password =? where uuid = ?
        `;
        let params = [];

        if(!str.isEmpty(query.pwd)){
            params.push(query.pwd);
        }

        if(!str.isEmpty(query.uuid)){
            params.push(query.uuid);
        }
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
    //添加token
    static async insertToken(connection, query) {
        let sql = () => `
            INSERT INTO 
            verification(
            account,
            token
            ) 
            VALUES (?,?)
        `;
        var params = [];
        params.push(query.account);
        params.push(query.token);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
    //添加购买记录
    static async insertPay(connection, query) {
        let sql = () => `
            INSERT INTO 
            pay_record(
            account,
            create_time,
            type,
            \`desc\`,
            price,
            data_time
            ) 
            VALUES (?,?,2,'API提供，第三方(许总会员购买记录)',?,?)
        `;
        let params = [];
        let timeNum = new Date().getTime();
        let time = moment(timeNum).format('YYYY-MM-DD HH:mm:ss');
        params.push(query.account);
        params.push(time);
        params.push(query.price);
        params.push(query.openingtime);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
    //获取用户token
    static async getUserTokenFn(connection, query) {
        var params = [];
        let sql = () => `
            SELECT
            *
            FROM
            verification
            where account = ?
        `;

        params.push(query);

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
    //token验证
    static async generateToken(connection, query) {
        var params = [];
        let sql = () => `
            SELECT * FROM verification WHERE account = ? and token = ?
        `;

        params.push(query.account);
        params.push(query.token);

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
    //续费用户
    static async renewUsers(connection, query) {
        var params = [];
        let sql = () => `
        UPDATE users 
        SET 
        endtime=?,
        bot_type=? 
        WHERE account = ? AND uuid = ?
        ;
        `;
        let timeNum = new Date(query.endtime).getTime();

        let EndTime = timeNum + (86400000 * parseInt(query.openingtime));
        let endTimes = moment(EndTime).format('YYYY-MM-DD HH:mm:ss');
        console.log(endTimes);

        params.push(endTimes);
        params.push(query.version);
        params.push(query.account);
        params.push(query.uuId);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    //用户login
    static async login(connection, query) {
        var params = [];
        let sql = () => `
            SELECT u.*,v.token FROM users u left join verification v on u.account = v.account WHERE u.account = ? and u.password = ?
        `;

        params.push(query.account);
        params.push(query.pwd);

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //用户信息
    static async userInfo(connection, query) {
        var params = [];
        let sql = () => `
            SELECT u.* FROM user_union_info u
             
            WHERE u.user_id = ? and u.user_info_type = ?
        `;
        params.push(query.user_id);
        params.push(query.user_info_type);

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //用户
    static async isExistUser(connection, query) {
        var params = [];
        var where = [];
        let sql = () => `
            SELECT * FROM users WHERE ${where.join(' and ')}
            
        `;
        if(!str.isEmpty(query.account)){
            where.push('account = ?')
            params.push(query.account);
        }

        if(!str.isEmpty(query.invitcode)){
            where.push('Invitcode = ?')
            params.push(query.invitcode);
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //用户
    static async isExistUser(connection, query) {
        var params = [];
        var where = [];
        let sql = () => `
            SELECT * FROM users WHERE ${where.join(' and ')}
            
        `;
        if(!str.isEmpty(query.account)){
            where.push('account = ?')
            params.push(query.account);
        }

        if(!str.isEmpty(query.invitcode)){
            where.push('Invitcode = ?')
            params.push(query.invitcode);
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //校验验证码
    static async verification(connection, query) {
        var params = [];
        let sql = () => `
            SELECT * FROM code_verification WHERE code = ? AND account = ? AND type = ? AND endtime > ?
        `;
        params.push(query.code);
        params.push(query.account);
        params.push(query.type);
        params.push(query.createTime);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //log
    static async insertLogs(connection, query) {
        var params = [];
        let sql = () => `
            INSERT INTO logs(type,create_time,\`desc\`) VALUES (?,?,?)
        `;

        params.push(query.type);
        params.push(new Date());
        params.push(query.desc);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
}
function s8() {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    // for (var j = 0; j < line; j++) {    //500为想要产生的行数
    let result = "";
    for (var i = 0; i < 8; i++) {   //产生8位就使i<8
        let r = Math.floor(Math.random() * 62);     //16为数组里面数据的数量，目的是以此当下标取数组data里的值！
        result += data[r];        //输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。
    }
    return result;
}

module.exports = dao