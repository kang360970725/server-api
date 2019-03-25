/**
 * @api {get} /integral/integrals 积分详情查询
 * @apiName 积分详情查询
 * @apiGroup integral
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
    ]
}
 *}
 */


/**
 * @api {get} /integral/integralinfos 积分明细查询
 * @apiName 积分明细查询
 * @apiDescription
 * @apiGroup integral
 *
 * @apiParam {String} id  活动id 空新增 不为空修改
 * @apiParam {String} startTime  活动名称 不可空
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