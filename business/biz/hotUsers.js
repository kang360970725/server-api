'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    hotUsersDao = require('../../business/dao/hotUsers');

class biz {

    //获取排行榜用户信息
    static async getUserList(params) {
        return await dao.manageConnection(async (connection) => {
            var result = {
                list: [],
                count: 0
            }
            if (params.type == 1) {
                result.list = await hotUsersDao.getHotUserList(connection, params);
                result.count = await hotUsersDao.getHotUserListCount(connection, params);
            }
            if (params.type == 2) {
                result.list = await hotUsersDao.getRankingUserList(connection, params);
                // result.count = await hotUsersDao.getRankingUserListCount(connection, params);
                result.count = 10;
            }
            return result
        })
    }
}


module.exports = biz;