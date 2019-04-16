'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    timeUtil = require("../../utils/timeUtil"),
    expression = require('../../constant/expression.js'),
    exception = require('../../utils/exception.js'),
    proxyBiz = require('../../business/biz/proxy.js');

class ctrl {
    static async proxys(params) {
        if(params.currentUser){
            params.uuid = params.currentUser.uuid;
        }
        return await proxyBiz.proxys(params)
    }

    static async addproxy(params) {
        if(params.currentUser){
            params.uuid = params.currentUser.uuid;
        }

        if (params.adminUser) {
            if (str.isEmpty(params.uuid)) {
                throw exception.ParamException('用户编号[uuid]不能为空')
            }
        }
        if (str.isEmpty(params.name)) {
            throw exception.ParamException('用户名称[name]不能为空')
        }

        if (str.isEmpty(params.phone) && str.isEmpty(params.email)) {
            throw exception.ParamException('联系方式[phone 或者 email]不能全为空')
        }

        return await proxyBiz.add(params)
    }

    static async updateproxy(params) {
        if (params.adminUser) {
            if (str.isEmpty(params.status)) {
                throw exception.ParamException('状态[status]不能为空')
            }
            if (str.isEmpty(params.level)) {
                throw exception.ParamException('等级[level]不能为空')
            }
        } else {
            params.status = ''
            params.level = ''
        }
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('申请编号[id]不能为空')
        }
        return await proxyBiz.update(params)
    }
}

module.exports = ctrl;