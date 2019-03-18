const router = require('koa-router')();
    data = require('../utils/data');

let
    bonusCtrl = require("../business/controller/send-code");

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
 * @api {post} /send 发送(短信、邮件)验证码
 * @apiName C端发送短信或者邮件验证码(post)
 * @apiGroup business
 *
 * @apiParam {String} account  终端账号
 * @apiParam {String} terminal  email 邮件 sms短信
 * @apiParam {String} busType  终端业务 1 注册  2 找回密码  3 绑定终端  ....
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 {
    "status": 0,
    "message": " Interface response successful ",
    "data": {
        "desc": "发送成功！"
    }
}
 */
router.post('/send', async (ctx, next) => {
    var params = ctx.request.body;
    return await bonusCtrl.sendCode(params);

})

module.exports = router