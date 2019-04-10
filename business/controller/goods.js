'use strict';

let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    goodsBiz = require('../../business/biz/goods');

class ctrl {
    static async addgoods(params) {
        if (!params.adminUser) {
            throw exception.PowerException();
        }
        if (str.isEmpty(params.name)) {
            throw exception.ParamException('商品名称[name]不能为空')
        }

        if (str.isEmpty(params.desc)) {
            throw exception.ParamException('商品详情不能为空[name]不能为空')
        }

        if (str.isEmpty(params.imgCover)) {
            throw exception.ParamException('封面图[imgCover]不能为空')
        }

        if (str.isEmpty(params.imgInfo)) {
            throw exception.ParamException('详情图[imgInfo]不能为空')
        }
        if (str.isEmpty(params.header)) {
            params.header = "";
        }
        if (str.isEmpty(params.unit)) {
            params.unit = "";
        }
        if (str.isEmpty(params.price)) {
            throw exception.ParamException('价格[price]不能为空')
        }
        params.state = 0;
        return await goodsBiz.addGoods(params);
    }


    static async updategoods(params) {
        if (!params.adminUser) {
            throw exception.PowerException();
        }
        if (str.isEmpty(params.goodId)) {
            throw exception.ParamException('商品Id[goodId]不能为空')
        }
        return await goodsBiz.updateGoods(params);
    }

    static async querygoods(params) {
        if (!params.adminUser) {
            params.delFlag = 0;
            params.state = 0;
        }
        return await goodsBiz.queryGoods(params);
    }
}

module.exports = ctrl;