'use strict';

let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    hotUsersBiz = require('../../business/biz/hotUsers');

class ctrl {
    //获取热门用户
    static async getUserList(params) {
        if (!params) {
            throw data.error('请求参数缺失')
        }
        if (!params.type || !params.pagesize || !params.index) {
            throw data.error('请求参数缺失')
        }
        // if (!params.account && !params.uuId) {
        //     throw data.error('账号格式不正确')
        // }
        return await hotUsersBiz.getUserList(params);
    }
}

module.exports = ctrl;