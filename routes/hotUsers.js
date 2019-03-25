/**
 * @api {get} V1/hot/users 获取排行榜用户和热门用户
 * @apiName 获取排行榜用户和热门用户
 * @apiGroup business
 * @apiVersion 1.0.0
 *
 * @apiParam {String} type  1 热门用户列表  2 排行榜用户列表
 * @apiParam {int} pagesize  分页、取多少条
 * @apiParam {int} index  分页、第几页
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 {
    "status": 0,
    "message": " Interface response successful ",
    "data": {
        "list": [
            {
                "account": "349612914@qq.com",   //账户名称
                "uuid": "0001355",   //uuid
                "nickname": "349612914@qq.com",   //账户昵称
                "bot_amount": "5.27e-06",       //账户钱包余额
                "bot_lirun": "0.0007052699999999923",    //账户盈亏合计字段
                "bot_prevDeposited": "0.0995",      //账户充币合计
                "bot_prevWithdrawn": "0.1002"       //账户提币合计
            }
        ],
        "count": 29   //数据总条数
    }
}
}
 */
