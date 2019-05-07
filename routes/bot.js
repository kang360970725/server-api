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
 * @apiParam {String} botType  机器人类型 0  期货   1 现货
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
        "Integral":{
            "id": 17,
            "user_uuid": "001332", 用户编号
            "integral_total": 240, 历史总积分
            "integral_current": 0, 当前余额积分
            "integral_level": 0 积分等级
        }
    },
    "date": "2019-04-25T08:56:26.728Z"
}
 */

/**
 * @api {get} V1/bot/getParameters 获取会员设置的机器人参数
 * @apiName v1/bot/getParameters
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 * @apiParam {String} bot_type 机器人类型   0 期货机器人  1 现货机器人  (不可空)
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": [
        {
            "open": "0",                    //开关机器人  0是关闭，1是启动
            "entry": 250,                   //---自定义头寸
            "trendfollow": "1",             //---趋势交易
            "mm": "1",                      //---自动管理MM   0是关闭，1是启动
            "mmpercent": 0.0007,            // ---MM头寸比例
            "nanpin": "250",                //---自定义补仓
            "maxnanpin": "28",              //---最大补仓次数
            "mmnanpin": "1.25",             //MM每次补仓的比例
            "maxleverage": "50",            //----最大持仓
            "leverage": "0",                //---最大杠杆
            "sleep": "40",                  //循环时间推荐40或70，单位秒
            "longrange": "80",              //---多军止盈间距
            "longstop": "28",               //---多军补仓间距
            "shortrange": "80",             //---空军止盈间距
            "shortstop": "28",              //---空军补仓间距
            "losscut": "1",                 //根据钱包余额实时计算止损金额。(1表示不止损)
            "time": "5",                    //k线指标:1表示1分钟线，5表示5分钟线
            "longstopx": "1999",            //---多军点位止损
            "shortstopx": "1999",           //---空军点位止损
            "longorder": "2",               //多军的单边交易    0关闭多军交易  1打开(市价建仓交易)  2打开(限价建仓交易)
            "shortorder": "2",              //空军的单边交易    0关闭空军交易  1打开(市价建仓交易)  2打开(限价建仓交易)
            "nanpin_cancel": "0",           //0无效,0.5空手道,1全仓认输,2.0乾坤大挪移
            "nanpin_order": "0",            //2=急速手续费,1=高速补,0=低速补                ---补仓模式
            "doten": "1"                    //反手光环    0 关闭  1 开启
            "bot_type": "0"                 //参数关联的机器人类型
        }
    ],
    "date": "2019-04-26T11:10:28.197Z"
}
 */


/**
 * @api {get} V1/bot/getExchange 获取会员交易所设置数据
 * @apiName v1/bot/getExchange
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": [
        {
            "api": "",                      //api
            "secret": "",                   //secret
            "bot_type": "0"                 //交易所(和机器人类型) 0  bitmex(期货)   1 huobi(现货，注:交易所暂定为火币)
        }
    ],
    "date": "2019-04-26T11:10:28.197Z"
}
 */
/**
 * @api {get} V1/bot/exitExchange 修改会员交易所数据
 * @apiName v1/bot/exitExchange
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 * @apiParam {String} api 交易所API
 * @apiParam {String} secret 交易所secret
 * @apiParam {String} bot_type  交易所类别   0 期货机器人  1 现货机器人  (不可空)
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "desc": "修改成功"
    },
    "date": "2019-04-26T12:44:00.445Z"
}
 */

/**
 * @api {post} V1/bot/exitBotParm 修改会员机器人参数
 * @apiName v1/bot/exitBotParm
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 * @apiParam {String} open                     //开关机器人  0是关闭，1是启动
 * @apiParam {String} entry                    //---自定义头寸
 * @apiParam {String} trendfollow              //---趋势交易
 * @apiParam {String} mm                       //---自动管理MM   0是关闭，1是启动
 * @apiParam {String} mmpercent                // ---MM头寸比例
 * @apiParam {String} nanpin                   //---自定义补仓
 * @apiParam {String} maxnanpin               //---最大补仓次数
 * @apiParam {String} mmnanpin                //MM每次补仓的比例
 * @apiParam {String} maxleverage             //----最大持仓
 * @apiParam {String} leverage                 //---最大杠杆
 * @apiParam {String} sleep                   //循环时间推荐40或70，单位秒
 * @apiParam {String} longrange               //---多军止盈间距
 * @apiParam {String} longstop                //---多军补仓间距
 * @apiParam {String} shortrange              //---空军止盈间距
 * @apiParam {String} shortstop               //---空军补仓间距
 * @apiParam {String} losscut                  //根据钱包余额实时计算止损金额。(1表示不止损)
 * @apiParam {String} time                     //k线指标:1表示1分钟线，5表示5分钟线
 * @apiParam {String} longstopx                 //---多军点位止损
 * @apiParam {String} shortstopx                //---空军点位止损
 * @apiParam {String} longorder                //多军的单边交易    0关闭多军交易  1打开(市价建仓交易)  2打开(限价建仓交易)
 * @apiParam {String} shortorder              //空军的单边交易    0关闭空军交易  1打开(市价建仓交易)  2打开(限价建仓交易)
 * @apiParam {String} nanpin_cancel           //0无效,0.5空手道,1全仓认输,2.0乾坤大挪移
 * @apiParam {String} nanpin_order            //2=急速手续费,1=高速补,0=低速补                ---补仓模式
 * @apiParam {String} doten                   //反手光环    0 关闭  1 开启
 * @apiParam {String} bot_type                //机器人类型   0 期货机器人  1 现货机器人  (不可空)
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "desc": "修改成功"
    },
    "date": "2019-04-26T11:53:52.719Z"
}
 */

/**
 * @api {get} v1/bot/getParametersRec 获取官方推荐参数
 * @apiName v1/bot/getParametersRec
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 * @apiParam {String} bot_type 机器人类型   0 期货机器人  1 现货机器人  (不可空)
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": [
        {
            "entry": 250,                   //---自定义头寸
            "trendfollow": "1",             //---趋势交易
            "mm": "1",                      //---自动管理MM   0是关闭，1是启动
            "mmpercent": 0.0007,            // ---MM头寸比例
            "nanpin": "250",                //---自定义补仓
            "maxnanpin": "28",              //---最大补仓次数
            "mmnanpin": "1.25",             //MM每次补仓的比例
            "maxleverage": "50",            //----最大持仓
            "leverage": "0",                //---最大杠杆
            "sleep": "40",                  //循环时间推荐40或70，单位秒
            "longrange": "80",              //---多军止盈间距
            "longstop": "28",               //---多军补仓间距
            "shortrange": "80",             //---空军止盈间距
            "shortstop": "28",              //---空军补仓间距
            "losscut": "1",                 //根据钱包余额实时计算止损金额。(1表示不止损)
            "time": "5",                    //k线指标:1表示1分钟线，5表示5分钟线
            "longstopx": "1999",            //---多军点位止损
            "shortstopx": "1999",           //---空军点位止损
            "longorder": "2",               //多军的单边交易    0关闭多军交易  1打开(市价建仓交易)  2打开(限价建仓交易)
            "shortorder": "2",              //空军的单边交易    0关闭空军交易  1打开(市价建仓交易)  2打开(限价建仓交易)
            "nanpin_cancel": "0",           //0无效,0.5空手道,1全仓认输,2.0乾坤大挪移
            "nanpin_order": "0",            //2=急速手续费,1=高速补,0=低速补                ---补仓模式
            "doten": "1"                    //反手光环    0 关闭  1 开启
            "bot_type": "0"                 //参数关联的机器人类型
        }
    ],
    "date": "2019-04-26T11:10:28.197Z"
}
 */


/**
 * @api {get} v1/bot/getcryptocurrencies 获取行情数据
 * @apiName v1/bot/getcryptocurrencies
 * @apiGroup bot
 * @apiVersion 1.0.0
 *
 * @apiParam {String} type 行情类型   0 期货  1 现货  (不可空)
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "BitMEX":[ //交易所
            {
                "id": 974051,
                "created": "2019-05-05T11:03:44.279592+08:00",
                "market_cap": "9999.00000000",
                "price": "5729.50000000",
                "volume_24h": "3197002054.00000000", 24小时交易量
                "circulating_supply": "9999.00000000",
                "change_24_absolute": "-31.00000000", 24小时变化量
                "change_24h": -0.0053814775, 24小时变化率
                "high_price_24": "5850.00000000", 24小时高点
                "low_price_24": "5502.00000000",24小时低点
                "utc_timestamp": 1557025419,
                "pair_currency": "USD",
                "pair_currency_fk": 1,
                "coin_type": null,
                "creator": null,
                "cryptocurrency": {
                    "id": 1,
                    "en_name": "BTC",名称
                    "zh_name": "比特币",
                    "logo": "https://api.worldbtc.net/media/cryptocurrency/logos/BTC.png",
                    "logo_thumbnail_url": "https://api.worldbtc.net/media/CACHE/images/cryptocurrency/logos/BTC/803d42f3ee8c24b5f63438b3c6ddd50f.png",
                    "internal_no": "000001",
                    "creator": 5
                },
                "exchange": {
                    "id": 1,
                    "en_name": "BitMEX", 交易所
                    "zh_name": "期货交易所",
                    "logo": "https://api.worldbtc.net/media/exchange/logos/WechatIMG248.jpeg",
                    "logo_thumbnail_url": "https://api.worldbtc.net/media/CACHE/images/exchange/logos/WechatIMG248/c053b4860c2f8108b7b4f29d24664f96.png",
                    "official_website": "https://www.bitmex.com/register/DBUO2E",
                    "zone": "",
                    "internal_no": "000001",
                    "creator": 5
                },
                "price_direction": -1, 涨跌情况 -1跌 1涨
                "row_key": "1-1-USD",
                "watch_info": {
                    "in_watch_list": false,
                    "watch_id": null,
                    "watch_count": 2
                }
            }
    ......
    ]
    },
    "date": "2019-04-26T11:10:28.197Z"
}
 */
