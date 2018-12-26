'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    expression = require("../../constant/expression"),
    data = require('../../utils/data'),
    botBiz = require('../../business/biz/bot');

class ctrl {
    static async getBots(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw data.error('用户ID不能为空')
        }
        return await botBiz.getBots(params)
    }
    static async getParameters(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw data.error('用户ID不能为空')
        }
        console.log(params.token);
        if (!params || str.isEmpty(params.token)) {
            throw data.error('用户身份验证失败')
        }
        return await botBiz.getParameters(params)
    }
    static async exitBotParm(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw data.error('用户ID不能为空')
        }
        console.log(params.token);
        if (!params || str.isEmpty(params.token)) {
            throw data.error('用户身份验证失败')
        }
        return await botBiz.exitBotParm(params)
    }
    static async getParametersRec(params) {
        return await botBiz.getParametersRec(params)
    }
}

module.exports = ctrl;