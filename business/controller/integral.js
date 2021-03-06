'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    exception = require('../../utils/exception.js'),
    integralBiz = require('../../business/biz/integral'),
    sysConfigBiz = require('../../business/biz/sysConfig')
;

class ctrl {
    static async integrals(params) {
        return await integralBiz.integrals(params)
    }

    static async integralInfos(params) {
        return await integralBiz.integralInfos(params)
    }

    static async recordIntegral(params) {
        return await integralBiz.recordIntegral(params)
    }

    static async integralconfig(params) {
        if (!params.adminUser) {
            throw exception.PowerException();
        }
        let inviterIntegral = await params.redis.get("registerInviterIntegral");
        let integral = await params.redis.get("registerIntegral");
        let ratio = await params.redis.get("buyProductIntegraRatio");
        return {
            inviterIntegral: inviterIntegral,
            integral: integral,
            buyProductIntegraRatio: ratio
        }
    }

    static async saveintegralconfig(params) {
        if (!params.adminUser) {
            throw exception.PowerException();
        }
        if (str.isEmpty(params.value)) {
            throw exception.ParamException('内容[value]不能为空')
        }
        if (str.isEmpty(params.key)) {
            throw exception.ParamException('类型[key]不能为空')
        }
        params.redis.set(params.key, params.value);
        sysConfigBiz.add({type: params.key, value: params.value})
    }

    static async queryintegralconfig(params) {
        if (!params.adminUser) {
            throw exception.PowerException();
        }
        let configs = sysConfigBiz.query({type: params.key})
        return configs;
    }
}

module.exports = ctrl;