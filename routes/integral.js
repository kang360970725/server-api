/**
 * @api {get} v1/integral/integrals 积分详情查询
 * @apiName v1/integral/integrals
 * @apiGroup integral
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  活动id 可空
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": [
        {
            "id": 17,
            "user_uuid": "001332", 用户编号
            "integral_total": 240, 历史总积分
            "integral_current": 0, 当前余额积分
            "integral_level": 0 积分等级
        }
    ]
}
 *}
 */


/**
 * @api {get} v1/integral/integralinfos 积分明细查询
 * @apiName v1/integral/integralinfos
 * @apiGroup integral
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  活动id 空新增 不为空修改
 * @apiParam {String} startTime  活动名称 不可空
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
            "id": 1,
            "user_uuid": "001332",
            "integral": 120, 积分情况
            "integral_explain": "购买套餐", 积分说明
            "creattime": "2019-03-25T05:48:24.000Z"
        }
    ]
 }
 */


/**
 * @api {get} v1/integral/integralconfig 积分配置查询
 * @apiName v1/integral/integralconfig
 * @apiGroup integral
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
        "inviterIntegral": "1000", 邀请注册积分
        "integral": "1001",注册积分
        "buyProductIntegraRatio": "10" 购买产品价格与积分比例
    }
}
 */


/**
 * @api {get} v1/integral/saveintegralconfig 系统配置
 * @apiName v1/integral/saveintegralconfig
 * @apiGroup integral
 * @apiVersion 1.0.0
 *
 *
 * @apiParam {String} key  配置key值 不可空 registerInviterIntegral 邀请注册积分 registerIntegral 注册积分 buyProductIntegraRatio 购买产品价格与积分比例  btcurl 比特币支付地址
 * @apiParam {String} value  活动名称 不可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "key":"buyProductIntegraRatio",
       "value":"10"
}

 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful"
}
 */

/**
 * @api {get} v1/integral/queryintegralconfig 系统配置查询
 * @apiName v1/integral/queryintegralconfig
 * @apiGroup integral
 * @apiVersion 1.0.0
 *
 *
 * @apiParam {String} key  配置key值 不可空 registerInviterIntegral 邀请注册积分 registerIntegral 注册积分 buyProductIntegraRatio 购买产品价格与积分比例  btcurl 比特币支付地址 sys_img 比特币支付二位码图片地址
 *
 * @apiParamExample {json} 请求参数:
 {
       "key":"buyProductIntegraRatio",
  }

 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "data": [
        {
            "id": 132,
            "sys_type": "sys_img", 配置类型
            "sys_value": "http://192.168.0.33/source/2019-05-09/0.12750279240594753.png", 配置内容
            "createtime": "2019-05-09 16:24:48"
        }
    ],
    "message": "successful"
}
 */
