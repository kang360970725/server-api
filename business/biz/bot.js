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
            var resultData = {};
                let queryBot = await botDao.getBots(connection, params);
                if (queryBot && queryBot.length > 0) {
                    resultData = queryBot[0];
                }else {
                    resultData = {
                        "user_account": params.currentUser.account,
                        "created": "",
                        "level": "-",
                        "new_position_qty": "0",
                        "bot_nanpin": "0",
                        "max_position_qty": "0",
                        "nanpin_count": "0",
                        "status": "未启动"
                    };
                }
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
                }else {
                    throw data.error('身份验证失败')
                }
            }else {
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
                }else {
                    throw data.error('身份验证失败')
                }
            }else {
                throw data.error('身份验证失败')
            }
            let retUser = {
                desc:'修改成功'
            };
            return retUser;
        })
    }
    //获取bot设置官方推荐参数
    static async getParametersRec(params) {
        let resultData = {
        '稳健型':{
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
        '激进型':{
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
        '稳健型':{
            mmpercent: 0.00035,
            longorder: 2,
            longrange: 30,
            longstop: 28,
            shortorder: 2,
            shortrange: 30,
            shortstop: 28,
            maxnanpin: 28,
        },
        '激进型':{
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

}

module.exports = biz;