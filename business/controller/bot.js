'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    expression = require("../../constant/expression"),
    data = require('../../utils/data'),
    botBiz = require('../../business/biz/bot'),
    poolBiz = require('../../business/biz/poolRobot.js');

class ctrl {
    static async getBots(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw data.error('用户ID不能为空')
        }
        return await botBiz.getBots(params)
    }
    static async getParameters(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw data.error('用户ID不能为空')
        }
        console.log(params.token);
        if (!params || str.isEmpty(params.token)) {
            throw data.error('用户身份验证失败')
        }
        return await botBiz.getParameters(params)
    }
    static async exitBotParm(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw data.error('用户ID不能为空')
        }
        console.log(params.token);
        if (!params || str.isEmpty(params.token)) {
            throw data.error('用户身份验证失败')
        }
        return await botBiz.exitBotParm(params)
    }
    static async getParametersRec(params) {
        return await botBiz.getParametersRec(params)
    }


    static async poollist(params) {
        return await poolBiz.list(params);
    }

    static async pooldetails(params) {
        if (params.currentUser) {
            params.uuid = params.currentUser.uuid;
        }
        if (params.adminUser) {
            if (str.isEmpty(params.uuid)) {
                throw exception.ParamException('用户id[uuid]不能为空')
            }
        }
        if (str.isEmpty(params.poolId)) {
            throw exception.ParamException('矿池id[poolId]不能为空')
        }
        return await poolBiz.one(params);
    }

    static async poolbalance(params) {
        if (params.currentUser) {
            params.uuid = params.currentUser.uuid;
        }
        if (params.adminUser) {
            if (str.isEmpty(params.uuid)) {
                throw exception.ParamException('用户id[uuid]不能为空')
            }
        }
        if (str.isEmpty(params.poolId)) {
            throw exception.ParamException('矿池id[poolId]不能为空')
        }
        params.balance = 1;
        return await poolBiz.one(params);
    }
}

module.exports = ctrl;