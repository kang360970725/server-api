const router = require('koa-router')();
    data = require('../utils/data');

let
    businessCtrl = require("../business/controller/business");

router.prefix('/users')

/**
 * @api {get} /users/getuser 获取会员信息
 * @apiName B端添加用户(get)
 * @apiGroup business
 *
 * @apiParam {String} uuId  用户UUid
 *
 * @apiSuccessExample 成功返回结果：
 *
 * {
  "status": 0,
  "message": "successful",
  "data": [
    {
      "id": 1332,
      "uuid": "001332",
      "account": "15828982828@139.com",
      "password": "",
      "nickname": "15828982828@139.com",
      "email": "15828982828@139.com",
      "Invitcode": "3qtGt2Cw",
      "Invitdcode": "12345",
      "phone": "",
      "wechat": null,
      "walletaddress": null,
      "type": 2,
      "createtime": "2018-11-15T16:26:22.000Z",
      "endtime": 21667314031,
      "starttime": "2018-11-14T16:42:30.000Z",
      "level": "-1",
      "disable": "",
      "principal": "0",
      "bot_update": "0",
      "bot_type": "1",
      "user_principal": "0.09921545",
      "popular_user": "0",
      "activation_state": "1",
      "bonus_base": "0.40000",
      "bot_lirun": "0.20000",
      "globalpartners": "0",
      "bonus_ratio": "0.04834725",
      "group": "a",
      "third_party": "0",
      "reset_api": "1",
      "token": "670fd140-a392-41a5-8ffe-095ab1283876"
    }
  ]
}
 *
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


/**
 * @api {post} /users/logonbusiness 短信(邮件)注册账户
 * @apiName c端注册用户(post)
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

/**
 * @api {post} /users/login 登录
 * @apiName B端登录(post)
 * @apiGroup business
 *
 * @apiParam {String} account  用户账号
 * @apiParam {String} pwd  密码
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "msg": "登录成功",
        "data": {
            "id": 5,
            "uuid": "0",
            "account": "admin",
            "password": "",
            "nickname": "超级管理员",
            "email": "超级管理员",
            "apikey": "123456",
            "secret": null,
            "Invitcode": "",
            "Invitdcode": "VTZVRZai",
            "phone": "18000000000",
            "wechat": null,
            "walletaddress": null,
            "type": 2,
            "createtime": null,
            "endtime": 333941973218,
            "starttime": "2018-10-12T11:55:06.000Z",
            "level": "5",
            "disable": null,
            "principal": "0",
            "bot_update": "0",
            "bot_type": "1",
            "user_principal": "0",
            "popular_user": "0",
            "activation_state": "0",
            "bonus_base": "9999",
            "bot_lirun": "0",
            "globalpartners": "0",
            "bonus_ratio": "9999",
            "group": "",
            "third_party": "0",
            "reset_api": "0",
            "token": ""
        },
        "sessionId": "29f78ba7-e629-4acf-a0ff-14be80f001d4"
    }
}
 *}
 */
router.post('/login', async (ctx, next) => {
    return await businessCtrl.login(ctx.request.body);
})


router.post('/register', async (ctx, next) => {
    return await businessCtrl.register(ctx.request.body);
})

router.post('/forgotPwd', async (ctx, next) => {
    return await businessCtrl.forgotPwd(ctx.request.body);
})


module.exports = router