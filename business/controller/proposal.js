'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    timeUtil = require("../../utils/timeUtil"),
    expression = require('../../constant/expression.js'),
    exception = require('../../utils/exception.js'),
    proposalBiz = require('../../business/biz/proposal.js');

class ctrl {
    static async proposals(params) {
        if(params.currentUser){
            params.uuid = params.currentUser.uuid;
        }
        return await proposalBiz.proposals(params)
    }

    static async addproposal(params) {
        if(params.currentUser){
            params.uuid = params.currentUser.uuid;
        }
        if (params.adminUser) {
            if (str.isEmpty(params.uuid)) {
                throw exception.ParamException('用户编号[uuid]不能为空')
            }
        }
        if (str.isEmpty(params.content)) {
            throw exception.ParamException('内容[content]不能为空')
        }

        if (str.isEmpty(params.type)) {
            throw exception.ParamException('类型[type]不能全为空')
        }

        return await proposalBiz.add(params)
    }

    static async updateproposal(params) {
        if (params.adminUser) {
            if (str.isEmpty(params.reply)) {
                throw exception.ParamException('回复[reply]不能为空')
            }
        } else {
            params.reply = ''
        }
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('编号[id]不能为空')
        }
        return await proposalBiz.update(params)
    }

    //删除投诉建议
    static async delete(params) {
        if (params.currentUser) {
            params.uuid = params.currentUser.uuid;
        }
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('编号[id]不能为空')
        }
        return await proposalBiz.delete(params)
    }
}

module.exports = ctrl;