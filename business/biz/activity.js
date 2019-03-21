'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    exception = require('../../utils/exception.js'),
    str = require("../../utils/stringHelper"),
    activityDao = require('../../business/dao/activity.js');

var uuid = require('node-uuid');

class biz {
    //获取活动信息
    static async activitys(params) {
        return await dao.manageConnection(async (connection) => {
            //获取活动主信息
            var result = await activityDao.queryMain(connection, params);
            //封装其他信息
            if (result && result.length > 0 && (params.info || params.types)) {
                for (let item of result) {
                    item.infos = []
                    params.id = item.activity_id;
                    item.infos.push(await activityDao.queryInfo(connection, params));
                }
            }
            return result;
        })
    }


    //添加活动详情
    static async addOrUpdateActivitys(params) {
        return await dao.manageConnection(async (connection) => {
            let result;
            if (!params.id) {
                params.code = str.s8();
                result = await activityDao.addMain(connection, params);
                if (result && params.infos && params.infos.length > 0) {
                    for (let item of params.infos) {
                        item.id = result.insertId;
                        await activityDao.addInfo(connection, item);
                    }
                    result.id = result.insertId;
                }

            } else {
                result = await activityDao.updateMain(connection, params);
                if (result && params.infos && params.infos.length > 0) {
                    await activityDao.deleteInfo(connection, params);
                    for (let item of params.infos) {
                        item.id = params.id;
                        await activityDao.addInfo(connection, item);
                    }
                    result.id = params.id;
                }
            }
            return {"id": result.id};
        })
    }

    //添加活动详情
    static async updateinfo(params) {
        return await dao.manageConnection(async (connection) => {
            let result = [];
            for (let item of params.infos) {
                item.mainId = params.id;
                let update = await activityDao.updateInfo(connection, item);
                if (update.affectedRows > 0) {
                    result.push(item.id)
                }
            }
            return result;
        })
    }
}

module.exports = biz;