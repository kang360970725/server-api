/**
 * @api {post} v1/sendCode/sendCode 发送(短信、邮件)验证码
 * @apiName C端发送短信或者邮件验证码(post)
 * @apiGroup send
 * @apiVersion 1.0.0
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