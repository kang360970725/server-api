'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    exception = require('../../utils/exception.js'),
    businessDao = require('../../business/dao/business');
var uuid = require('node-uuid');

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
                delete result[0].apikey;
                delete result[0].secret;
            }
            return result;
        })
    }

    //新增用户
    static async addUsers(params) {
        return await dao.manageConnection(async (connection) => {
            var getResult = await businessDao.getUsersByAccount(connection, params);
            if (getResult && getResult.length > 0) {
                throw data.error('该用户已经存在')
            }
            var newSql = await businessDao.addUsers(connection, params);
            var newUsers = await businessDao.getUsersByAccount(connection, params);
            var setBotSetting = await businessDao.insertUserBotSetting(connection, params);//设置默认参数
            params['token'] = uuid.v4();
            var setToken = await businessDao.insertToken(connection, params);//设置token关系
            var setPay = await businessDao.insertPay(connection, params);//写入付费开通记录
            var retUser = {
                uuid: newUsers[0].uuid,
                token: params.token,
                account: newUsers[0].account
            };
            return retUser
        })
    }

    //用户续费
    static async renewUsers(params) {
        return await dao.manageConnection(async (connection) => {
            console.log(params.uuId);
            var getResult = await businessDao.getUsers(connection, params);
            console.log(getResult);
            console.log(params.account);
            if (!getResult || getResult.length <= 0) {
                throw data.error('该用户不存在')
            }else if (getResult[0].account != params.account){
                throw data.error('用户信息验证失败')
            }
            let paramUser = getResult[0];
            params.endtime = paramUser.endtime;
            var newSql = await businessDao.renewUsers(connection, params);
            var setPay = await businessDao.insertPay(connection, params);//写入付费开通记录
            var retUser = {
                uuid: getResult[0].uuid,
                account: getResult[0].account,
                desc:'续费操作成功'
            };
            return retUser
        })
    }

    //用户续费
    static async login(params) {
        return await dao.manageConnection(async (connection) => {
            console.log(params);
            var result = await businessDao.login(connection, params);
            console.log(result);
            let results = result;
            if (results.length > 0 && results[0].type != 3) {

                    let date = new Date(result[0].endtime);
                    let time = date.getTime();//转换成毫秒
                    let nowTime = new Date().getTime();//转换成毫秒
                    let times = time - nowTime;
                    if (times <= 0) {
                        times = 0;
                    }
                    let resDta = results[0];
                    resDta.endtime = times;
                    resDta['token'] = !!result[0].token ? result[0].token : '';
                    resDta.password = '';
                    result = {
                        msg: '登录成功',
                        data: resDta
                    };
                    result.sessionId = uuid.v4()
                    let list = {
                        type:0,
                        desc:'(' + params.account + ')会员登录本系统！'
                    }
                    await businessDao.insertLogs(connection, list);

            } else if (results.length > 0 && results[0].type == 3) {
                throw exception.BusinessException('用户已被停止使用,请联系代理',200)
            } else {
                throw exception.ParamException('用户名或密码错误')
            }
            return result
        })
    }

}

module.exports = biz;