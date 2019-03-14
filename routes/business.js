const router = require('koa-router')();
    data = require('../utils/data');

let
    businessCtrl = require("../business/controller/business");

router.prefix('/users')

/**
 * @api {get} /users/getuser 获取
 *
 * 会员信息
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


module.exports = router