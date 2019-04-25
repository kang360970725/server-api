'use strict';

// let mscore = require("mscore"),
let str = require("../utils/stringHelper"),
    expression = require("../constant/expression"),
    data = require('../utils/data'),
    botBiz = require('../business/biz/bot'),
    activityBiz = require('../business/biz/activity'),
    schedule = require("node-schedule"),
    poolBiz = require('../business/biz/poolRobot.js');
const redis = require('../utils/redisClient');
const dbConfig = require('../db_config/config');

const rediss = redis.redis(dbConfig.redis);
// // 每天14点 0分 2秒执行
schedule.scheduleJob("2 0 13 * * *", function () {
    ctrl.poollist(rediss);
});

// 每 10秒执行
schedule.scheduleJob("*/10 * * * * *", function () {
    ctrl.BTCPrice(rediss);
});

// 0
schedule.scheduleJob("*/1 * * * *", function () {
    ctrl.botParam(rediss, 0);
});

// 1
schedule.scheduleJob("*/1 * * * *", function () {
    ctrl.botParam(rediss, 1);
});

// 2
schedule.scheduleJob("*/1 * * * *", function () {
    ctrl.botParam(rediss, 2);
});

// 3
schedule.scheduleJob("*/1 * * * *", function () {
    ctrl.botParam(rediss, 3);
});

// 4
schedule.scheduleJob("*/1 * * * *", function () {
    ctrl.botParam(rediss, 4);
});

schedule.scheduleJob("*/20 * * * *", function () {
    ctrl.botassets(rediss);
});

schedule.scheduleJob("*/60 * * * *", function () {
    ctrl.saveBotParam(rediss);
});


class ctrl {
    static async poollist(redis) {
        console.log("开始获取矿池数据");
        let result = await poolBiz.minepools()
        if (result && result.length > 0) {
            for (let item of result) {
                let balance = await poolBiz.minepools({poolId: item.id, balance: 1})
                let info = await poolBiz.minepools({poolId: item.id})
                redis.set("poolinfo_" + item.id, JSON.stringify(info))
                redis.set("poolbalance_" + item.id, JSON.stringify(balance))
                item.balance = balance.daybalance_set;
                item.users = info.users;
            }
            result.sort(function (a, b) {
                if (b.cost == 0 || a.cost == 0) {
                    return 0;
                }
                return b.balance_total / b.cost - a.balance_total / a.cost;
            });
            redis.set("poolInfo", JSON.stringify(result))
            console.log("获取矿池数据结束");
        }
    }

    static async BTCPrice(redis) {
        console.log("开始获取BTC数据");
        let btcPrice = await activityBiz.nowBTCPrice(redis);
        let quotationBTCPrice = await activityBiz.quotationBTCPrice(redis);
        redis.set("btcPrice", JSON.stringify({btcPrice: btcPrice, quotationBTCPrice: quotationBTCPrice}))
        console.log("获取BTC数据结束");
    }

    static async botParam(redis, index) {
        poolBiz.usersBotParam({redis: redis, index: index});
    }

    static async botassets(redis) {
        poolBiz.usersBotassets({redis: redis});
    }

    static async saveBotParam(redis) {
        poolBiz.saveBotParam({redis: redis});
    }
}

module.exports = ctrl;