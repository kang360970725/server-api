const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const sysbiz = require('../../business/biz/sysConfig.js');
const exception = require('../../utils/exception.js');
let str = require("../../utils/stringHelper"),
    timeUtil = require("../../utils/timeUtil"),
    expression = require('../../constant/expression.js');



class ctrl {
    static async uploadfiles(params) {
        if(!str.isEmpty(params.type) && params.type == "sys_img" && !params.adminUser){
            throw exception.PowerException();
        }
        return await sysbiz.uploadfiles(params);
    }
}

module.exports = ctrl;