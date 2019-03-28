'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    timeUtil = require("../../utils/timeUtil"),
    data = require('../../utils/data'),
    expression = require('../../constant/expression.js'),
    exception = require('../../utils/exception.js'),
    activityBiz = require('../../business/biz/activity');

class ctrl {
    static async activitys(params) {
        if (str.isEmpty(params.pageIndex) || str.isEmpty(params.pageSize)) {
            throw exception.ParamException('分页数据不能为空')
        }
        return await activityBiz.activitys(params)
    }

    static async addorupdate(params) {
        if (params.adminUser) {
            return await activityBiz.addOrUpdateActivitys(params)
        } else {
            throw exception.PowerException();
        }
    }

    static async updateinfo(params) {
        if (params.adminUser) {
            return await activityBiz.updateinfo(params)
        } else {
            throw exception.PowerException();
        }
    }

    static async adduserunion(params) {

        if (params.currentUser) {
            params.id = params.currentUser.uuid;
            params.account = params.currentUser.account;
            params.isValid = 1;
        }

        if (str.isEmpty(params.account)) {
            throw exception.ParamException('账号[account]不能为空')
        }

        if (str.isEmpty(params.id)) {
            throw exception.ParamException('账号uuid[id]不能为空')
        }

        if (str.isEmpty(params.type)) {
            throw exception.ParamException('类型[type]不能为空')
        }

        if (str.isEmpty(params.value)) {
            throw exception.ParamException('内容[value]不能为空')
        }
        if (str.isEmpty(params.isValid)) {
            throw exception.ParamException('是否有效[isValid]不能为空')
        }

        if (str.isEmpty(params.price)) {
            throw exception.ParamException('价格[price]不能为空')
        }

        if (str.isEmpty(params.desc)) {
            throw exception.ParamException('说明[desc]不能为空')
        }

        if (!expression.isInteger.test(params.isValid) || params.isValid > 3) {
            throw exception.ParamException('是否有效[isValid]格式错误')
        }


        let endTime = new Date();
        if (params.isValid === 1) {//月
            endTime = timeUtil.add(1, "months").toDate()
        } else if (params.isValid == 2) {//季度
            endTime = timeUtil.add(3, "months").toDate()
        } else if (params.isValid == 3) {//年
            endTime = timeUtil.add(1, "years").toDate()
        }
        params.endTime = endTime;

        return await activityBiz.addUserUnion(params)
    }

    //审核/上传购买凭证
    static async updateuserunion(params) {
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('记录[id]不能为空')
        }
        if (str.isEmpty(params.isValid)) {
            throw exception.ParamException('是否有效[isValid]不能为空')
        }
        if (!expression.isInteger.test(params.isValid) || params.isValid > 3) {
            throw exception.ParamException('是否有效[isValid]格式错误')
        }
        if (params.adminUser) {
            if(str.isEmpty(params.type)){
                throw exception.ParamException('是否审核成功[type]不能为空')
            }
            if(params.type == 2){
                params.isValid = 0;
            }
        }else if (params.currentUser) {
            if(str.isEmpty(params.credential)){
                throw exception.ParamException('凭证[credential]不能为空')
            }
                params.type = 1;//审核中

        }
        return await activityBiz.updateUserUnion(params)
    }
}

module.exports = ctrl;