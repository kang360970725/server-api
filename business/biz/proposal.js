'use strict';

let dao = require("../../db_config/dao"),
    request = require("request"),
    Decimal = require("decimal.js"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    exception = require('../../utils/exception.js'),
    str = require("../../utils/stringHelper"),
    proposalDao = require('../../business/dao/proposal.js'),
    deleteDao = require('../../business/dao/delete.js'),
    sysDao = require('../../business/dao/sysConfig.js');

var uuid = require('node-uuid');

class biz {
    //查询
    static async proposals(params) {
        return await dao.manageConnection(async (connection) => {
            //获取活动主信息
            var result = await proposalDao.queryProposal(connection, params);
            var resultCount = await proposalDao.queryProposalCount(connection, params);
            let count = 0;
            if (resultCount && resultCount.length > 0) {
                count = resultCount[0].count;
            }
            return {
                "list": result,
                "count": count
            };
        })
    }
    //添加申请
    static async add(params) {
        return await dao.manageConnection(async (connection) => {
            return await proposalDao.addProposal(connection,params)
        })
    }

    //修改申请
    static async update(params) {
        return await dao.manageConnection(async (connection) => {
            return await proposalDao.updateProposal(connection,params)
        })
    }

    //删除代理申请
    static async delete(params) {
        return await dao.manageConnection(async (connection) => {
            let result = await proposalDao.queryProposal(connection, params);
            if(result && result.length > 0){
                let param = {tableName: "user_proposal", fieldName: "id", fieldValue: params.id}
                return await deleteDao.delete(connection, param);
            }
        })
    }
}

module.exports = biz;