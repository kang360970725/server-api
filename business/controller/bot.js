'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    expression = require("../../constant/expression"),
    data = require('../../utils/data'),
    exception = require('../../utils/exception.js'),
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

    static async getAssets(params) {
        if (!params.currentUser) {
            throw exception.PowerException()
        }
        let bot = await botBiz.getAssets(params);
        return bot
    }

    static async getParameters(params) {  //获取机器人参数
        if (!params.currentUser) {
            throw exception.PowerException()
        }
        if (!params.bot_type) {
            throw exception.ParamException('机器人类型[bot_type]不能为空')
        }
        params.account = params.currentUser.account;
        return await botBiz.getParameters(params)
    }

    static async getExchange(params) {  //获取交易所参数
        if (!params.currentUser) {
            throw exception.PowerException()
        }
        params.account = params.currentUser.account;
        return await botBiz.getExchange(params)
    }

    static async exitExchange(params) {  //提交交易所参数
        if (!params.currentUser) {
            throw exception.PowerException()
        }
        if (!params.bot_type) {
            throw exception.ParamException('机器人类型[bot_type]不能为空')
        }
        return await botBiz.exitExchange(params)
    }

    static async exitBotParm(params) {  //修改机器人参数

        if (!params.currentUser) {
            throw exception.PowerException()
        }
        return await botBiz.exitBotParm(params)
    }

    static async getParametersRec(params) {  //获取官方推荐参数
        if (!params.bot_type) {
            throw exception.ParamException('机器人类型[bot_type]不能为空')
        }
        params.account = 'admin';
        return await botBiz.getParametersRec(params)
    }

    static async editParametersRec(params) {  //编辑官方推荐参数
        if (!params.adminUser) {
            throw exception.PowerException()
        }
        return await botBiz.exitBotParmRec(params)
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

    static async getcryptocurrencies(params) {
        if (str.isEmpty(params.type)) {
            throw exception.ParamException('类型[type]不能为空')
        }
        let result = await params.redis.get("cryptocurrencies" + params.type)
        return JSON.parse(result)
    }


}

module.exports = ctrl;