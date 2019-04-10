'use strict';

// let mscore = require("mscore"),
let str = require("../utils/stringHelper"),
    expression = require("../constant/expression"),
    data = require('../utils/data'),
    botBiz = require('../business/biz/bot'),
    schedule = require("node-schedule"),
    poolBiz = require('../business/biz/poolRobot.js');
const redis = require('../utils/redisClient');
const dbConfig = require('../db_config/config');

const rediss  = redis.redis(dbConfig.redis);
let rule3= new schedule.RecurrenceRule();
let times3    = [14];
rule3.hour  = times3;
rule3.minute = 0;
schedule.scheduleJob(rule3, function(){
    ctrl.poollist(rediss);
});

class ctrl {
    static async poollist(redis) {
        console.log("开始获取矿池数据");
        let result = await poolBiz.minepools()
        if (result && result.length > 0) {
            for (let item of result) {
                let balance = await poolBiz.minepools({poolId:item.id,balance:1})
                let info = await poolBiz.minepools({poolId:item.id})
                item.balance =balance.daybalance_set;
                item.users =info.users;
            }
            redis.set("poolInfo",JSON.stringify(result))
            console.log("获取矿池数据结束");
        }
    }
}

module.exports = ctrl;