/**
 * @api {get} v1/err/errs 错误信息
 * @apiName v1/err/errs
 * @apiGroup err
 * @apiVersion 1.0.0
 *
 * @apiParam {String} key  错误key  boterr 机器人参数接口错误 poolerr 机器人矿池接口错误 BTCerr BTC接口错误
 * @apiParam {String} pageSize 数据量 可空
 * @apiParam {String} pageIndex 0开始 页数 可空
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 {
    "status": 0,
    "message": "successful",
    "data": {
        "boterr": [
            {
                "param": {
                    "url": "https://www.bluecatbot.com/api/params/Shulamith",
                    "method": "GET",
                    "json": true,
                    "headers": {
                        "Authorization": "Token eacf3b56a09148ef231c6cb8456794c665e221e2",
                        "content-type": "application/json"
                    },
                    "body": "\"\""
                },请求参数
                "error": { 错误返回
                    "errno": "ECONNRESET",
                    "code": "ECONNRESET",
                    "syscall": "read"
                }
            },
            {
                "param": {
                    "url": "https://www.bluecatbot.com/api/assets/flyboy1113",
                    "method": "GET",
                    "json": true,
                    "headers": {
                        "Authorization": "Token eacf3b56a09148ef231c6cb8456794c665e221e2",
                        "content-type": "application/json"
                    },
                    "body": "\"\""
                }, 请求参数
                "error": { 错误返回
                    "statusCode": 404,
                    "body": {
                        "detail": "未找到。"
                    },
                    "headers": {
                        "server": "nginx/1.12.1",
                        "date": "Tue, 23 Apr 2019 08:08:17 GMT",
                        "content-type": "application/json",
                        "content-length": "25",
                        "connection": "close",
                        "vary": "Accept, Cookie",
                        "allow": "GET, HEAD, OPTIONS",
                        "x-frame-options": "SAMEORIGIN"
                    },
                    "request": {
                        "uri": {
                            "protocol": "https:",
                            "slashes": true,
                            "auth": null,
                            "host": "www.bluecatbot.com",
                            "port": 443,
                            "hostname": "www.bluecatbot.com",
                            "hash": null,
                            "search": null,
                            "query": null,
                            "pathname": "/api/assets/flyboy1113/",
                            "path": "/api/assets/flyboy1113/",
                            "href": "https://www.bluecatbot.com/api/assets/flyboy1113/"
                        },
                        "method": "GET",
                        "headers": {
                            "Authorization": "Token eacf3b56a09148ef231c6cb8456794c665e221e2",
                            "accept": "application/json",
                            "referer": "https://www.bluecatbot.com/api/assets/flyboy1113"
                        }
                    }
                }
            }
        ],
        "count": 7 总数
    }
}
 *}
 */