'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    exception = require('../../utils/exception.js'),
    businessBiz = require('../../business/biz/business');

class ctrl {
    static async getUsers(params) {
        if (!params || str.isEmpty(params.uuId)) {
            throw exception.BusinessException('商家ID不能为空',1)
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
        if(!params.uuId){
            return await businessBiz.addUsers(params);//uuid为空。添加用户
        }else {
            return await businessBiz.renewUsers(params);//包含uuid。续费用户
        }
    }
}

module.exports = ctrl;