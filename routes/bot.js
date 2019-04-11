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
