'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    exception = require('../../utils/exception.js'),
    integralBiz = require('../../business/biz/integral');

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
            params.value = 0;
        }
        if ("registerInviterIntegral" == params.key
            || "registerIntegral" == params.key
            || "buyProductIntegraRatio" == params.key
            || "btcurl" == params.key) {
            params.redis.set(params.key, params.value);
        }
    }
}

module.exports = ctrl;