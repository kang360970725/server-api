/**
 * @api {post} v1/goods/addgoods 添加商品
 * @apiName v1/goods/addgoods
 * @apiGroup goods
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name  商品名称 不可空
 * @apiParam {String} desc  商品描述 不可空
 * @apiParam {String} imgCover  商品封面 不可空
 * @apiParam {String} imgInfo  商品详情图片 不可空
 * @apiParam {String} header  商品简述 可空
 * @apiParam {String} unit  商品单位 可空
 * @apiParam {String} price  商品价格 不可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "name":"adminhy",
       "desc":"12345677",
       "imgCover":"123123",
       "imgInfo":"123",
       "price":"111111"
}
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 1,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
 *}
 */


/**
 * @api {post} v1/goods/updategoods 添加商品
 * @apiName v1/goods/updategoods
 * @apiGroup goods
 * @apiVersion 1.0.0
 *
 * @apiParam {String} goodId  商品id 不可空
 * @apiParam {String} name  商品名称 可空
 * @apiParam {String} desc  商品描述 可空
 * @apiParam {String} imgCover  商品封面 可空
 * @apiParam {String} imgInfo  商品详情图片 可空
 * @apiParam {String} header  商品简述 可空
 * @apiParam {String} unit  商品单位 可空
 * @apiParam {String} price  商品价格 可空
 * @apiParam {String} state  商品状态 0上架 1下架 可空
 * @apiParam {String} delFlag  商品删除状态 0未删除 1已删除 可空
 * @apiParamExample {json} 请求参数:
 {
       "name":"adminhy1",
       "desc":"12345677",
       "imgCover":"123123",
       "imgInfo":"123",
       "price":"111111",
       "goodId":1,
       "state":1,
       "delFlag":1
}
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 1,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
 *}
 */



/**
 * @api {get} v1/goods/querygoods 商品查询
 * @apiName v1/goods/querygoods
 * @apiGroup goods
 * @apiVersion 1.0.0
 *
 * @apiParam {String} goodId  商品id 可空
 * @apiParam {String} name  商品名称 可空 模糊查询
 * @apiParam {String} desc  是否查询商品详情 空不查询 1查询
 * @apiParam {String} imgInfo  是否查询商品详情图片 空不查询 1查询
 * @apiParam {String} header  是否查询商品简述 空不查询 1查询
 * @apiParam {String} delFlag  是否已删除 0未删除 1已删除 管理员可用 可空
 * @apiParam {String} state  商品状态 0上架 1下架 管理员可用 可空
 * @apiParam {String} orderRule 排序方式 asc升序 desc降序
 * @apiParam {String} orderBy 排序字段 默认创建时间  price 为价格排序
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
                "good_id": 1, 商品id
                "good_name": "adminhy1", 商品名称
                "img_cover": "123123", 商品封面
                "create_time": "2019-04-10T06:11:05.000Z", 创建时间
                "price": 111111 价格
                "desc": "12345677" 详情
                "header": "" 简述
                "img_info": "123" 详情图片
            }
        ],
        "count": 1
    }
}
 */

/**
 * @api {POST} v1/goods/delete 删除商品
 * @apiName v1/goods/delete
 * @apiGroup goods
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