'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    bonusDao = require('../../business/dao/bonus');
var uuid = require('node-uuid');

class biz {

    //用户续费
    static async payments(params) {
        return await dao.manageConnection(async (connection) => {
            var newSql = await bonusDao.payments(connection, params);
            var retUser = {
                uuid: params.uuId,
                account: params.account,
                desc:'操作成功！'
            };
            return retUser
        })
    }

}

module.exports = biz;