/**
 * @api {get} v1/integral/integrals 积分详情查询
 * @apiName 积分详情查询
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
 * @api {get} v1/integral/integralinfos 积分明细查询1
 * @apiName 积分明细查询1
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