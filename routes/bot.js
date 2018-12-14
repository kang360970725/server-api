const router = require('koa-router')();
    data = require('../utils/data');

let
    botCtrl = require("../business/controller/bot");

router.prefix('/bot')

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
 * @api {get} /users/getuser 获取会员机器人信息
 */
router.get('/state/:uuid', async (ctx, next) => {
    var params = ctx.query;
    params.uuId = ctx.params.uuid;
    return await botCtrl.getBots(params);
})
/**
 * @api {get} /users/getuser 获取会员机器人参数
 */
router.get('/get/parameters/:uuid', async (ctx, next) => {
    var params = ctx.query;
    params.uuId = ctx.params.uuid;
    params.token = ctx.header.Authorization;
    return await botCtrl.getParameters(params);

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
router.post('/set/parameters/:uuid', async (ctx, next) => {
    var params = ctx.request.body;
    // params.sessionId = ctx.header.sessionid;
    return await botCtrl.addUsers(params);
})


module.exports = router