'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    businessDao = require('../../business/dao/business');

class biz {
    //获取用户详细信息
    static async getUsers(params) {
        return await dao.manageConnection(async (connection) => {
            //获取会员信息
            var result = await businessDao.getUsers(connection, params);
            if (result && result.length > 0) {
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
                //获取商家方案信息 遍历封装 （前台需要这个数据结构，暂时丢在服务器端，如后期需要优化可考虑前端进行该操作）
                var tokenItem = await businessDao.getUserTokenFn(connection, result[0].account);
                result[0]['token'] = !!tokenItem[0] ? tokenItem[0].token : '';
            }
            return result;
        })
    }

    //新增用户
    static async addUsers(params) {
        return await dao.manageConnection(async (connection) => {
            var getResult = await businessDao.getUsersByAccount(connection, params);
            console.log(getResult);
            if (getResult && getResult.length > 0) {
                throw data.error('该用户已经存在')
            }
            var newSql = await businessDao.addUsers(connection, params);
            var newUsers = await businessDao.getUsersByAccount(connection, params);
            var setBotSetting = await businessDao.insertUserBotSetting(connection, params);//设置默认参数
            var setToken = await businessDao.insertUserBotSetting(connection, params);//设置token关系
            var retUser = {
                uuid: newUsers[0].uuid,
                account: newUsers[0].account
            }
            return retUser
        })
    }

    // 保存商家/设计师信息
    static async saveBusiness(params) {
        return await dao.manageConnection(async (connection) => {
            if (params) {

                //验证是否存在 商家名称和电话重复
                // var result = await businessDao.isExistBusiness(connection, params);
                //如果包含ID 则为修改
                if (params.businessId) {
                    var businessResult = await businessDao.getBusiness(connection, params);
                    if (!!businessResult || businessResult.length >= 0) {
                        throw new data.error('该用户已经存在')
                    }
                    let reqInfo = {
                        url: config.userapi.update,
                        method: "POST",
                        json: true,
                        body: {
                            company_name: params.businessName,
                            contact: params.businessName,
                            phone: params.businessPhone,
                            account: params.businessPhone,
                            password: params.voucher,
                            merchant_id: businessResult[0].userId,
                            merchant_kid: params.businessId
                        }
                    }
                    //修改密码
                    if (params.voucher) {

                    } else {
                        return new Promise(async (resolve, reject) => {
                            request(reqInfo, async (err, response, result) => {
                                if (result.status != 0) {
                                    reject(result.stack)
                                }
                                params.businessId = result.data.merchant_kid;
                                params.userId = result.data.merchant_id;
                                await businessDao.updateBusiness(connection, params);
                                //方案信息 采用先删后建的模式
                                await businessDao.deleteUnionBusinessManuscript(connection, params);
                                if (params.items && params.items.length > 1) {
                                    params.items.forEach(async (item) => {
                                        let itemparam = {manuscriptId: item, businessId: params.businessId};
                                        await businessDao.insertUnionBusinessManuscript(connection, itemparam);
                                    });
                                }
                                resolve(result);
                            })
                        })
                    }
                    //更新商家信息
                } else {
                    //TODO 获取商家ID 该ID 应来源于用户中心微服务 暂时写UUID
                    let reqInfo = {
                        url: config.userapi.register,
                        method: "POST",
                        json: true,
                        body: {
                            company_name: params.businessName,
                            contact: params.businessName,
                            phone: params.businessPhone,
                            account: params.businessPhone,
                            password: params.voucher,
                        }
                    }
                    return new Promise(async (resolve, reject) => {
                        request(reqInfo, async (err, response, result) => {
                            if (result.status != 0) {
                                reject(result.stack)
                            }
                            params.businessId = result.data.merchant_id;
                            params.userId = result.data.user.user_uuid;
                            await businessDao.insertBusiness(connection, params)
                            //遍历方案信息 写入数据库
                            if (params.items && params.items.length > 1) {
                                params.items.forEach(async (item) => {
                                    let itemparam = {manuscriptId: item, businessId: params.businessId};
                                    await businessDao.insertUnionBusinessManuscript(connection, item);
                                })
                            }
                            resolve(result);
                        })
                    })
                }
            }
        })
    }

    // 简单函数
    static async searchBusiness(params) {
        return await dao.manageConnection(async (connection) => {
            var res = await businessDao.searchBusinessCount(connection, params);
            let data = {
                total: res[0]["total"],
                data: await businessDao.searchBusiness(connection, params)
            };
            return data;

        })
    }

    // 简单函数
    static async disableBusiness(params) {
        return await dao.manageConnection(async (connection) => {
            if (params && params.businessId) {
                let param = {
                    state: BUSINESS.state.disable,
                    businessId: params.businessId
                }
                //更新商家信息
                await businessDao.updateBusiness(connection, param);
            }
        })
    }

    static async openBusiness(params) {
        return await dao.manageConnection(async (connection) => {
            if (params && params.businessId) {
                let param = {
                    state: BUSINESS.state.normal,
                    businessId: params.businessId
                }
                //更新商家信息
                await businessDao.updateBusiness(connection, param);
            }
        })
    }

    static async saveUnion(params) {
        return await dao.manageConnection(async (connection) => {
            if (params.items && params.items.length > 1) {
                params.items.forEach(async (item) => {
                    let itemparam = {manuscriptId: item, businessId: params.businessId};
                    await businessDao.insertUnionBusinessManuscript(connection, itemparam);
                });
            }
        })
    }

}

module.exports = biz;