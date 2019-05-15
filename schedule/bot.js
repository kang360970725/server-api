'use strict';
// let mscore = require("mscore"),
let
    botBiz = require('./biz'),
    schedule = require("node-schedule");
;

// // 每天14点 0分 2秒执行
schedule.scheduleJob("2 0 13 * * *", function () {
    botBiz.poollist();
});

// 每 10秒执行
schedule.scheduleJob("*/10 * * * * *", function () {
    botBiz.BTCPrice();
});

// 0
schedule.scheduleJob("*/1 * * * *", function () {
    botBiz.botParam(0);
});

// 1
schedule.scheduleJob("*/1 * * * *", function () {
    botBiz.botParam(1);
});

// 2
schedule.scheduleJob("*/1 * * * *", function () {
    botBiz.botParam(2);
});

// 3
schedule.scheduleJob("*/1 * * * *", function () {
    botBiz.botParam(3);
});

// 4
schedule.scheduleJob("*/1 * * * *", function () {
    botBiz.botParam(4);
});

// 期货现货
schedule.scheduleJob("*/10 * * * * *", function () {
    botBiz.cryptocurrencies();
});

schedule.scheduleJob("*/20 * * * *", function () {
    botBiz.botassets();
});

schedule.scheduleJob("*/60 * * * *", function () {
    botBiz.saveBotParam();
});

schedule.scheduleJob("*/30 * * * *", function () {
    botBiz.config()
});
