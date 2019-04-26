'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    goodsDao = require('../../business/dao/goods'),
    exception = require('../../utils/exception.js'),
    integralUtil = require('../../utils/integralUtil.js'),
    goodsOrderDao = require('../../business/dao/goodsorder.js');

var uuid = require('node-uuid');

class biz {

    //添加商品
    static async addGoodsOrder(params) {
        return await dao.manageTransactionConnection(async (connection) => {
            let goods = await goodsDao.queryGoods(connection, {goodId: params.goodId, delFlag: 0, state: 0})
            if (!goods || goods.length <= 0) {
                throw  exception.ParamException("该商品已下架或已删除")
            }
            params.goodPrice = goods[0].price
            params.payPrice = goods[0].price
            await integralUtil.recordIntegral(connection,params.userId,-params.payPrice,`购买商品[${goods[0].name}](${goods[0].good_id})`);
            return await goodsOrderDao.addGoodsOrder(connection, params);
        })
    }

    //更新商品
    static async updateGoodsOrder(params) {
        return await dao.manageTransactionConnection(async (connection) => {
            return await goodsOrderDao.updateGoodsOrder(connection, params)
        })
    }

    //更新商品
    static async queryGoodsOrder(params) {
        return await dao.manageConnection(async (connection) => {
            let list = await goodsOrderDao.queryGoodsOrder(connection, params);
            let count = await goodsOrderDao.queryGoodsOrderCount(connection, params);

            if (count && count.length > 0) {
                count = count[0].count;
            }
            //封装其他信息
            if (list && list.length > 0) {
                return {
                    list: list,
                    count: count
                }
            }
            return
        })
    }

}

module.exports = biz;