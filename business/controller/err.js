'use strict';

// let mscore = require("mscore"),
let str = require("../../utils/stringHelper"),
    exception = require('../../utils/exception.js');

class ctrl {
    static async geterrs(params) {
        if (!params.adminUser) {
            throw exception.PowerException()
        }
        let start = 0;
        let end = -1;
        if (!str.isEmpty(params.pageIndex) && !str.isEmpty(params.pageSize)) {
            start = params.pageIndex * params.pageSize
            end = start + parseInt(params.pageSize) - 1;
        }
        let result = {
            [params.key]: [],
            count: 0
        }
        let body = await params.redis.lrange(params.key, start, end);
        let count = await params.redis.llen(params.key);
        for (let temp of body) {
            result[params.key].push(JSON.parse(temp));
        }
        result.count = count;
        return result
    }
}

module.exports = ctrl;