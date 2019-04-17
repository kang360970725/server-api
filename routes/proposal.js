

/**
 * @api {get} v1/proposal/proposals 投诉建议查询
 * @apiName v1/proposal/proposals
 * @apiGroup proposal
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  申请id 可空
 * @apiParam {String} uuid  用户编号 后台用户使用 可空
 * @apiParam {String} name 用户申请姓名 模糊查询 可空
 * @apiParam {String} phone  用户申请电话 模糊查询 可空
 * @apiParam {String} email  用户申请email 模糊查询 可空
 * @apiParam {String} type  类型 0建议 1投诉 可空
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
                "type": 1,
                "content": "1",内容
                "reply": "1111"  回复
            }
        ],
        "count": 1
    }
}
 */

/**
 * @api {POST} v1/proposal/addproposal 添加投诉建议
 * @apiName v1/proposal/addproposal
 * @apiDescription
 * @apiGroup proposal
 * @apiVersion 1.0.0
 *
 * @apiParam {String} uuid  用户id 后台用户使用 可空
 * @apiParam {String} name  用户名称 不可空
 * @apiParam {String} phone  用户电话 可空
 * @apiParam {String} email  用户email 可空
 * @apiParam {String} content  投诉建议内容 不可空
 * @apiParam {String} type  类型 0建议 1投诉 不可空
 *
 * @apiParamExample {json} 请求参数:
      {
       "uuid":"6",
       "name":"adminhy",
       "phone":"12345677",
       "email":"123",
       "content:"123",
       "type":1
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
 * @api {POST} v1/proposal/updateproposal 修改建议投诉或回复
 * @apiName v1/proposal/updateproposal
 * @apiDescription
 * @apiGroup proposal
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  申请id 不可空
 * @apiParam {String} name  用户名称 可空
 * @apiParam {String} phone  用户电话 可空
 * @apiParam {String} email  用户email 可空
 * @apiParam {String} content  投诉建议内容 可空
 * @apiParam {String} type  类型 0建议 1投诉 可空
 * @apiParam {String} reply  回复 后台用户不可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "id":"1",
       "name":"adminhy",
       "phone":"12345677",
       "email":"123",
       "content:"123",
       "type":1,
       "reply":"123"
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
 * @api {POST} v1/proposal/delete 删除投诉建议
 * @apiName v1/proposal/delete
 * @apiDescription
 * @apiGroup proposal
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id  申请id 不可空
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


