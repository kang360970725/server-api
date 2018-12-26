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
 * @api {get} /bot/state 获取会员机器人信息
 */
router.get('/state/:uuid', async (ctx, next) => {
    var params = ctx.query;
    params.uuId = ctx.params.uuid;
    return await botCtrl.getBots(params);
})
/**
 * @api {get} /bot/parameters 获取会员机器人参数
 */
router.get('/parameters/:uuid', async (ctx, next) => {
    var params = ctx.query;
    params.uuId = ctx.params.uuid;
    params.token = ctx.header.authorization;
    return await botCtrl.getParameters(params);

})

/**
 * @api {post} /bot/set/parameters 修改会员机器人参数
 */
router.post('/set/parameters/:uuid', async (ctx, next) => {
    var params = ctx.request.body;
    params.uuId = ctx.params.uuid;
    params.token = ctx.header.authorization;
    return await botCtrl.exitBotParm(params);
})

/**
 * @api {get} /bot/parameters 获取官方推荐参数
 */
router.get('/rec/parameters', async (ctx, next) => {
    var params = ctx.query;
    return await botCtrl.getParametersRec(params);

})


module.exports = router