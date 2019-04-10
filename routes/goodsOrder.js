/**
 * @api {post} v1/goodsorder/addgoodsorder 换购商品
 * @apiName v1/goodsorder/addgoodsorder
 * @apiGroup goodsorder
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId  用户id 可空 管理员必填
 * @apiParam {String} goodId  商品id 不可空
 * @apiParam {String} phone  收件人电话 不可空
 * @apiParam {String} name  收件人姓名 不可空
 * @apiParam {String} address  收件地址 不可空
 * @apiParam {String} desc  描述 可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "userId":"001332",
       "goodId":"1",
      "phone":"123",
       "name":"name",
       "address":"123"
}
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
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
 * @api {post} v1/goodsorder/updategoodsorder 订单修改
 * @apiName v1/goodsorder/updategoodsorder
 * @apiGroup goodsorder
 * @apiVersion 1.0.0
 *
 * @apiParam {String} orderId  订单id 不可空
 * @apiParam {String} state  订单状态 可空 0已下单 1已发货 2已收货
 * @apiParam {String} waybillNo  运单号 可空
 * @apiParam {String} phone  收件人电话 可空
 * @apiParam {String} name  收件人姓名 可空
 * @apiParam {String} address  收件地址 可空
 * @apiParam {String} desc  描述 可空
 *
 * @apiParamExample {json} 请求参数:
 {
       "orderId":"1",
       "state":"1",
       "waybillNo":"12323"
}}
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *{
    "status": 0,
    "message": "successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 1,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
 */



/**
 * @api {get} v1/goodsorder/querygoodsorder 商品查询
 * @apiName v1/goodsorder/querygoodsorder
 * @apiGroup goodsorder
 * @apiVersion 1.0.0
 *
 * @apiParam {String} orderId  订单id 可空
 * @apiParam {String} orderNo  订单号 可空 模糊查询
 * @apiParam {String} name  收件人姓名 可空 模糊查询
 * @apiParam {String} phone  收件人电话 可空 模糊查询
 * @apiParam {String} state  订单状态 可空 0已下单 1已发货 2已收货
 * @apiParam {String} userId  用户编号 可空 后台查询某个用户时使用
 * @apiParam {String} waybillNo  运单号 可空
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
                "order_id": 1, 订单id
                "order_no": "39d1a260-5b69-11e9-96a6-00163e00a3ee", 订单编号
                "order_time": "2019-04-10T09:31:11.000Z",订单创建时间
                "good_id": 1,商品id
                "good_price": 111111,商品价格
                "pay_price": 111111,商品价格
                "desc": null,订单说明
                "address": "123",订单地址
                "user_id": "001332",用户
                "phone": "123",收件人手机
                "name": "name",收件人姓名
                "state": 1,订单状态 0已下单 1已发货 2已收货
                "waybill_no": "12323" 运单号
            }
        ],
        "count": 1
    }
}
 */