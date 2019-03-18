'use strict';

let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    bonusBiz = require('../../business/biz/send-code');

class ctrl {
    //发送验证邮件
    static async sendCode(params) {
        if (!params) {
            throw data.error('请求参数缺失')
        }
        if (!params.account || !params.terminal || !params.busType) {
            throw data.error('请求参数缺失')
        }
        // if (!params.account && !params.uuId) {
        //     throw data.error('账号格式不正确')
        // }
        return await bonusBiz.sendCode(params);
    }
}

module.exports = ctrl;