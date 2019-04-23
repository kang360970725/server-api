

/**
 * @api {get} v1/activity/activitys 活动查询
 * @apiName v1/activity/activitys
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  活动id 可空 如需多id逗号隔开 如 1,2,3,4 空为全部
 * @apiParam {String} info  是否查询活动info信息 非空查询 空不查询
 * @apiParam {String} types 查询info类型  0 价格 1返现 2免费 3打折 4积分奖励 5 月卡价格 6季卡价格 7 年卡价格 200 轮播图片 201封面 202活动关联的产品 如需多类型逗号隔开 如 1,2,3,4 空为全部类型
 *
 * @apiParam {String} forbidden  活动是否有效 0有效 1无效 app传0 空为全部
 * @apiParam {String} name  活动名称 模糊查询 可空
 * @apiParam {String} title  活动title 模糊查询 可空
 * @apiParam {String} code  活动code 精准查询 可空
 * @apiParam {String} startTime  活动开始时间 可空
 * @apiParam {String} endTime  活动结束时间 可空
 * @apiParam {String} content 是否查询活动内容信息 非空查询 空不查询
 * @apiParam {String} type 类型 0活动 1产品 2矿池 3公告 4关于蓝猫 5新手帮助 空查询全部  查询多个用,号隔开
 * @apiParam {String} pageSize 数据量 非空
 * @apiParam {String} pageIndex 0开始 页数 非空
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * "data": {
        "list": [
            {
                "activity_id": 6,
                "activity_name": "adminhy",
                "activity_title": "12345677",
                "activity_code": "jj8dFU2A",
                "infos": [
                    [
                        {
                            "id": 1,
                            "activity_id": 1,
                            "info_type": 1,
                            "info_value": 1,
                            "info_explain": "1"
                        },
                        {
                            "id": 2,
                            "activity_id": 1,
                            "info_type": 2,
                            "info_value": 1234,
                            "info_explain": "1232333"
                        }
                    ]
                ]
            }
        ],
        "count": 1
    }
 *}
 */


/**
 * @api {get} v1/activity/activityinfos 活动信息查询
 * @apiName v1/activity/activityinfos
 * @apiGroup activity
 * @apiVersion 1.0.0
 * @apiParam {String} id  活动id 可空 如需多id逗号隔开 如 1,2,3,4 空为全部
 * @apiParam {String} types 查询info类型  0 价格 1返现 2免费 3打折 4积分奖励 5 月卡价格 6季卡价格 7 年卡价格 200 轮播图片 201封面 202活动关联的产品 如需多类型逗号隔开 如 1,2,3,4 空为全部类型
 * @apiParam {String} pageSize 数据量 可空
 * @apiParam {String} pageIndex 0开始 页数 可空
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * "data": {
        "list": [
                        {
                            "id": 1,
                            "activity_id": 1,
                            "info_type": 1,
                            "info_value": 1,
                            "info_explain": "1"
                        },
        ],
        "count": 1
    }
 *}
 */

/**
 * @api {POST} v1/activity/addorupdate 活动添加和修改
 * @apiName 活动添加和修改
 * @apiDescription 使用该接口进行修改会进行全修改
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  活动id 空新增 不为空修改
 * @apiParam {String} name  活动名称 不可空
 * @apiParam {String} title  活动title 不可空
 * @apiParam {String} startTime  活动开始时间 可空
 * @apiParam {String} endTime  活动结束时间 可空
 * @apiParam {String} content 询活动内容信息 不可空
 * @apiParam {String} type 类型 0活动 1产品 2矿池 3公告 4关于蓝猫 5新手帮助
 * @apiParam {String} forbidden 活动是否有效 0有效 1无效 默认0 可空
 * @apiParam {Array} infos  活动info信息
 * @apiParam {String} infos.type info类型  1返现 2免费 3打折 4积分奖励 5 月卡价格 6季卡价格 7 年卡价格 200 轮播图片 201封面 202活动关联的产品
 * @apiParam {String} infos.value  活动info内容
 * @apiParam {String} infos.explain  活动info说明
 *
 * @apiParamExample {json} 请求参数:
 *{
       "id":"6",
       "name":"adminhy",
       "title":"12345677",
       "startTime":"2019-03-21 15:43:00",
       "content":"123",
       "endTime":"",
       "forbidden":1,
       "infos":[{"type":1,"value":123,"explain":123

       }]
}
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "id": "6"
    }
}
 *}
 */


/**
 * @api {POST} v1/activity/addpv 添加浏览记录
 * @apiName v1/activity/addpv
 * @apiDescription 添加浏览记录
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  活动id 空新增 不为空修改
 *
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "id": "6"
    }
}
 *}
 */


/**
 * @api {POST} v1/activity/updateinfo 活动info修改
 * @apiName 活动info修改 部分修改info信息可以使用
 * @apiDescription 部分修改info信息可以使用
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String}  id  活动id 不可空
 * @apiParam {Array} infos  活动info信息
 * @apiParam {String} infos.id  info id 不可空
 * @apiParam {String} infos.type info类型  1返现 2免费 3打折 4积分奖励  200 轮播图片 201封面 202活动关联产品
 * @apiParam {String} infos.value  活动info内容
 * @apiParam {String} infos.explain  活动info说明
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":1,"infos":[{"type":1,"value":123,"explain":123,"id":21

       },{
       	"type":2,"value":1234,"explain":1232333,"id":2
       }]
}
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "id": "6"
    }
}
 *}
 */


/**
 * @api {POST} v1/activity/adduserunion 申请购买产品
 * @apiName activity/adduserunion
 * @apiDescription 申请购买产品 申请后需要确认申请 调用confirmuserunion接口 不然无法显示该申请（用户点击完成转账）
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String}  id   用户id 可空 管理员需传
 * @apiParam {String} account  用户账号 可空 管理员需传
 * @apiParam {String} value  产品id 不可空
 * @apiParam {String} isValid 产品时间类别  不可空 1月 2季度 3年
 * @apiParam {String} activityId 活动id 可空
 * @apiParam {String} desc  说明 可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":"",
       "account":"17313208597@163.com",
       "value":"9",
       "isValid":"1",
       "price":"0.222",
       "desc":"test"
}
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 4,
        "serverStatus": 1,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
 */

/**
 * @api {POST} v1/activity/updateuserunion 审核or上传购买凭证
 * @apiName activity/updateuserunion
 * @apiDescription 审核or上传购买凭证
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String}  id   申购产品记录id 不可空
 * @apiParam {String} type  是否审核成功 可空 2成功 其他不成功 管理员需传
 * @apiParam {String} credential 凭证路径（图片上传返回的路径）  可空  用户需传
 * @apiParam {String} price  价格 可空 管理员可修改价格
 * @apiParam {String} desc  说明 可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":44,
       "type":"2",
       "price":"0.222",
       "desc":"test",
       "credential":"123123123132131"
}
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 4,
        "serverStatus": 1,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
 */

/**
 * @api {POST} v1/activity/confirmuserunion 确认申请
 * @apiName activity/confirmuserunion
 * @apiDescription 确认申请
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String}  id   申购产品记录id 不可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":44
}
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 4,
        "serverStatus": 1,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
 */



/**
 * @api {POST} v1/activity/adduserpoolunion 加入矿池申请
 * @apiName activity/adduserpoolunion
 * @apiDescription 加入矿池申请
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String}  uuid   用户id 可空 管理员需传
 * @apiParam {String} account  用户账号 可空 管理员需传
 * @apiParam {String} isValid  是否有效 可空 管理员需传 0有效 1无效
 * @apiParam {String} value  活动id 不可空
 * @apiParam {String} nickname  昵称 不可空
 * @apiParam {String} relname  真名 不可空
 * @apiParam {String} phone  电话 可空 邮件和电话必须有一个
 * @apiParam {String} email  邮件 可空
 * @apiParam {String} amount  币量 不可空
 * @apiParam {String} desc  描述 可空
 *
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":"001332",
       "account":"15828982828@139.com",
       "relname":"1",
       "value":"8",
       "nickname":"1",
       "phone":"0.222",
       "email":"test",
       "amount":"123.2",
       "isValid":"1"
}
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 6,
        "serverStatus": 1,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
 */


/**
 * @api {POST} v1/activity/updateuserpoolunion 审核
 * @apiName activity/updateuserpoolunion
 * @apiDescription 审核or上传购买凭证
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  申请加入矿池记录id 不可空
 * @apiParam {String} value  活动id 不可空
 * @apiParam {String} isValid  是否有效 可空 管理员需传 0有效 1无效
 * @apiParam {String} nickname  昵称 不可空
 * @apiParam {String} relname  真名 不可空
 * @apiParam {String} phone  电话 可空 邮件和电话必须有一个
 * @apiParam {String} email  邮件 可空
 * @apiParam {String} amount  币量 不可空
 * @apiParam {String} poolId  矿池id 可空 管理员传入字段 如果该字段不为空 则isValid为 0
 * @apiParam {String} token  矿池token 可空 管理员传入字段 如果矿池id不为空 则token不能为空
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":44,
       "type":"2",
       "price":"0.222",
       "desc":"test",
       "credential":"123123123132131"
}
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 4,
        "serverStatus": 1,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
 */


/**
 * @api {get} v1/activity/renew 产品购买申请记录查询
 * @apiName activity/renew
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  申请id 可空
 * @apiParam {String} account  用户账户 可空
 * @apiParam {String} unionId  用户关联id 可空
 * @apiParam {String} type 申请状态 可空 0 待上传凭证   1 审核中  2 完成  3 失败被拒绝
 * @apiParam {String} pageSize 数据量 非空
 * @apiParam {String} pageIndex 0开始 页数 非空
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": [
        {
            "id": 21,
            "account": "15828982828@139.com",
            "create_time": "2018-12-11T07:57:17.000Z",
            "type": "3",
            "desc": "",
            "credential": "public/images/2018-12-10/15828982828@139.compay.png",
            "price": "0.584",
            "data_time": "2"
        }
    ]
}
 */


/**
 * @api {get} v1/activity/pool 矿池申请记录查询
 * @apiName activity/pool
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  申请id 可空
 * @apiParam {String} uuid  用户编号 可空
 * @apiParam {String} relname  真实姓名 可空
 * @apiParam {String} nickname 昵称 可空
 * @apiParam {String} phone  电话 可空
 * @apiParam {String} email  邮件 可空
 * @apiParam {String} poolId  矿池id 可空 如需多个矿池逗号隔开 如 1,2,3,4 空为还未分配矿池申请 ALL为全部已分配矿池申请
 * @apiParam {String} unionId  用户关联id 可空
 * @apiParam {String} pageSize 数据量 非空
 * @apiParam {String} pageIndex 0开始 页数 非空
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": [
        {
            "id": 2,
            "user_uuid": 0,
            "user_relname": "1",
            "user_nickname": null,
            "user_phone": "0.222",
            "user_email": "test",
            "amount": 123.2,
            "createtime": "2019-03-29T03:17:44.000Z",
            "updatetime": "0000-00-00 00:00:00",
            "pool_id": "1",
            "union_id": 6
        }
    ]
}
 */


/**
 * @api {get} /v1/activity/nowbtcprice 比特币价格查询
 * @apiName /v1/activity/nowbtcprice
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": {
        "btcPrice": {
            "Binance": 5255.87, 币安
            "huobi": 5256.98,火币
            "OKEx": 5257.2 OK
        },
        "quotationBTCPrice": {
            "id": 816115,
            "mex_high": 5333,压力位
            "mex_low": 5283.5,支撑位
            "mex_last": 5290,现价(最新价)
            "coin_type": 0,
            "exchange": "",
            "pair_currency": "",
            "change_24_absolute": null,
            "change_rate": null,
            "volume_24h": null,
            "created": "2019-04-11T10:34:19.663751+08:00",
            "modified": "2019-04-11T10:34:19.663922+08:00"
        }
    }
}
 */

/**
 * @api {POST} v1/activity/delete 删除活动
 * @apiName v1/activity/delete
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  活动id 不可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":"1",
}
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
}
 */

