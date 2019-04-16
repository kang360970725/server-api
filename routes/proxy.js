

/**
 * @api {get} v1/proxy/proxys 代理申请查询
 * @apiName v1/proxy/proxys
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  申请id 可空
 * @apiParam {String} uuid  用户编号 后台用户使用 可空
 * @apiParam {String} name 用户申请姓名 模糊查询 可空
 * @apiParam {String} phone  用户申请电话 模糊查询 可空
 * @apiParam {String} email  用户申请email 模糊查询 可空
 * @apiParam {String} status  申请状态 0申请 1成为代理 可空
 * @apiParam {String} level  代理等级 可空
 * @apiParam {String} startTime  申请开始时间 可空
 * @apiParam {String} endTime  申请结束时间 可空
 * @apiParam {String} pageSize 数据量 可空
 * @apiParam {String} pageIndex 0开始 页数 可空
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": {
        "list": [
            {
                "id": 1,
                "user_id": "6",
                "user_name": "adminhy11",
                "user_phone": "12345677",
                "user_email": "123",
                "creattime": "2019-04-16T09:07:46.000Z",
                "status": 1,
                "proxy_level": 1,
                "updatetime": "2019-04-16T09:07:34.000Z"
            }
        ],
        "count": 1
    }
}
 */

/**
 * @api {POST} v1/proxy/addproxy 申请成为代理
 * @apiName v1/proxy/addproxy
 * @apiDescription
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} uuid  用户id 后台用户使用 可空
 * @apiParam {String} name  申请用户名称 不可空
 * @apiParam {String} phone  申请用户电话 可空
 * @apiParam {String} email  申请用户email 可空
 *
 * @apiParamExample {json} 请求参数:
      {
       "uuid":"6",
       "name":"adminhy",
       "phone":"12345677",
       "email":"123"
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
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
 */


/**
 * @api {POST} v1/proxy/updateproxy 代理申请修改或审核
 * @apiName v1/proxy/updateproxy
 * @apiDescription
 * @apiGroup activity
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  申请id 不可空
 * @apiParam {String} name  申请用户名称 可空
 * @apiParam {String} phone  申请用户电话 可空
 * @apiParam {String} email  申请用户email 可空
 * @apiParam {String} status  申请状态 后台用户使用 0申请 1成为代理 可空
 * @apiParam {String} level  代理等级 后台用户使用 可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":"1",
       "name":"adminhy11",
       "phone":"12345677",
       "email":"123",
       "status":1,
       "level":1
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
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
 */


