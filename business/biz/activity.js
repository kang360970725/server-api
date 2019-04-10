'use strict';

let dao = require("../../db_config/dao"),
    request = require("request"),
    Decimal = require("decimal.js"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    exception = require('../../utils/exception.js'),
    str = require("../../utils/stringHelper"),
    activityDao = require('../../business/dao/activity.js'),
    sysDao = require('../../business/dao/sysConfig.js');

var uuid = require('node-uuid');

class biz {
    //获取活动信息
    static async activitys(params) {
        return await dao.manageConnection(async (connection) => {
            //获取活动主信息
            var result = await activityDao.queryMain(connection, params);
            var resultCount = await activityDao.queryMainCount(connection, params);
            let count = 0;
            if (resultCount && resultCount.length > 0) {
                count = resultCount[0].count;
            }
            //封装其他信息
            if (result && result.length > 0 && (params.info || params.types)) {
                for (let item of result) {
                    item.infos = []
                    params.id = item.activity_id;
                    item.infos.push(await activityDao.queryInfo(connection, params));
                }
            }

            return {
                "list": result,
                "count": count
            };
        })
    }


    //添加活动详情
    static async addOrUpdateActivitys(params) {
        return await dao.manageConnection(async (connection) => {
            let result;
            if (!params.id) {
                params.code = str.s8();
                result = await activityDao.addMain(connection, params);
                if (result && params.infos && params.infos.length > 0) {
                    for (let item of params.infos) {
                        item.id = result.insertId;
                        await activityDao.addInfo(connection, item);
                    }
                    result.id = result.insertId;
                }

            } else {
                result = await activityDao.updateMain(connection, params);
                if (result && params.infos && params.infos.length > 0) {
                    await activityDao.deleteInfo(connection, params);
                    for (let item of params.infos) {
                        item.id = params.id;
                        await activityDao.addInfo(connection, item);
                    }
                    result.id = params.id;
                }
            }
            return {"id": result.id};
        })
    }

    //添加活动详情
    static async updateinfo(params) {
        return await dao.manageConnection(async (connection) => {
            let result = [];
            for (let item of params.infos) {
                item.mainId = params.id;
                let update = await activityDao.updateInfo(connection, item);
                if (update.affectedRows > 0) {
                    result.push(item.id)
                }
            }
            return result;
        })
    }


    //添加用户关联关系
    static async addUserUnion(params) {
        return await dao.manageTransactionConnection(async (connection) => {

            let info = {};
            let type = "";
            let main = await activityDao.queryMain(connection, {"id": params.value});
            //月卡
            if (params.isValid == 1) {
                type = "5";
            }
            //季卡
            if (params.isValid == 2) {
                type = "6";
            }
            //年卡
            if (params.isValid == 3) {
                type = "7";
            }
            if (main && main[0] || main[0].type != 1) {
                info = await activityDao.queryInfo(connection, {
                    "id": params.value,
                    "types": type
                })
                if (!info || !info[0]) {
                    throw exception.BusinessException("无该产品", 200)
                }
            } else {
                throw exception.BusinessException("无该产品", 200)
            }

            let activityInfo = {};
            let activityMain = {};
            if (!str.isEmpty(params.activityId)) {
                activityMain = await activityDao.queryMain(connection, {"id": params.activityId});
                if (activityMain || activityMain[0] || activityMain[0].type != 0) {
                    activityInfo = await activityDao.queryInfo(connection, {
                        "id": params.activityId,
                        "types": "1,2,3,4"
                    })
                    if (!activityInfo || activityInfo <= 0) {
                        throw exception.BusinessException("无该活动", 200)
                    }
                } else {
                    throw exception.BusinessException("无该活动", 200)
                }
            }
            params.isValid = -1;
            let btcPrice = await biz.nowBTCPrice();
            let unionResult
            try {
                unionResult = await activityDao.addUserUnion(connection, params);
                if (unionResult && unionResult.insertId) {
                    let price = info[0].info_value;
                    if (activityInfo && activityInfo.length > 0 && btcPrice) {
                        btcPrice.originalprice = price;
                        let BTC = 0;
                        for (let item of activityInfo) {
                            //免费
                            if (item.info_type == 2) {
                                price = 0;
                            }
                            //打折
                            if (item.info_type == 3) {
                                if (!str.isEmpty(item.info_value) && item.info_value != 0) {
                                    let USD = new Decimal(price).mul(new Decimal(item.info_value)).div(new Decimal(10));
                                    price = USD.toNumber();
                                    BTC = USD.div(new Decimal(btcPrice.huobi)).toNumber();
                                }
                            }
                        }
                        params.id = unionResult.insertId;
                        params.type = -1;
                        params.price = price;
                        btcPrice.nowPrice = price;
                        btcPrice.BTCPrice = BTC;
                        let renewResult = await activityDao.addRenew(connection, params);
                        if (!renewResult || !renewResult.insertId) {
                            throw exception.BusinessException("提交失败", 200);
                        }
                        btcPrice.id = renewResult.insertId;
                        let sysconfig = await sysDao.query(connection,{type:"sys_img",pageIndex:0,pageSize:1})
                        if(sysconfig && sysconfig[0]){
                            btcPrice.img = sysconfig[0].sys_value;
                        }else{
                            btcPrice.img = "";
                        }

                    } else {
                        throw exception.BusinessException("提交失败", 200)
                    }
                } else {
                    throw exception.BusinessException("提交失败", 200)
                }
            } catch (e) {
                throw exception.BusinessException("重复提交", 200)
            }
            return btcPrice;

        })
    }

    //添加用户关联关系
    static async addUserPoolUnion(params) {
        return await dao.manageTransactionConnection(async (connection) => {
            try {
                let result = await activityDao.addUserUnion(connection, params);
                if (result && result.insertId) {
                    params.unionId = result.insertId;
                    await activityDao.addPool(connection, params);
                } else {
                    throw exception.BusinessException("提交失败", 200)
                }
                return result;
            } catch (e) {
                console.log(e.message)
                throw exception.BusinessException("重复提交", 200)
            }
        })
    }

    //更新用户关联关系
    static async updateUserUnion(params) {
        return await dao.manageTransactionConnection(async (connection) => {
            //需要区分 用户还是管理员
            let type = params.type;
            params.type = "";
            let result = await activityDao.queryRenew(connection, params);
            params.type = type;
            if (result && result.length > 0 && result[0].data_time) {
                await activityDao.updateRenew(connection, params);
                params.id = result[0].data_time;
                if (params.adminUser) {
                    await activityDao.updateUserUnion(connection, params);
                }
            }
            return result;
        })
    }


    //更新用户关联关系
    static async updateUserPoolUnion(params) {
        return await dao.manageTransactionConnection(async (connection) => {
            //需要区分 用户还是管理员
            let poolId = params.poolId;
            params.poolId = "";
            let result = await activityDao.queryPool(connection, params);
            if (result && result.length > 0 && result[0].union_id) {
                params.poolId = poolId;
                await activityDao.updatePool(connection, params);
                params.id = result[0].union_id;
                if (params.adminUser) {
                    await activityDao.updateUserUnion(connection, params);
                }
            }
            return result;
        })
    }

    //添加用户关联关系
    static async queryUserUnion(params) {
        return await dao.manageConnection(async (connection) => {
            let result = await activityDao.queryUserUnion(connection, params);
            return result;
        })
    }

    //查询产品购买申请
    static async queryRenews(params) {
        return await dao.manageConnection(async (connection) => {
            let result = await activityDao.queryRenew(connection, params);
            return result;
        })
    }

    //查询矿池申请
    static async queryPools(params) {
        return await dao.manageConnection(async (connection) => {
            let result = await activityDao.queryPool(connection, params);
            return result;
        })
    }

    //当前比特币价格
    static async nowBTCPrice() {
        return await new Promise(async (resolve, reject) => {
            request({
                url: "https://apioperate.btc123.com/api/market/index/noAuth/exchange/price",
                method: "GET",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify("")
            }, function (error, response, body) {
                if (error) return reject(error);
                if (response.statusCode != 200) return reject(response);
                let result = {};
                if (body.success) {
                    let list = body.data[0].exchangeList;
                    for (let i in list) {
                        if (list[i].chartKey == 'HUOBIPROBTCUSDT') {
                            result["huobi"] = list[i].usdPrice;
                            break;
                        }
                    }
                }
                resolve(result);
            });
        })
    }

    //当前比特币价格老版本接口
    static async nowBTCPrice_apibtc() {
        return await new Promise(async (resolve, reject) => {
            request({
                url: "https://apibtc.btc123.com/v1/index/getNewIndexMarket?sign=BTC&type=1",
                method: "GET",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify("")
            }, function (error, response, body) {
                if (error) return reject(error);
                if (response.statusCode != 200) return reject(response);
                let result = {};
                if (body.code == 1) {
                    let list = body.data[0].ticker;
                    for (let i in list) {
                        if (list[i].platFromSign == 'HUOBIPRO') {
                            result["huobi"] = list[i].last;
                            continue;
                        }
                        if (list[i].platFromSign == 'OKEX') {
                            result["OKEX"] = list[i].last;
                            continue;
                        }
                        if (list[i].platFromSign == 'BINANCE') {
                            result["bian"] = list[i].last;
                            continue;
                        }
                    }
                }
                resolve(result);
            });
        })
    }
}

module.exports = biz;