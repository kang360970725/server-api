'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    botDao = require('../../business/dao/bot'),
    integralDao = require('../../business/dao/integral'),
    businessDao = require('../../business/dao/business');

class biz {
    //获取bot详细信息
    static async getBots(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot信息
            var resultData = {
                pool: [],
                bots: []
            };

            let queryBot = [];
            let _userassets = await params.redis.get(params.currentUser.account + "_userassets")
            let _userparam = await params.redis.get(params.currentUser.account + "_userparam")
            let _userassets_futures = await params.redis.get(params.currentUser.account + "_userassets_futures")
            let _userparam_futures = await params.redis.get(params.currentUser.account + "_userparam_futures")
            let btcPrice = await params.redis.get("btcPrice");
            if (_userassets && _userparam && btcPrice
            // && _userassets_futures && _userparam_futures
            ) {
                _userassets = JSON.parse(_userassets);
                _userparam = JSON.parse(_userparam);
                _userparam_futures = JSON.parse(_userparam_futures);
                _userassets_futures = JSON.parse(_userassets_futures);
                btcPrice = JSON.parse(btcPrice);
                queryBot.push(await biz.buildbot(_userparam, btcPrice, _userassets, 0));
                // queryBot.push(await biz.buildbot(_userparam_futures, btcPrice, _userassets_futures, 1));
            } else {
                queryBot = await botDao.getBots(connection, params);
            }

            let queryPool = await botDao.getPoolList(connection, params);
            let pollList = []
            if (queryPool && queryPool.length > 0 && queryPool[0].pools) {
                queryPool = queryPool[0].pools.split(',');
                for (var i in queryPool) {
                    let pool = await params.redis.get("poolinfo_" + queryPool[i])
                    let balance = await params.redis.get("poolbalance_" + queryPool[i])
                    pool = JSON.parse(pool);
                    balance = JSON.parse(balance);
                    pool.balance = balance.daybalance_set;
                    pollList.push(pool);
                }
            }
            if (queryBot && queryBot.length > 0) {
                resultData.bots = queryBot;
                resultData.pool = pollList;
            } else {
                resultData.bots = [{
                    "user_account": params.currentUser.account,
                    "created": "",
                    "level": "-",
                    "new_position_qty": "0",
                    "bot_nanpin": "0",
                    "max_position_qty": "0",
                    "nanpin_count": "0",
                    "status": "未启动",
                    "type": 0
                }]
            }
            ;
            return resultData;
        })
    }

    static async buildbot(_userparam, btcPrice, _userassets, botType) {
        let bot = {};
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
        bot.type = botType;
        return bot
    }

    //获取bot详细信息
    static async getAssets(params) {
        return await dao.manageConnection(async (connection) => {
            let bot = {};
            let _userassets = await params.redis.get(params.currentUser.account + "_userassets")
            let _userassets_futures = await params.redis.get(params.currentUser.account + "_userassets_futures")
            if (_userassets && _userassets_futures) {
                _userassets = JSON.parse(_userassets);
                _userassets_futures = JSON.parse(_userassets_futures);
                bot.bot_balance = _userassets.bot_balance ? _userassets.bot_balance : 0 + _userassets_futures.bot_balance ? _userassets_futures.bot_balance : 0;
                bot.bot_lirun = _userassets.bot_lirun ? _userassets.bot_lirun : 0 + _userassets_futures.bot_lirun ? _userassets_futures.bot_lirun : 0
                bot.bot_prevDeposited = _userassets.bot_prevDeposited ? _userassets.bot_prevDeposited : 0 + _userassets_futures.bot_prevDeposited ? _userassets_futures.bot_prevDeposited : 0
            } else {
                let queryBot = await botDao.getBots(connection, params);
                if (queryBot && queryBot.length > 0) {
                    for (let item of queryBot) {
                        bot.bot_balance = bot.bot_balance ? bot.bot_balance : 0 + item.bot_balance ? item.bot_balance : 0;
                        bot.bot_lirun = bot.bot_lirun ? bot.bot_lirun : 0 + item.bot_lirun ? item.bot_lirun : 0;
                        bot.bot_prevDeposited = bot.bot_prevDeposited ? bot.bot_prevDeposited : 0 + item.bot_prevDeposited ? item.bot_prevDeposited : 0;
                    }
                } else {
                    bot.bot_balance = 0;
                    bot.bot_lirun = 0;
                    bot.bot_prevDeposited = 0;
                }
            }
            params.account = params.currentUser.account;
            params.day1 = 1;
            params.day2 = 2;
            bot.yesterday = 0
            let yesterday = await botDao.calcAccRecordByDay(connection, params);
            if (yesterday[0] && yesterday[0].bonus_base) {
                bot.yesterday = yesterday[0].bonus_base;
            }


            params.date = 'month';
            let lastMonth = await botDao.calcAccRecordByDay(connection, params);
            bot.LastMonth = 0;
            if (lastMonth[0] && lastMonth[0].bonus_base) {
                bot.LastMonth = lastMonth[0].bonus_base;
            }

            let Integral = integralDao.queryIntegral(connection, params);

            bot.Integral = {
                integral_current: 0,
                integral_level: 0,
                integral_total: 0
            };
            if (Integral && Integral[0]) {
                bot.Integral = Integral[0];
            }
            return bot;
        })
    }

    //获取bot设置参数详细信息
    static async getParameters(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot参数
            let result = await botDao.getBotPram(connection, params);
            delete result[0].api;
            delete result[0].secret;
            return result;
        })
    }

    //获取交易所参数
    static async getExchange(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot参数
            return await botDao.getExchange(connection, params);
        })
    }

    //编辑交易所参数
    static async exitExchange(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot参数
            await botDao.exitExchange(connection, params);
            let retUser = {
                desc: '修改成功'
            };
            return retUser;
        })
    }

    //修改bot相关参数
    static async exitBotParm(params) {
        return await dao.manageConnection(async (connection) => {
            //修改会员bot参数
            await botDao.setBotPram(connection, params)
            let retUser = {
                desc: '修改成功'
            };
            return retUser;
        })
    }

    //修改系统推荐的bot参数
    static async exitBotParmRec(params) {
        return await dao.manageConnection(async (connection) => {
            //修改会员bot参数
            await botDao.setBotPramRec(connection, params)
            let retUser = {
                desc: '修改成功'
            };
            return retUser;
        })
    }

    //获取bot设置官方推荐参数
    static async getParametersRec(params) {
        return await dao.manageConnection(async (connection) => {
            //获取官方推荐参数
            let result = await botDao.getBotPram(connection, params);
            for (let i in result) {
                delete result[i].secret;
            }
            return result;
        })
    }

    //获取用户资金走势  绘制折线图
    static async getAccRecordChart(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot信息
            return await botDao.getAccRecordChart(connection, params);
        })
    }

    // 获取用资金记录
    static async getAccRecordList(params) {
        return await dao.manageConnection(async (connection) => {
            var result = await botDao.getAccRecordList(connection, params);
            var resultCount = await botDao.getAccRecordListCount(connection, params);
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

}

module.exports = biz;