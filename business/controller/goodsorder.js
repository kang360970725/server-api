'use strict';

let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    exception = require('../../utils/exception.js'),
    goodsOrderBiz = require('../../business/biz/goodsOrder');

class ctrl {
    static async addgoodsorder(params) {
        if (params.adminUser) {
            if (str.isEmpty(params.userId)) {
                throw exception.ParamException('用户编号[userId]不能为空')
            }
        }else{
            params.userId = params.currentUser.uuid;
        }
        if (str.isEmpty(params.goodId)) {
            throw exception.ParamException('商品编号[goodId]不能为空')
        }
        return await goodsOrderBiz.addGoodsOrder(params);
    }


    static async updategoodsorder(params) {
        if (!params.adminUser) {
            throw exception.PowerException();
        }
        if (str.isEmpty(params.orderId)) {
            throw exception.ParamException('订单Id[orderId]不能为空')
        }
        return await goodsOrderBiz.updateGoodsOrder(params);
    }

    static async querygoodsorder(params) {
        if (params.currentUser) {
            params.userId = params.currentUser.uuid;
        }
        return await goodsOrderBiz.queryGoodsOrder(params);
    }
}

module.exports = ctrl;