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
            var result = await businessDao.getUsers(connection, params);
            var resultData = {};
            if (result && result.length > 0) {
                params.account = result[0].account;
                let queryBot = await botDao.getBots(connection, params);
                if (queryBot && queryBot.length > 0) {
                    resultData = queryBot[0];
                }else {
                    resultData = {
                        "user_account": result[0].account,
                        "created": "",
                        "level": "-",
                        "new_position_qty": "0",
                        "bot_nanpin": "0",
                        "max_position_qty": "0",
                        "nanpin_count": "0",
                        "status": "未启动"
                    };
                }
            }else {
                throw data.error('身份验证失败')
            }
            return resultData;
        })
    }
    //获取bot设置参数详细信息
    static async getParameters(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员bot信息
            var result = await businessDao.getUsers(connection, params);
            if (result && result.length > 0) {
                params.account = result[0].account;
                let token = await businessDao.generateToken(connection, params);
                if (token && token.length > 0) {
                    result[0].password = '';
                    result[0].disable = '';
                    let date = new Date(result[0].endtime);
                    let time = date.getTime();//转换成毫秒
                    let nowTime = new Date().getTime();//转换成毫秒
                    let times = time - nowTime;
                    if (times <= 0) {
                        times = 0;
                    }
                    result[0].endtime = times;
                }else {
                    throw data.error('身份验证失败')
                }
            }else {
                throw data.error('身份验证失败')
            }
            return result;
        })
    }

}

module.exports = biz;