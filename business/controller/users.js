'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    exception = require('../../utils/exception.js'),
    businessBiz = require('../../business/biz/business');

class ctrl {
    static async getuser(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw exception.BusinessException('商家ID不能为空', 1)
        }
        return await businessBiz.getUsers(params)
    }

    static async addUsers(params) {
        if (!params) {
            throw data.error('参数不能为空')
        }
        if (!params.account) {
            throw data.error('账号格式不正确')
        }
        if (!params.openingtime) {
            throw data.error('开通时间格式不正确')
        }
        if (!params.price) {
            throw data.error('开通价格格式不正确')
        }
        if (!params.version) {
            throw data.error('机器人版本格式不正确')
        }
        if (!params.uuId) {
            return await businessBiz.addUsers(params);//uuid为空。添加用户
        } else {
            return await businessBiz.renewUsers(params);//包含uuid。续费用户
        }
    }

    static async login(params) {
        if (!params || str.isEmpty(params.account) || str.isEmpty(params.pwd)) {
            throw exception.ParamException('账号和密码不能为空')
        }
        return await businessBiz.login(params)
    }

    static async register(params) {
        if (!params || str.isEmpty(params.account) || str.isEmpty(params.pwd)) {
            throw exception.ParamException('账号和密码不能为空')
        }
        return await businessBiz.register(params)
    }

    static async forgotPwd(params) {
        if (!params || str.isEmpty(params.account) || str.isEmpty(params.pwd)) {
            throw exception.ParamException('账号和密码不能为空')
        }

        if (str.isEmpty(params.code)) {
            throw exception.ParamException('验证码不能为空')
        }


        return await businessBiz.forgotPwd(params)
    }

    static async getUsersList(params) { //后台获取用户列表
        if (!params.adminUser) {
            throw exception.PowerException()
        }
        if (!params.pagesize || !params.index) {
            throw data.error('请求参数缺失')
        }
        return await businessBiz.getUsersList(params)
    }

    static async headportrait(params) { //上传头像
        if (params.adminUser) {
            if (str.isEmpty(params.uuid)) {
                throw exception.ParamException('用户uuid[uuid]不能为空')
            }
        }
        if (params.currentUser) {
            params.uuid = params.currentUser.uuid;
        }

        if (str.isEmpty(params.headPortrait)) {
            throw exception.ParamException('头像[headPortrait]不能为空')
        }
        return await businessBiz.updateHead(params)
    }

        static async myfriend(params) { //我的好友
        if (params.adminUser) {
            return;
        }
        return await businessBiz.myfriend(params)
    }

    static async setHotUsers(params) { //后台设置热门用户
        if (!params.adminUser) {
            throw exception.PowerException()
        }
        if (!params.account || !params.uuid || !params.popular_user) {
            throw data.error('请求参数缺失')
        }
        return await businessBiz.setHotUsers(params)
    }

    static async setUserState(params) { //后台禁/启用用户
        if (!params.adminUser) {
            throw exception.PowerException()
        }
        if (!params.account || !params.uuid || !params.type) {
            throw data.error('请求参数缺失')
        }
        return await businessBiz.setUserState(params)
    }
}

module.exports = ctrl;