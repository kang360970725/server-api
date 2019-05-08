'use strict';
let
    poolBiz = require('../business/biz/poolRobot.js'),
    redis = require('../db_config/config').redisCli;


class ctrl {
    static async poollist() {
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

    static async BTCPrice() {
        console.log("开始获取BTC数据");
        let btcPrice = await poolBiz.nowBTCPrice(redis);
        let quotationBTCPrice = await poolBiz.quotationPrice(0, redis);
        let quotationETHPrice = await poolBiz.quotationPrice(1, redis);
        redis.set("btcPrice", JSON.stringify({
            btcPrice: btcPrice,
            quotationBTCPrice: quotationBTCPrice,
            quotationETHPrice: quotationETHPrice
        }))
        console.log("获取BTC数据结束");
    }

    static async botParam(index) {
        poolBiz.usersBotParam({redis: redis, index: index});
    }

    static async botassets() {
        poolBiz.usersBotassets({redis: redis});
    }

    static async saveBotParam() {
        poolBiz.saveBotParam({redis: redis});
    }

    static async cryptocurrencies() {
        poolBiz.saveCryptocurrencies({redis: redis});
    }
}

module.exports = ctrl;