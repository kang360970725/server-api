'use strict';

// let mscore = require("mscore"),
let str = require("stringHelper"),
    data = require('data'),
    exception = require('exception.js'),
    integralBiz = require('../business/biz/integral');

class integralUtil {
    /**
     * 添加 积分记录
     * @param params id 用户id  integral 相关积分  explain 积分说明
     * @returns {Promise<*>}
     */
    static async recordIntegral(id, integral, explain) {
        let params = {
            "id": id,
            "integral": integral,
            "explain": explain
        }
        return await integralBiz.recordIntegral(params)
    }
}

module.exports = ctrl;