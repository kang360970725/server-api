'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    data = require('../../utils/data'),
    exception = require('../../utils/exception.js'),
    activityBiz = require('../../business/biz/activity');

class ctrl {
    static async activitys(params) {
        return await activityBiz.activitys(params)
    }

    static async addorupdate(params) {
        return await activityBiz.addOrUpdateActivitys(params)
    }

    static async updateinfo(params) {
        return await activityBiz.updateinfo(params)
    }
}

module.exports = ctrl;