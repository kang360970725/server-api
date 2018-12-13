let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    static async isExistBusiness(connection, query) {
        var where = [];
        var where2 = [];
        var params = [];
        let sql = () => `
            SELECT
            businessId,businessName,businessPhone,createtime,state,businessType
            FROM
            user_business
            where isDelete = ${BUSINESS.delete.notDelete} and (${where.join(' or ')}) ${where2.join(' ')}
        `;

        where.push(' businessPhone = ? ');
        params.push(query.businessPhone);

        where.push(' businessPhone = ? ');
        params.push(query.businessPhone);

        if (!str.isEmpty(query.businessId)) {
            where2.push('and businessId <> ? ');
            params.push(query.businessId);
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

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
            createtime
            ) 
            VALUES (
            LPAD((select max(a.id)+1 from users a), 7, 0),
            ?,?,?,?,?,?,?,?)
            ;
        `;

        let timeNum = new Date().getTime();
        let time = moment(timeNum).format('YYYY-MM-DD HH:mm:ss');
        params.push(query.account);
        params.push('e10adc3949ba59abbe56e057f20f883e');
        params.push(query.email);
        params.push(query.phone);
        params.push(query.nickname);
        params.push(Invitdcode);
        params.push(query.Invitcode);
        params.push(time);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }



    static async searchBusiness(connection, query) {
        var where = []
        var params = [];
        var and = 'and';
        var limit = "LIMIT ";
        let countSql = () => `
        SELECT
        count(businessId) as total
        FROM
        user_business
        where isDelete = ${BUSINESS.delete.notDelete} and ${where.join(' and ')};`;
        let sql = () => `
            SELECT
            businessId,businessName,businessPhone,createtime,state,businessType
            FROM
            user_business
            where isDelete = ${BUSINESS.delete.notDelete}  ${and} ${where.join(' and ')}
            ${limit};
        `;

        if (query.businessType) {
            where.push(' businessType = ? ');
            params.push(query.businessType);
        }

        if (!str.isEmpty(query.businessName)) {
            where.push(' businessName = ? ');
            params.push(query.businessName);
        }
        if (!str.isEmpty(query.businessPhone)) {
            where.push(' businessPhone = ? ');
            params.push(query.businessPhone);
        }
        if (!str.isEmpty(query.businesskeyword)) {
            where.push('(businessPhone like ? or businessName like ?)  ');
            params.push("%" + query.businesskeyword + "%");
            params.push("%" + query.businesskeyword + "%");
        }

        if (where.length == 0) {
            and = '';
        }

        limit += `${(query.pageIndex - 1) * query.pageSize}, ${query.pageSize}`;

        return new Promise(async (resolve, reject) => {
            connection.query(sql(),
                params, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
        })
    }


    static async searchBusinessCount(connection, query) {
        var where = []
        var params = [];
        var and = 'and'
        var limit = "LIMIT ";
        let countSql = () => `
        SELECT
        count(businessId) as total
        FROM
        user_business
        where isDelete = ${BUSINESS.delete.notDelete} ${and} ${where.join(' and ')};`;

        if (query.businessType) {
            where.push(' businessType = ? ');
            params.push(query.businessType);
        }

        if (!str.isEmpty(query.businessName)) {
            where.push(' businessName like ? ');
            params.push("%" + query.businessName + "%");
        }
        if (!str.isEmpty(query.businessPhone)) {
            where.push(' businessPhone like ? ');
            params.push("%" + query.businessPhone + "%");
        }

        if (!str.isEmpty(query.businesskeyword)) {
            where.push('(businessPhone like ? or businessName like ?)  ');
            params.push("%" + query.businesskeyword + "%");
            params.push("%" + query.businesskeyword + "%");
        }
        if (where.length == 0) {
            and = '';
        }
        return new Promise(async (resolve, reject) => {
            connection.query(countSql(),
                params, (err, result) => {
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
         secre,
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
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
    //添加token
    static async insertToken(connection, query) {
        let sql = () => `
        INSERT INTO user_business (
            businessId,
            businessName,
            businessPhone,
            voucher,
            businessType,
            staffCount,
            userId
        )
        VALUES
            (
                ?, ?, ?, ?,?,?,?
            );
        `;
        var params = [];
        if (str.isEmpty(query.staffCount)) {
            query.staffCount = 0
        }
        params.push(query.businessId);
        params.push(query.businessName);
        params.push(query.businessPhone);
        params.push(query.voucher);
        params.push(query.businessType);
        params.push(query.staffCount);
        params.push(query.userId);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async updateBusiness(connection, query) {
        var SET = [];
        var params = [];
        var where = []
        let sql = () => `
        UPDATE user_business
            SET updatetime = now(),
                ${SET.join(' , ')}
            WHERE
                businessId = ?;
        `;
        if (query.businessName) {
            SET.push(' businessName = ? ');
            params.push(query.businessName);
        }

        if (query.businessPhone) {
            SET.push(' businessPhone = ? ');
            params.push(query.businessPhone);
        }

        if (query.voucher) {
            SET.push(' voucher = ? ');
            params.push(query.voucher);
        }

        if (!str.isEmpty(query.state)) {
            SET.push(' state = ? ');
            params.push(query.state);
        }

        if (!str.isEmpty(query.businessType)) {
            SET.push(' businessType = ? ');
            params.push(query.businessType);
        }
        if (!str.isEmpty(query.staffCount)) {
            SET.push(' staffCount = ? ');
            params.push(query.staffCount);
        }

        params.push(query.businessId);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async deleteBusiness(connection, query) {
        let sql = () => `
        UPDATE user_business
            SET 
                isDelete = ${BUSINESS.delete.isDelete}
            WHERE
                businessId = ?;
        `;
        var params = [];
        params.push(query.businessId);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

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

    static async insertUnionBusinessManuscript(connection, query) {
        let sql = () => `
        INSERT INTO user (
            businessId,
            manuscriptId
        )
        VALUES
            (
                ?, ?
            );
        `;
        var params = [];
        params.push(query.businessId);
        params.push(query.manuscriptId);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async deleteUnionBusinessManuscript(connection, query) {
        var where = [];
        var params = [];
        let sql = () => `
        DELETE FROM union_business_manuscript
            WHERE
            1 =1 and ${where.join(' and ')};
        `;
        where.push(' businessId = ? ');
        params.push(query.businessId);
        if (query.manuscriptId) {
            where.push(' manuscriptId = ? ');
            params.push(query.manuscriptId);
        }
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