'use strict';

let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    bonusBiz = require('../../business/biz/bonus');

class ctrl {
    static async payments(params) {
        if (!params) {
            throw data.error('参数不能为空')
        }
        if (!params.account && !params.uuId) {
            throw data.error('账号格式不正确')
        }
        if (!params.price) {
            throw data.error('支付费用格式不正确')
        }
        if (!params.base) {
            throw data.error('账户当前盈利格式不正确')
        }
        return await bonusBiz.payments(params);
    }
}

module.exports = ctrl;