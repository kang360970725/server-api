const router = require('koa-router')();
    data = require('../utils/data');

let
    bonusCtrl = require("../business/controller/sendCode");

router.prefix('/send')

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
 * @api {post} send/send 发送(短信、邮件)验证码
 * @apiName C端发送短信或者邮件验证码(post)
 * @apiGroup send
 *
 * @apiParam {String} account  终端账号
 * @apiParam {String} terminal  0 短信 1 邮件
 * @apiParam {String} busType  终端业务 0 注册  3 找回密码  4 绑定终端  ....
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 {
    "status": 0,
    "message": " Interface response successful ",
    "data": {
        "status": 0,
        "msg": "发送邮件(短信)成功"
    }
}
 */
router.post('/send', async (ctx, next) => {
    var params = ctx.request.body;
    return await bonusCtrl.sendCode(params);

})

module.exports = router