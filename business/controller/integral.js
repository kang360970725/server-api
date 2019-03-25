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
}

module.exports = ctrl;