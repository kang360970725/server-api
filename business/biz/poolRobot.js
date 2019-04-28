'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    request = require("request"),
    config = require('../../db_config/config'),
    str = require("../../utils/stringHelper"),
    userDao = require('../../business/dao/business'),
    botDao = require('../../business/dao/bot.js'),

    activityDao = require('../../business/dao/activity.js');
const fs = require('fs');
const path = require('path');

class biz {

    static async list(params) {
        return await biz.minepools();
    }

    static async one(params) {
        return await dao.manageConnection(async (connection) => {
            let pool = await activityDao.queryPool(connection, params);
            if (pool && pool.length > 0) {
                let param = {tokenValue: pool[0].token, poolId: pool[0].pool_id, balance: params.balance}
                if (str.isEmpty(param.tokenValue) || str.isEmpty(param.poolId)) {
                    return;
                }
                if (params.balance) {
                    return JSON.parse(await params.redis.get("poolbalance_" + param.poolId));
                }
                return JSON.parse(await params.redis.get("poolinfo_" + param.poolId));
                // await biz.minepools(param);
            }
        })
    }

    static async minepools(params) {
        return await new Promise(async (resolve, reject) => {
            let tokenValue = params && !str.isEmpty(params.tokenValue) ? params.tokenValue : config.pool.token_value;
            let token = config.pool.token_type + tokenValue;
            let url = "https://www.bluecatbot.com/api/minepools";
            if (params && !str.isEmpty(params.poolId)) {
                url = `${url}/${params.poolId}`;
                if (!str.isEmpty(params.balance)) {
                    url = `${url}/balance-daily`;
                }
            }
            let requestparam = {
                url: url,
                method: "GET",
                json: true,
                headers: {
                    [config.pool.token_name]: token,
                    "content-type": "application/json"
                },
                body: JSON.stringify("")
            }
            request(requestparam, function (error, response, body) {
                if (error) return reject(error);
                if (response.statusCode != 200) return reject(response);
                resolve(body);
            });
        }).catch(async (error) => {
            let errMessage = {param: requestparam, error: error};
            await redis.lpush("poolerr", JSON.stringify(errMessage), -1);
            await redis.ltrim("poolerr", 0, 500);
            console.log(await redis.lrange("poolerr", 0, 10))
        })
    }


    static async userBotParam(params, redis) {
        let paramsUrl = params.url == 1 ? "params" : "assets";
        let tokenValue = params && !str.isEmpty(params.tokenValue) ? params.tokenValue : config.pool.token_value;
        let token = config.pool.token_type + tokenValue;
        let url = `https://www.bluecatbot.com/api/${paramsUrl}/${params.account}`;
        let requestparam = {
            url: url,
            method: "GET",
            json: true,
            headers: {
                [config.pool.token_name]: token,
                "content-type": "application/json"
            },
            body: JSON.stringify("")
        }
        return await new Promise(async (resolve, reject) => {
            request(requestparam, function (error, response, body) {
                if (error) return reject(error);
                if (response.statusCode != 200) return reject(response);
                resolve(body);
            });
        }).catch(async (error) => {
            let errMessage = {param: requestparam, error: error};
            await redis.lpush("boterr", JSON.stringify(errMessage), -1);
            await redis.ltrim("boterr", 0, 500);
            console.log(await redis.lrange("boterr", 0, 10))
        })
    }


    static async saveBotParam(params) {
        console.log("开始saveBotParam")
        await dao.manageConnection(async (connection) => {
            let redisuserAccount = JSON.parse(await params.redis.get("users"));
            let tables = ["account_record", "account_record_static"]
            if (redisuserAccount && redisuserAccount.length > 0) {
                for (let user of redisuserAccount) {
                    let _userassets = await params.redis.get(user.account + "_userassets")
                    let _userparam = await params.redis.get(user.account + "_userparam")
                    let btcPrice = await params.redis.get("btcPrice");
                    let saveParma = {
                        account: user.account,
                        _userassets: JSON.parse(_userassets),
                        _userparam: JSON.parse(_userparam),
                        btcPrice: JSON.parse(btcPrice),
                    }
                    saveParma._userparam.bot_type = 1;
                    for (let tableName of tables) {
                        saveParma.tableName = tableName,
                        botDao.saveRecord(connection, saveParma)
                    }
                    botDao.saveRotBot(connection, saveParma);
                }
            }
        })
        console.log("结束saveBotParam")
    }


    static async usersBotParam(params) {
        console.log("开始usersBotParam" + params.index)
        let redisuserAccount = JSON.parse(await params.redis.get("user" + params.index));
        if (redisuserAccount && redisuserAccount.length > 0) {
            for (let user of redisuserAccount) {
                user.url = 1;
                console.log(`获取usersBotParam:${params.index}` + user.account)
                let param = await biz.userBotParam(user, params.redis)
                param.now = new Date();
                let paramStr = JSON.stringify(param)
                console.log(`获取usersBotParamresult:${params.index}` + paramStr)
                params.redis.set(user.account + "_userparam", paramStr)
            }
        }
        console.log("结束usersBotParam" + params.index)
    }

    static async usersBotassets(params) {
        console.log("开始usersBotassets")
        await dao.manageConnection(async (connection) => {
            let count = await userDao.getUsersListCount(connection, params);
            if (count && count > 0) {
                params.pagesize = count;
                params.index = 0;
                let users = await userDao.getUsersList(connection, params);
                users = [];
                users.push({account: "Aperson"});
                users.push({account: "DD"});
                users.push({account: "Shulamith"});
                users.push({account: "Yang666"});
                users.push({account: "b5_bot"})
                users.push({account: "flyboy1112"});
                let userAccount = [];
                if (users && users.length > 0) {
                    users = await biz.sliceArr(users, 5);
                    let i = 0;
                    for (let temp of users) {
                        for (let user of temp) {
                            userAccount.push(user);
                            console.log("获取usersBotassets:" + user.account)
                            let parameter = await biz.userBotParam(user, params.redis);
                            if (parameter) {
                                let botParameter = await botDao.getBotParameter(connection, user)
                                parameter.shortrange = botParameter.shortrange;
                                parameter.longrange = botParameter.longrange;
                                let parameterStr = JSON.stringify(parameter);
                                console.log("获取usersBotassets:" + parameterStr)
                                params.redis.set(user.account + "_userassets", parameterStr)
                            }
                        }
                        params.redis.set("user" + i, JSON.stringify(temp))
                        i++;
                    }
                    params.redis.set("users", JSON.stringify(userAccount))
                }
            }
        })
        console.log("结束usersBotassets")
    }

    static async sliceArr(array, count) {
        let result = [];
        let size = parseInt(array.length / count);
        let remaind = array.length % count;
        for (let x = 1; x <= count; x++) {
            let start = (x - 1) * size;
            let end = start + size;
            if (x == count) {
                end += remaind;
            }
            result.push(array.slice(start, end));
        }
        return result;
    }
}


module.exports = biz;