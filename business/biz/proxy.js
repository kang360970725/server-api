'use strict';

let dao = require("../../db_config/dao"),
    request = require("request"),
    Decimal = require("decimal.js"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    exception = require('../../utils/exception.js'),
    str = require("../../utils/stringHelper"),
    proxyDao = require('../../business/dao/proxy.js'),
    sysDao = require('../../business/dao/sysConfig.js');

var uuid = require('node-uuid');

class biz {
    //查询
    static async proxys(params) {
        return await dao.manageConnection(async (connection) => {
            //获取活动主信息
            var result = await proxyDao.queryProxy(connection, params);
            var resultCount = await proxyDao.queryProxyCount(connection, params);
            let count = 0;
            if (resultCount && resultCount.length > 0) {
                count = resultCount[0].count;
            }
            return {
                "list": result,
                "count": count
            };
        })
    }
    //添加申请
    static async add(params) {
        return await dao.manageConnection(async (connection) => {
            return await proxyDao.addProxy(connection,params)
        })
    }

    //修改申请
    static async update(params) {
        return await dao.manageConnection(async (connection) => {
            return await proxyDao.updateProxy(connection,params)
        })
    }
}

module.exports = biz;