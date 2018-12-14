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
    // params.sessionId = ctx.header.sessionid;
    return await businessCtrl.addUsers(params);
})

module.exports = router