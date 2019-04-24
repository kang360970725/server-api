'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    botDao = require('../../business/dao/bot'),
    businessDao = require('../../business/dao/business');

class biz {
    //获取bot详细信息
    static async getBots(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot信息
            var resultData = {
                pool: [],
                bot: {}
            };
            let bot = {};
            let queryBot = [];
            let _userassets = await params.redis.get(params.currentUser.account + "_userassets")
            let _userparam = await params.redis.get(params.currentUser.account + "_userparam")
            let btcPrice = await params.redis.get("btcPrice");
            if (_userassets && _userparam && btcPrice) {
                _userassets = JSON.parse(_userassets);
                _userparam = JSON.parse(_userparam);
                btcPrice = JSON.parse(btcPrice);
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
                queryBot.push(bot);
            } else {
                queryBot = await botDao.getBots(connection, params);
            }

            let queryPool = await botDao.getPoolList(connection, params);
            let pollList = []
            if(queryPool[0] && queryPool[0].length> 0){
                queryPool = queryPool[0].pools.split(',');
                for (var i in queryPool) {
                    let pool = await params.redis.get("poolinfo_" + queryPool[i])
                    pollList.push(JSON.parse(pool));
                }
            }
            if (queryBot && queryBot.length > 0) {
                resultData.bot = queryBot[0];
                resultData.pool = pollList;
            } else {
                resultData.bot = {
                    "user_account": params.currentUser.account,
                    "created": "",
                    "level": "-",
                    "new_position_qty": "0",
                    "bot_nanpin": "0",
                    "max_position_qty": "0",
                    "nanpin_count": "0",
                    "status": "未启动"
                }
            };
            return resultData;
        })
    }

    //获取bot设置参数详细信息
    static async getParameters(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot信息
            var result = await businessDao.getUsers(connection, params);
            var resultData = {};
            if (result && result.length > 0) {
                params.account = result[0].account;
                let token = await businessDao.generateToken(connection, params);
                if (token && token.length > 0) {
                    resultData = await botDao.getBotPram(connection, params)
                } else {
                    throw data.error('身份验证失败')
                }
            } else {
                throw data.error('身份验证失败')
            }
            return resultData;
        })
    }

    //修改bot相关参数
    static async exitBotParm(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot信息
            var result = await businessDao.getUsers(connection, params);
            if (result && result.length > 0) {
                params.account = result[0].account;
                let token = await businessDao.generateToken(connection, params);
                if (token && token.length > 0) {
                    await botDao.setBotPram(connection, params)
                } else {
                    throw data.error('身份验证失败')
                }
            } else {
                throw data.error('身份验证失败')
            }
            let retUser = {
                desc: '修改成功'
            };
            return retUser;
        })
    }

    //获取bot设置官方推荐参数
    static async getParametersRec(params) {
        let resultData = {
            '稳健型': {
                "entry": 250,
                "trendfollow": 1,
                "mm": 1,
                "mmpercent": 0.00035,
                "nanpin": 250,
                "maxnanpin": 28,
                "mmnanpin": 1.25,
                "maxleverage": 50,
                "leverage": 0,
                "sleep": 40,
                "longrange": 30,
                "longstop": 28,
                "shortrange": 30,
                "shortstop": 28,
                "losscut": 1,
                "time": 5,
                "longstopx": 1999,
                "shortstopx": 1999,
                "longorder": 2,
                "shortorder": 2,
                "nanpin_cancel": 0,
                "nanpin_order": 0,
                "doten": 0
            },
            '激进型': {
                "entry": 250,
                "trendfollow": 1,
                "mm": 1,
                "mmpercent": 0.00035,
                "nanpin": 250,
                "maxnanpin": 28,
                "mmnanpin": 1.25,
                "maxleverage": 50,
                "leverage": 0,
                "sleep": 40,
                "longrange": 1,
                "longstop": 5,
                "shortrange": 1,
                "shortstop": 5,
                "losscut": 1,
                "time": 5,
                "longstopx": 1999,
                "shortstopx": 1999,
                "longorder": 2,
                "shortorder": 2,
                "nanpin_cancel": 0,
                "nanpin_order": 0,
                "doten": 0
            }
        };
        let resultData2 = {
            '稳健型': {
                mmpercent: 0.00035,
                longorder: 2,
                longrange: 30,
                longstop: 28,
                shortorder: 2,
                shortrange: 30,
                shortstop: 28,
                maxnanpin: 28,
            },
            '激进型': {
                mmpercent: 0.00035,
                longorder: 2,
                longrange: 1,
                longstop: 5,
                shortorder: 2,
                shortrange: 1,
                shortstop: 5,
                maxnanpin: 28,
            }
        };

        return resultData2;
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