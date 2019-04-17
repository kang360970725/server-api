
/**
 * @api {get} v1/users/getuser 获取会员信息
 * @apiName v1/users/getuser
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
      "uuid": "001332",用户编号
      "account": "15828982828@139.com", 账号
      "password": "",
      "nickname": "15828982828@139.com",昵称
      "email": "15828982828@139.com",
      "Invitcode": "3qtGt2Cw",邀请码
      "Invitdcode": "12345",被邀请码
      "phone": "",
      "wechat": null,
      "walletaddress": null,
      "type": 2,
      "createtime": "2018-11-15T16:26:22.000Z",
      "endtime": 21667314031,
      "starttime": "2018-11-14T16:42:30.000Z",
      "level": "-1",
      "disable": "",是否禁用用户
      "principal": "0",用户本金
      "bot_update": "0",是否是更新账户  0为否    1为更新账户(更新账户需重置密码)
      "bot_type": "1",会员使用机器人的版本 1：蓝猫量化标准版  2：蓝猫量化专业版   3:蓝猫量化精英版
      "user_principal": "0.09921545", 会员本金
      "popular_user": "0",热门用户 0 普通 1热门用户
      "activation_state": "1",0 需要激活   1 已激活
      "bonus_base": "0.40000",用户分红记录基数
      "bot_lirun": "0.20000",用户账户盈利统计
      "globalpartners": "0",全球合伙人  0 否  1是
      "bonus_ratio": "0.04834725",用户分红比例
      "group": "a",会员分组
      "third_party": "0",0 蓝石  1 许总
      "reset_api": "1",修改了API需要重置盈利算法
      "head_portrait": "1",头像
      "token": "670fd140-a392-41a5-8ffe-095ab1283876"
    }
  ]
}
 *
 */


/**
 * @api {post} v1/users/login 登录
 * @apiName v1/users/login
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
            "head_portrait": "1",头像
            "token": ""
        },
        "sessionId": "29f78ba7-e629-4acf-a0ff-14be80f001d4"
    }
}
 *}
 */

/**
 * @api {post} v1/users/register 注册
 * @apiName v1/users/register
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
 * @apiParam {String} type  验证码类型 不可空 注册传0 终端业务 0 注册  3 找回密码  4 绑定终端
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
 */

/**
 * @api {post} v1/users/forgotPwd 找回密码
 * @apiName v1/users/forgotPwd
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
 */

/**
 * @api {post} v1/users/headportrait 上传头像
 * @apiName v1/users/headportrait
 * @apiGroup users
 * @apiVersion 1.0.0
 *
 * @apiParam {String} uuid  用户id 可空 后台用户使用
 * @apiParam {String} headPortrait  头像地址 不可空
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": "http://192.168.0.33/source/2019-04-11/0.22082375855971814.jpg"
    }
 */


/**
 * @api {get} v1/users/myfriend 我的好友
 * @apiName v1/users/myfriend
 * @apiGroup users
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": "http://192.168.0.33/source/2019-04-11/0.22082375855971814.jpg"
    }
 */


/**
 * @api {get} v1/users/logout 登出
 * @apiName v1/users/logout
 * @apiGroup users
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    }
 */

