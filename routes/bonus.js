const router = require('koa-router')();
    data = require('../utils/data');

let
    bonusCtrl = require("../business/controller/bonus");

router.prefix('/bonus')

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
 * @api {get} /bonus/payment 支付会员分红
 */
router.post('/payment', async (ctx, next) => {
    var params = ctx.request.body;
    return await bonusCtrl.payments(params);

})

module.exports = router