'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    businessBiz = require('../../business/biz/business');

class ctrl {
    static async getUsers(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw data.error('ID不能为空')
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
        return await businessBiz.addUsers(params)
    }
}

module.exports = ctrl;