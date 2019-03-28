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
            var resultCount = await activityDao.queryMainCount(connection, params);
            let count = 0;
            if (resultCount && resultCount.length > 0) {
                count = resultCount[0].count;
            }
            //封装其他信息
            if (result && result.length > 0 && (params.info || params.types)) {
                for (let item of result) {
                    item.infos = []
                    params.id = item.activity_id;
                    item.infos.push(await activityDao.queryInfo(connection, params));
                }
            }

            return {
                "list": result,
                "count": count
            };
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


    //添加用户关联关系
    static async addUserUnion(params) {
        return await dao.manageTransactionConnection(async (connection) => {
            try {
                let result = await activityDao.addUserUnion(connection, params);
                if (result && result.insertId) {
                    params.id = result.insertId;
                    await activityDao.addRenew(connection, params);
                } else {
                    throw exception.BusinessException("提交失败", 200)
                }
                return result;
            }catch (e) {
                throw exception.BusinessException("重复提交", 200)
            }
        })
    }

    //更新用户关联关系
    static async updateUserUnion(params) {
        return await dao.manageTransactionConnection(async (connection) => {
            //需要区分 用户还是管理员
            let result = await activityDao.queryRenew(connection, params);
            if(result && result.length > 0 && result[0].data_time){
                await activityDao.updateRenew(connection, params);
                params.id = result[0].data_time;
                if(params.adminUser){
                    await activityDao.updateUserUnion(connection, params);
                }
            }
            return result;
        })
    }

    //添加用户关联关系
    static async queryUserUnion(params) {
        return await dao.manageConnection(async (connection) => {
            let result = await activityDao.queryUserUnion(connection, params);
            return result;
        })
    }
}

module.exports = biz;