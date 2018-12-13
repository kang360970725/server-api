const router = require('koa-router')();
    data = require('../utils/data');

let
    businessCtrl = require("../business/controller/business");

router.prefix('/users')

router.all('*', async (ctx, next) => {
    try {
        var result = await next();
        ctx.body = data.success(result, "");
    } catch (err) {
        ctx.body = data.error(err);
        ctx.body = err;
        // ctx.body = { errorCode: 500, stack: err.stack }
    }
})

/**
 * @api {get} /users/getuser 获取会员信息
 */
router.get('/getuser', async (ctx, next) => {
    var params = ctx.query;
    params.sessionId = ctx.header.sessionid;
    return await businessCtrl.getUsers(params);

})

/**
 * @api {post} /users/logonbusiness 添加用户
 * @apiName B端添加用户(post)
 * @apiGroup business
 *
 * @apiParam {String} user_account  用户账号
 * @apiParam {String} user_password  密码
 *
 */
router.post('/addusers', async (ctx, next) => {
    var params = ctx.request.body;
    params.sessionId = ctx.header.sessionid;
    return await businessCtrl.addUsers(params);
})


/**
 * @api {post} /business/savebusiness 新增/修改商家/设计师信息
 * @apiName 新增/修改商家/设计师信息(post)
 * @apiGroup business
 *
 * @apiParam [String] businessId  商家/设计师ID 空新增 
 * @apiParam {String} businessName  商家/设计师名称
 * @apiParam {String} businessPhone  商家/设计师账号/手机号
 * @apiParam {String} voucher  商家/设计师密码
 * @apiParam {Number} businessType  类型 1商家/2设计师
 * @apiParam {Number} staffCount 员工数量
 * @apiParam {Number} smsCount 短信数量
 * @apiParam [Array] items 分发方案 例："items":["123","21312","12312311","123","123123111"]
 * 
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": 0,
 *      "message": " Interface response successful ",
 *      "data": {
 *       OK
 *       }
 *   ]
 *  }
 */
router.post('/savebusiness', async (ctx, next) => {
    var params = ctx.request.body;
    params.sessionId = ctx.header.sessionid;
    await businessCtrl.saveBusiness(params);
    return "OK"
})

/**
 * @api {get} /business/searchbusiness 查询商家OR设计师
 * @apiName 查询商家/设计师(get)111
 * @apiGroup business
 *
 * @apiParam {String} businessType  商家/设计师 类型 1商家 2设计师  空 全部
 * @apiParam {String} businessPhone  商家/设计师账号手机号
 * @apiParam {String} businessName  商家/设计师名称
 * @apiParam {String} businesskeyword  商家/设计师查询关键词
 * @apiParam {Number} pageIndex  页码
 * @apiParam {Number} pageSize  页面大小
 * 
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 * {
 *   "status": 0,
 *   "message": " Interface response successful ",
 *   "data": {
 *       "total": 2,
 *       "data": [
 *           {
 *               "businessId": "057e84e0-79d6-11e8-85e7-ddeebd88932d",
 *               "businessName": "ccccc",
 *               "businessPhone": "13200002652",
 *               "createtime": "2018-06-27T06:47:55.000Z",
 *               "state": 0,
 *               "businessType": 2
 *           },
 *           {
 *               "businessId": "195d73f0-79d5-11e8-869a-71dc97d5b603",
 *               "businessName": "sdffff",
 *               "businessPhone": "13200000587",
 *               "createtime": "2018-06-27T06:41:19.000Z",
 *               "state": 1,
 *               "businessType": 2
 *           }
 *       ]
 *   }
 *}
 */
router.get('/searchbusiness', async (ctx, next) => {
    var params = ctx.query;
    params.sessionId = ctx.header.sessionid;
    return await businessCtrl.searchBusiness(params);
})

/**
 * @api {post} /business/openbusiness 解禁商家/设计师信息
 * @apiName  解禁商家/设计师信息(post)
 * @apiGroup business
 *
 * @apiParam [String] businessId  商家/设计师ID
 * 
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": 0,
 *      "message": " Interface response successful ",
 *      "data": {
 *       OK
 *       }
 *  }
 */
router.post('/openbusiness', async (ctx, next) => {
    var params = ctx.request.body;
    params.sessionId = ctx.header.sessionid;
    await businessCtrl.openBusiness(params);
    return "OK"
})

/**
 * @api {post} /business/disablebusiness 禁用商家OR设计师信息
 * @apiName  禁用商家/设计师信息(post)111
 * @apiGroup business
 *
 * @apiParam [String] businessId  商家/设计师ID
 * 
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": 0,
 *      "message": " Interface response successful ",
 *      "data": {
 *       OK
 *       }
 *  }
 */
router.post('/disablebusiness', async (ctx, next) => {
    var params = ctx.request.body;
    params.sessionId = ctx.header.sessionid;
    await businessCtrl.disableBusiness(params);
    return "OK"
})

/**
 * @api {post} /business/saveunion 分发案例
 * @apiName 分发案例(post)
 * @apiGroup business
 *
 * @apiParam [String] businessId  商家/设计师ID
 * @apiParam [Array] items 分发方案 例："items":["123","21312","12312311","123","123123111"]
 * 
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *  {
 *      "status": 0,
 *      "message": " Interface response successful ",
 *      "data": {
 *       OK
 *       }
 *  }
 */
router.post('/saveunion', async (ctx, next) => {
    var params = ctx.request.body;
    params.sessionId = ctx.header.sessionid;
    await businessCtrl.saveUnion(params);
    return "OK"
})

module.exports = router