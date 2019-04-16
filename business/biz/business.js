'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    exception = require('../../utils/exception.js'),
    businessDao = require('../../business/dao/business'),
    activityDao = require('../../business/dao/activity');
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
                result[0]['unions'] = await activityDao.queryUserUnion(connection, params);
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
            } else if (getResult[0].account != params.account) {
                throw data.error('用户信息验证失败')
            }
            let paramUser = getResult[0];
            params.endtime = paramUser.endtime;
            var newSql = await businessDao.renewUsers(connection, params);
            var setPay = await businessDao.insertPay(connection, params);//写入付费开通记录
            var retUser = {
                uuid: getResult[0].uuid,
                account: getResult[0].account,
                desc: '续费操作成功'
            };
            return retUser
        })
    }

    //用户登录
    static async login(params) {
        return await dao.manageConnection(async (connection) => {
            console.log(params);
            let result = await businessDao.login(connection, params);
            console.log(result);
            let results = result;
            if (results.length > 0 && results[0].type != 3) {
                params['user_id'] = results[0].uuid;
                params['user_info_type'] = 'orePool';
                let userInfos = await businessDao.userInfo(connection, params);

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
                resDta['userInfos'] = userInfos;
                result = {
                    msg: '登录成功',
                    data: resDta
                };
                result.sessionId = uuid.v4()
                let list = {
                    type: 0,
                    desc: '(' + params.account + ')会员登录本系统！'
                }
                await businessDao.insertLogs(connection, list);

            } else if (results.length > 0 && results[0].type == 3) {
                throw exception.BusinessException('用户已被停止使用,请联系代理', 200)
            } else {
                throw exception.ParamException('用户名或密码错误')
            }
            return result
        })
    }


    //用户登录
    static async register(params) {
        return await dao.manageConnection(async (connection) => {
            console.log(params);
            let result = await businessDao.isExistUser(connection, params);
            if (result && result.length > 0) {
                throw exception.BusinessException('用户已存在', 199)
            }
            result = await businessDao.verification(connection, params);
            if (!result || result.length <= 0) {
                throw exception.BusinessException('验证码错误或已过期', 198)
            }

            //添加用户
            await businessDao.addUsers(connection, params);

            result = await businessDao.isExistUser(connection, params);
            if (!result || result.length <= 0) {
                throw exception.BusinessException('注册用户失败', 197)
            }

            //设置默认参数
            await businessDao.insertUserBotSetting(connection, params);
            params['token'] = uuid.v4();
            //设置token关系
            await businessDao.insertToken(connection, params);
            //写入付费开通记录
            await businessDao.insertPay(connection, params);

            var retUser = {
                uuid: result[0].uuid,
                token: params.token,
                account: result[0].account
            };
            return retUser
        })
    }

    //用户找回密码
    static async forgotPwd(params) {
        return await dao.manageConnection(async (connection) => {
            let result = await businessDao.isExistUser(connection, params);
            if (!result || result.length <= 0) {
                throw exception.BusinessException('用户不存在', 196)
            }
            result = await businessDao.verification(connection, params);
            if (!result || result.length <= 0) {
                throw exception.BusinessException('验证码错误或已过期', 198)
            }
            params["uuid"] = result[0].uuid;
            //更新密码
            await businessDao.updatePwd(connection, params);

            var retUser = {
                uuid: result[0].uuid,
                token: params.token,
                account: result[0].account
            };
            return retUser
        })
    }


    //上传头像
    static async updateHead(params) {
        return await dao.manageConnection(async (connection) => {
            let result = await businessDao.isExistUser(connection, params);
            if (!result || result.length <= 0) {
                throw exception.BusinessException('用户不存在', 196)
            }
            //更新密码
            await businessDao.updateHead(connection, params);
            return params.headPortrait;
        })
    }

    //上传头像
    static async myfriend(params) {
        return await dao.manageConnection(async (connection) => {
            return await businessDao.myfriend(connection, params);
        })
    }

    //管理获取用户列表
    static async getUsersList(params) {
        return await dao.manageConnection(async (connection) => {
            var userList = await businessDao.getUsersList(connection, params);
            var count = await businessDao.getUsersListCount(connection, params);
            userList = userList.map(function (item) {
                let date = new Date(item.endtime);
                let time = date.getTime();//转换成毫秒
                let nowTime = new Date().getTime();//转换成毫秒
                let times = time - nowTime;
                if (times <= 0) {
                    time = 0;
                }
                item.endtime = times;
                item.endtimems = time;
                return item;
            })
            var retUser = {
                list: userList,
                token: params.token,
                count: count
            };
            return retUser
        })
    }

    //后台设置热门用户
    static async setHotUsers(params) {
        return await dao.manageConnection(async (connection) => {
            var userList = await businessDao.setHotUsers(connection, params);
            var retUser = {
                msg: '操作成功',
                token: params.token
            };
            return retUser
        })
    }

    //管理禁启用用户
    static async setUserState(params) {
        return await dao.manageConnection(async (connection) => {
            var userList = await businessDao.setUserState(connection, params);
            var retUser = {
                msg: '操作成功',
                token: params.token
            };
            return retUser
        })
    }

}

module.exports = biz;