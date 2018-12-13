'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    expression = require("../../constant/expression"),
    data = require('../../utils/data'),
    businessBiz = require('../../business/biz/business');

class ctrl {
    static async getUsers(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw data.error('ID不能为空')
        }
        return await businessBiz.getUsers(params)
    }

    static async saveBusiness(params) {
        if (!params) {
            throw data.error('参数不能为空')
        }
        if (!expression.phone.test(params.businessPhone)) {
            throw data.error('账号电话格式不正确')
        }
        if (!expression.name.test(params.businessName)) {
            throw data.error('公司名称格式不正确')
        }
        return await businessBiz.saveBusiness(params)
    }

    static async searchBusiness(params) {
        if (!params) {
            throw data.error('参数不能为空')
        }
        return await businessBiz.searchBusiness(params)
    }

    static async openBusiness(params) {
        if (!params) {
            throw data.error('参数不能为空')
        }
        return await businessBiz.openBusiness(params)
    }

    static async disableBusiness(params) {
        if (!params) {
            throw data.error('参数不能为空')
        }
        return await businessBiz.disableBusiness(params)
    }

    static async saveUnion(params) {
        if (!params) {
            throw data.error('参数不能为空')
        }
        return await businessBiz.saveUnion(params)
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