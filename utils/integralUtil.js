'use strict';

let
    integralBiz = require('../business/biz/integral');

class integralUtil {
    /**
     * 添加 积分记录
     * @param params id 用户id  integral 相关积分  explain 积分说明
     * @returns {Promise<*>}
     */
    static async recordIntegral(connection,id, integral, explain) {
        let params = {
            "id": id,
            "integral": integral,
            "explain": explain
        }
        return await integralBiz.recordTransactionIntegral(connection,params)
    }
}

module.exports = integralUtil;