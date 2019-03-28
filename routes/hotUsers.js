/**
 * @api {get} v1/hotUsers/getUserList 获取排行榜用户和热门用户
 * @apiName 获取排行榜用户和热门用户
 * @apiGroup hot
 *
 * @apiParam {String} type  1 热门用户列表  2 排行榜用户列表
 * @apiParam {int} pagesize  分页、取多少条
 * @apiParam {int} index  分页、第几页
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 "message": " Interface response successful ",
 "data": {
        "list": [
            {  //热门用户数据结构
            {
                "account": "349612914@qq.com",   //账户名称
                "uuid": "0001355",   //uuid
                "nickname": "349612914@qq.com",   //账户昵称
                "bot_amount": "5.27e-06",       //账户钱包余额
                "bot_lirun": "0.0007052699999999923",    //账户盈亏合计字段
                "bot_prevDeposited": "0.0995",      //账户充币合计
                "bot_prevWithdrawn": "0.1002"       //账户提币合计
            },
            {   //排行榜用户数据
                "id": 21,
                "user_account": "935859399@qq.com",   //账号
                "created": "2019-03-16T12:27:38.000Z",  //更新时间
                "level": "VIP新版39s",            //机器人版本
                "new_position_qty": "1633",       //头寸金额
                "bot_nanpin": "2041",               //补仓金额
                "max_position_qty": "103683",       //最大持仓
                "nanpin_count": "46",               //已补次数
                "status": "空军正常持仓中",            //机器人状态
                "bot_side": "SHORT",                //持仓方向   LONG 多军   SHORT 空军
                "bot_size": "-95108",               //持仓数量
                "bot_avgEntryPrice": "3937.3179",   //持仓均价
                "bot_liquidationPrice": "4705",     //爆仓点位
                "bot_mex_last": "3982.5",           //最新价
                "bot_balance": "3.81670473",        //余额
                "marginLeverage": "6.3",            //已用杠杆
                "bot_prevDeposited": "9.7746",      //账户充币合计
                "bot_prevWithdrawn": "11.5084",     //账户提币合计
                "bot_amount": "4.12158656",         //账户钱包余额
                "bot_lirun": "5.85538656",          //账户盈亏合计字段
                "uuid": "0001371",                  //账户UUID
                "current": 0,                       //账户可用积分
                "total": 0                          //账户总计积分
            }
        ],
        "count": 29   //数据总条数
    }
}
 }
 */
