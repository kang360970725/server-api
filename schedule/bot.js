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
// 每天14点 0分 2秒执行
schedule.scheduleJob("2 0 14 * * *", function () {
    ctrl.poollist(rediss);
});
// 每 10秒执行
schedule.scheduleJob("*/10 * * * * *", function () {
    ctrl.BTCPrice(rediss);
});

class ctrl {
    static async poollist(redis) {
        console.log("开始获取矿池数据");
        let result = await poolBiz.minepools()
        if (result && result.length > 0) {
            for (let item of result) {
                let balance = await poolBiz.minepools({poolId: item.id, balance: 1})
                let info = await poolBiz.minepools({poolId: item.id})
                item.balance = balance.daybalance_set;
                item.users = info.users;
            }
            redis.set("poolInfo", JSON.stringify(result))
            console.log("获取矿池数据结束");
        }
    }

    static async BTCPrice(redis) {
        console.log("开始获取BTC数据");
        let btcPrice = await activityBiz.nowBTCPrice();
        let quotationBTCPrice = await activityBiz.quotationBTCPrice();
        redis.set("btcPrice", JSON.stringify({btcPrice: btcPrice, quotationBTCPrice: quotationBTCPrice}))
        console.log("获取BTC数据结束");
    }
}

module.exports = ctrl;