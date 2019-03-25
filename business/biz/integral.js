'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    exception = require('../../utils/exception.js'),
    str = require("../../utils/stringHelper"),
    integralDao = require('../../business/dao/integral.js');

var uuid = require('node-uuid');

class biz {
    //获取活动信息
    static async integrals(params) {
        return await dao.manageConnection(async (connection) => {
            return await integralDao.queryIntegral(connection, params);
        })
    }


    //添加活动详情
    static async integralInfos(params) {
        return await dao.manageConnection(async (connection) => {
            return await integralDao.queryIntegralInfo(connection, params);
        })
    }

    //添加活动详情
    static async recordIntegral (params) {
        return await dao.manageConnection(async (connection) => {
            let result = await integralDao.creatIntegral(connection, params);
            if(result){
                await integralDao.creatIntegralInfo(connection, params);
            }
            return result;
        })
    }
}

module.exports = biz;