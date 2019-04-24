'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    expression = require("../../constant/expression"),
    data = require('../../utils/data'),
    botBiz = require('../../business/biz/bot'),
    poolBiz = require('../../business/biz/poolRobot.js');

class ctrl {
    static async getBots(params) {
        if (!params.currentUser) {
            throw exception.PowerException()
        }
        let bot = await botBiz.getBots(params);
        return bot
    }

    static async getParameters(params) {
        if (!params.currentUser) {
            throw exception.PowerException()
        }
        return await botBiz.getParameters(params)
    }

    static async exitBotParm(params) {

        if (!params.currentUser) {
            throw exception.PowerException()
        }
        return await botBiz.exitBotParm(params)
    }

    static async getParametersRec(params) {
        return await botBiz.getParametersRec(params)
    }


    static async poollist(params) {
        let result = await params.redis.get("poolInfo");
        return JSON.parse(result)
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

    static async getAccRecordChart(params) {
        if (params.currentUser) {
            params.account = params.currentUser.account;
        }
        if (params.adminUser) {
            if (str.isEmpty(params.account)) {
                throw exception.ParamException('账号[account]不能为空')
            }
        }
        return await botBiz.getAccRecordChart(params)
    }

    static async getAccRecordList(params) {
        if (params.currentUser) {
            params.account = params.currentUser.account;
        }
        if (params.adminUser) {
            if (str.isEmpty(params.account)) {
                throw exception.ParamException('账号[account]不能为空')
            }
        }
        return await botBiz.getAccRecordList(params)
    }
}

module.exports = ctrl;