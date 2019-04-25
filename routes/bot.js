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
                    },
                    .....
                ],
                balance: [
                    {
                        "created": "2019-03-26T20:00:01.854388+08:00",
                        "balance": 13.00242851
                    },
                    .....
                ]
            },
            .....
        ],
        "bot": [
        {
            "id": 84,
            "user_account": "maoxrr@qq.com",        //账号
            "created": "2019-03-18T01:48:56.000Z",  //更新时间
            "level": "VIP新版39s",                   //机器人版本
            "new_position_qty": "417",          //头寸金额
            "bot_nanpin": "521",                //补仓金额
            "max_position_qty": "15005",        //最大持仓
            "nanpin_count": "31",               //已补次数
            "status": "补仓满了,等待机会解套",    //机器人状态
            "bot_side": "SHORT",                //持仓方向   LONG 多军   SHORT 空军
            "bot_size": "-16789",               //持仓数量
            "bot_avgEntryPrice": "3933.4461",   //持仓均价
            "bot_liquidationPrice": "7605",     //爆仓点位
            "bot_mex_last": "3998.5",           //最新价
            "bot_balance": "2.0118961",         //余额
            "marginLeverage": "2.1",            //已用杠杆
            "bot_prevDeposited": "2.0",         //账户充币合计
            "bot_prevWithdrawn": "0.0",         //账户提币合计
            "bot_amount": "2.08754453",         //账户钱包余额
            "bot_lirun": "0.08754453000000018", //账户盈亏合计字段
            "shortrange": "80",                 //空军止赢间距
            "longrange": "80"                   //空军止赢间距
            "type": 0 机器人类型 0现货 1期货
        }
        .....
        ]
    }
}
 */


/**
 * @api {get} v1/bot/getAccRecordChart 获取用户资金走势  绘制折线图
 * @apiName v1/bot/getAccRecordChart
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 * @apiParam {String} limit  多少个小时以内的数据
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 * {
    "status": 0,
    "message": "successful",
    "data": [
        {
            "id": 17,
            "user_account": "b5_bot", 用户账户
            "bot_balance": "1.03053386",账户资产，余额
            "bot_change_num": "",
            "bot_side": "SHORT",  持仓方向
            "bot_size": "-3026",  持仓数量
            "bot_avgEntryPrice": "5482.4561",   持仓均价
            "bot_liquidationPrice": "100000000",    爆仓价格
            "bot_mex_last": "5574.5",      最新价
            "bot_set_time": "2019-04-23T19:58:01.000Z",     写入数据时间
            "type": "",             类型
            "bot_warn_state": "",     状态
            "bot_warn_txt": "空军正常持仓中",    机器人运行状态
            "bonus_base":"-0.19899591999999977", 收益
            "hour": 3      时间单位   小时
        },
        ...
    ]
}
 */

/**
 * @api {get} v1/bot/getAccRecordList 获取用资金记录
 * @apiName v1/bot/getAccRecordList
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 * @apiParam {String} pageSize 数据量 可空
 * @apiParam {String} pageIndex 0开始 页数 可空
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "list": [
            {
                "id": 101,
                "user_account": "b5_bot", 用户账户
                "bot_balance": "1.03053386",账户资产，余额
                "bot_change_num": "",
                "bot_side": "SHORT",  持仓方向
                "bot_size": "-3026",  持仓数量
                "bot_avgEntryPrice": "5482.4561",   持仓均价
                "bot_liquidationPrice": "100000000",    爆仓价格
                "bot_mex_last": "5574.5",      最新价
                "bot_set_time": "2019-04-23T19:58:01.000Z",     写入数据时间
                "type": "",             类型
                "bot_warn_state": "",     状态
                "bot_warn_txt": "空军正常持仓中",    机器人运行状态
                "bonus_base":"-0.19899591999999977", 收益
                "day": "2019-04-24" 日期
            }
        ],
        "count": 1
    }
}
 */


/**
 * @api {get} v1/bot/getAssets 获取用户资产
 * @apiName v1/bot/getAssets
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
        "bot_balance": 1.04077617, 余额
        "bot_lirun": -0.19899591999999977, 收益 历史收益 收益率 = 历史收益/历史充值本金
        "bot_prevDeposited": 5.25065958, 充值本金
        "yesterday": 0,昨日收益
        "LastMonth": 0.8004299400000003 本月收益
    },
    "date": "2019-04-25T08:56:26.728Z"
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
