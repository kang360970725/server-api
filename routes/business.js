
/**
 * @api {get} v1/users/getuser 获取会员信息
 * @apiName B端添加用户(get)
 * @apiGroup users
 * @apiVersion 1.0.0
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


/**
 * @api {post} v1/users/login 登录
 * @apiName B端登录(post)
 * @apiGroup users
 * @apiVersion 1.0.0
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

/**
 * @api {post} v1/users/register 注册1
 * @apiName B端注册
 * @apiGroup users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} account  用户账号 不可空
 * @apiParam {String} pwd  密码 不可空
 * @apiParam {String} email  用户email 可空
 * @apiParam {String} phone  用户phone 可空
 * @apiParam {String} nickname  用户昵称 可空
 * @apiParam {String} Invitcode  邀请码 可空
 * @apiParam {String} version  用户等级 可空
 * @apiParam {String} code  验证码 不可空
 * @apiParam {String} type  验证码类型 不可空 注册传0 终端业务 0 注册  3 找回密码  4 绑定终端  ....
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "uuid": "0001469",
        "token": "322e78c0-d030-4678-bd05-f82e572f1b68",
        "account": "adminhy"
    }
   }
 *}
 */

/**
 * @api {post} v1/users/forgotPwd 找回密码
 * @apiName B端注册
 * @apiGroup users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} account  用户账号
 * @apiParam {String} pwd  密码
 * @apiParam {String} code  验证码
 * @apiParam {String} type  验证码类型 终端业务 0 注册  3 找回密码  4 绑定终端  ....
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "account": "adminhy"
    }
}
 *}
 */