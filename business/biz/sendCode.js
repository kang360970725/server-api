'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    bonusDao = require('../../business/dao/sendCode');
var uuid = require('node-uuid');

class biz {

    //发送验证邮件
    static async sendCode(params) {
        return await dao.manageConnection(async (connection) => {
            var newSql = await bonusDao.sendCode(connection, params);
            var retUser = {
                desc:'发送成功！'
            };
            return retUser
        })
    }

}

module.exports = biz;