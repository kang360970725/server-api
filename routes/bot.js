/**
 * @api {get} v1/bot/getBots 仪表盘获取机器人信息
 * @apiName v1/bot/getBots
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "pool": [
            {
                "id": 25,
                "name": "凤凰1期",
                "flag": 1,
                "begin": "2019-03-25T21:58:00+08:00",
                "end": "2019-05-25T21:58:00+08:00",
                "cost": 20.058,
                "balance_total": 15.147972359999999,
                "users": [
                    {
                        "user_id": "1365",
                        "symbol": "",
                        "data": {
                            "status": "撒网布局中",
                            "balance": 1.01417224,
                            "side": "no",
                            "size": "0",
                            "avg_entry_price": 0,
                            "liquidation_price": 0
                        }
                    },
                    {
                        "user_id": "1366",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 0.79397741,
                            "side": "SHORT",
                            "size": "-322",
                            "avg_entry_price": 5201.0194,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1369",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 1.67698868,
                            "side": "SHORT",
                            "size": "-304",
                            "avg_entry_price": 5206.7,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1370",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 1.34772519,
                            "side": "SHORT",
                            "size": "-244",
                            "avg_entry_price": 5206.7,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1371",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 1.56368992,
                            "side": "SHORT",
                            "size": "-636",
                            "avg_entry_price": 5208.8759,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1394",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 1.42637662,
                            "side": "SHORT",
                            "size": "-258",
                            "avg_entry_price": 5206.7,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1395",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 1.48641987,
                            "side": "SHORT",
                            "size": "-604",
                            "avg_entry_price": 5208.8759,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1396",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 1.3675029300000001,
                            "side": "SHORT",
                            "size": "-248",
                            "avg_entry_price": 5206.7,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1397",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 1.6291742,
                            "side": "SHORT",
                            "size": "-662",
                            "avg_entry_price": 5208.8759,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1407",
                        "symbol": "",
                        "data": {
                            "status": "补仓满了,低速300+循环等待机会解套",
                            "balance": 0.86373403,
                            "side": "LONG",
                            "size": "2581",
                            "avg_entry_price": 5232.3148,
                            "liquidation_price": 1904
                        }
                    },
                    {
                        "user_id": "1408",
                        "symbol": "",
                        "data": {
                            "status": "空军正常持仓中",
                            "balance": 0.89700231,
                            "side": "SHORT",
                            "size": "-362",
                            "avg_entry_price": 5208.8759,
                            "liquidation_price": 100000000
                        }
                    },
                    {
                        "user_id": "1409",
                        "symbol": "",
                        "data": {
                            "status": "补仓满了,低速300+循环等待机会解套",
                            "balance": 1.08120896,
                            "side": "LONG",
                            "size": "6359",
                            "avg_entry_price": 5257.3471,
                            "liquidation_price": 2773.5
                        }
                    }
                ]
            },
            .....
        ],
        "bot": {
            "id": 84,
            "user_account": "maoxrr@qq.com",
            "created": "2019-03-18T01:48:56.000Z",
            "level": "VIP新版39s",
            "new_position_qty": "417",
            "bot_nanpin": "521",
            "max_position_qty": "15005",
            "nanpin_count": "31",
            "status": "补仓满了,等待机会解套",
            "bot_side": "SHORT",
            "bot_size": "-16789",
            "bot_avgEntryPrice": "3933.4461",
            "bot_liquidationPrice": "7605",
            "bot_mex_last": "3998.5",
            "bot_balance": "2.0118961",
            "marginLeverage": "2.1",
            "bot_prevDeposited": "2.0",
            "bot_prevWithdrawn": "0.0",
            "bot_amount": "2.08754453",
            "bot_lirun": "0.08754453000000018",
            "shortrange": "80",
            "longrange": "80"
        }
    }
}
 */

/**
 * @api {get} V1/bot/parameters/:uuid 获取会员机器人参数
 */

/**
 * @api {post} v1/bot/set/parameters/:uuid 修改会员机器人参数
 */

/**
 * @api {get} v1/bot/parameters 获取官方推荐参数
 */
