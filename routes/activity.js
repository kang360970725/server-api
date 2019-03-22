const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
exception = require('../utils/exception.js'),
    data = require('../utils/data');

let
    activityCtrl = require("../business/controller/activity");

router.prefix('/activity')

/**
 * @api {get} /activity/activitys 活动查询
 * @apiName 活动查询
 * @apiGroup activity
 *
 * @apiParam {String} id  活动id 可空
 * @apiParam {String} info  是否查询活动info信息 非空查询 空不查询
 * @apiParam {String} types 查询info类型  1返现 2免费 3打折 4积分奖励  200 轮播图片 201封面 如需多类型逗号隔开 如 1,2,3,4 空为全部类型
 * @apiParam {String} forbidden  活动是否有效 0有效 1无效 app传0 空为全部
 * @apiParam {String} name  活动名称 模糊查询 可空
 * @apiParam {String} title  活动title 模糊查询 可空
 * @apiParam {String} code  活动code 精准查询 可空
 * @apiParam {String} startTime  活动开始时间 可空
 * @apiParam {String} endTime  活动结束时间 可空
 * @apiParam {String} content 是否查询活动内容信息 非空查询 空不查询
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
router.get('/activitys', async (ctx, next) => {
    var params = ctx.query;
    return await activityCtrl.activitys(params);
})


/**
 * @api {POST} /activity/addorupdate 活动添加和修改
 * @apiName 活动添加和修改
 * @apiDescription 使用该接口进行修改会进行全修改
 * @apiGroup activity
 *
 * @apiParam {String} id  活动id 空新增 不为空修改
 * @apiParam {String} name  活动名称 不可空
 * @apiParam {String} title  活动title 不可空
 * @apiParam {String} startTime  活动开始时间 可空
 * @apiParam {String} endTime  活动结束时间 可空
 * @apiParam {String} content 询活动内容信息 不可空
 * @apiParam {String} forbidden 活动是否有效 0有效 1无效 默认0 可空
 * @apiParam {Array} infos  活动info信息
 * @apiParam {String} infos.type info类型  1返现 2免费 3打折 4积分奖励  200 轮播图片 201封面
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
router.post('/addorupdate', async (ctx, next) => {
    var params = ctx.request.body;
    return await activityCtrl.addOrUpdateActivitys(params);
})


/**
 * @api {POST} /activity/updateinfo 活动info修改
 * @apiName 活动info修改 部分修改info信息可以使用
 * @apiDescription 部分修改info信息可以使用
 * @apiGroup activity
 *
 * @apiParam {String} id  活动id 不可空
 * @apiParam {Array} infos  活动info信息
 * @apiParam {String} infos.id  info id 不可空
 * @apiParam {String} infos.type info类型  1返现 2免费 3打折 4积分奖励  200 轮播图片 201封面
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
router.post('/updateinfo', async (ctx, next) => {
    var params = ctx.request.body;
    return await activityCtrl.updateinfo(params);
})

module.exports = router