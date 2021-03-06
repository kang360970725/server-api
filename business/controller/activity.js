'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    timeUtil = require("../../utils/timeUtil"),
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

    static async activityinfos(params) {
        return await activityBiz.activityinfos(params)
    }


    static async addorupdate(params) {
        if (params.adminUser) {
            return await activityBiz.addOrUpdateActivitys(params)
        } else {
            throw exception.PowerException();
        }
    }

    static async addpv(params) {
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('id[id]不能为空')
        }
        return await activityBiz.addPv(params)
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
        }
        params.type = 1;
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
            throw exception.ParamException('产品时间类别[isValid]不能为空')
        }

        // if (str.isEmpty(params.price)) {
        //     throw exception.ParamException('价格[price]不能为空')
        // }

        if (!expression.isInteger.test(params.isValid) || params.isValid > 3) {
            throw exception.ParamException('产品时间类别[isValid]格式错误')
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


    static async adduserpoolunion(params) {

        if (params.currentUser) {
            params.id = params.currentUser.uuid;
            params.account = params.currentUser.account;
            params.isValid = 1;
        }
        params.type = 2;
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

        if (str.isEmpty(params.relname)) {
            throw exception.ParamException('真实姓名[relname]不能为空')
        }

        if (str.isEmpty(params.nickname)) {
            throw exception.ParamException('昵称[nickname]不能为空')
        }

        if (str.isEmpty(params.phone) && str.isEmpty(params.email)) {
            throw exception.ParamException('联系方式[phone or email]不能为空')
        }

        if (str.isEmpty(params.amount)) {
            throw exception.ParamException('币量[amount]不能为空')
        }

        if (!expression.isInteger.test(params.isValid) || params.isValid > 3) {
            throw exception.ParamException('是否有效[isValid]格式错误')
        }
        params.endTime = new Date();
        return await activityBiz.addUserPoolUnion(params)
    }

    //审核/上传购买凭证
    static async updateuserunion(params) {
        if (params.adminUser) {
            if (str.isEmpty(params.type)) {
                throw exception.ParamException('是否审核成功[type]不能为空')
            }
            if (params.type == 2) {
                params.isValid = 0;
            } else {
                params.isValid = "";
            }

        } else if (params.currentUser) {
            if (str.isEmpty(params.credential)) {
                throw exception.ParamException('凭证[credential]不能为空')
            }
            params.type = 1;//审核中
            params.price = "";
        }
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('记录[id]不能为空')
        }
        return await activityBiz.updateUserUnion(params)
    }


    //审核/上传购买凭证
    static async confirmuserunion(params) {
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('记录[id]不能为空')
        }
        return await activityBiz.updateUserUnion({id: params.id, type: 0})
    }

    //审核矿池
    static async updateuserpoolunion(params) {
        if (params.adminUser) {
            if (!str.isEmpty(params.poolId)) {
                params.isValid = 0;
                if (str.isEmpty(params.token)) {
                    throw exception.ParamException('矿池token[token]不能为空')
                }
            } else if (params.isValid == 0) {
                if (str.isEmpty(params.poolId)) {
                    throw exception.ParamException('矿池id[poolId]不能为空')
                }
                if (str.isEmpty(params.token)) {
                    throw exception.ParamException('矿池token[token]不能为空')
                }
            }
        } else if (params.currentUser) {
            params.isValid = "";//审核中
        }
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('矿池加入申请记录[id]不能为空')
        }
        return await activityBiz.updateUserPoolUnion(params)
    }

    //申请记录查询
    static async renew(params) {
        if (params.currentUser) {
            params.uuid = params.currentUser.uuid;
            params.account = params.currentUser.account;
        }
        return await activityBiz.queryRenews(params)
    }

    //删除活动
    static async delete(params) {
        if (params.currentUser) {
            throw exception.PowerException();
        }
        if (str.isEmpty(params.id)) {
            throw exception.ParamException('活动编号[id]不能为空')
        }
        return await activityBiz.delete(params)
    }

    //矿池申请记录查询
    static async pool(params) {
        if (params.currentUser) {
            params.uuid = params.currentUser.uuid;
            params.account = params.currentUser.account;
        }
        return await activityBiz.queryPools(params)
    }

    static async nowbtcprice(params) {
        let result = await params.redis.get("btcPrice");
        return JSON.parse(result)
    }


}

module.exports = ctrl;