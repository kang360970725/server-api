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
        let bot = {};
        // params.currentUser.account = "Aperson";
        let _userassets = await params.redis.get(params.currentUser.account + "_userassets")
        let _userparam = await params.redis.get(params.currentUser.account + "_userparam")
        let btcPrice = await params.redis.get("btcPrice");
        if (_userassets && _userparam && btcPrice) {
            _userassets = JSON.parse(_userassets);
            _userparam = JSON.parse(_userparam);
            bot.created = _userparam.now;
            bot.level = _userparam.bot_version;//机器人版本
            bot.new_position_qty = _userparam.entry;//头寸金额
            bot.max_position_qty = _userparam.maxleverage;//最大持仓
            bot.bot_mex_last = btcPrice.quotationBTCPrice.mex_last;//最新价
            bot.bot_nanpin = _userparam.nanpin;
            bot.nanpin_count = _userparam.nanpin_count;
            bot.status = _userparam.status;
            bot.bot_side = _userparam.bot_side;
            bot.bot_size = _userparam.bot_size;
            bot.bot_avgEntryPrice = _userparam.bot_avgEntryPrice;
            bot.bot_liquidationPrice = _userparam.bot_liquidationPrice;
            bot.marginLeverage = _userparam.marginLeverage;
            bot.bot_balance = _userassets.bot_balance;
            bot.bot_prevDeposited = _userassets.bot_prevDeposited;
            bot.bot_prevWithdrawn = _userassets.bot_prevWithdrawn;
            bot.bot_amount = _userassets.bot_amount;
            bot.bot_lirun = _userassets.bot_lirun;
            bot.shortrange = _userassets.shortrange;
            bot.longrange = _userassets.longrange;
        } else {
            bot = await botBiz.getBots(params);
        }
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