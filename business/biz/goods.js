'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    deleteDao = require('../../business/dao/delete.js'),
    goodsDao = require('../../business/dao/goods');
var uuid = require('node-uuid');

class biz {

    //添加商品
    static async addGoods(params) {
        return await dao.manageConnection(async (connection) => {
            return await goodsDao.addGoods(connection, params);
        })
    }

    //更新商品
    static async updateGoods(params) {
        return await dao.manageConnection(async (connection) => {
            return await goodsDao.updateGoods(connection, params)
        })
    }

    //更新商品
    static async queryGoods(params) {
        return await dao.manageConnection(async (connection) => {
            let list = await goodsDao.queryGoods(connection, params);
            let count = await goodsDao.queryGoodsCount(connection, params);

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

    //删除商品
    static async delete(params) {
        return await dao.manageConnection(async (connection) => {
            let param = {tableName: "goods", fieldName: "good_id", fieldValue: params.id}
            return await deleteDao.delete(connection, param);
        })
    }

}

module.exports = biz;