/**
 * @api {post} v1/resources/uploadfiles 上传文件
 * @apiName 上传文件
 * @apiGroup resources
 * @apiVersion 1.0.0
 *
 * @apiParam {String} file  文件
 * @apiParam {String} file  多个问题文件
 * @apiParam {String} type  文件类型 sys_img 系统支付地址图片 可空 系统用户上传该文件
 *
 * @apiSuccessExample 成功返回结果:
 *  HTTP/1.1 200 OK
 *
 * {
    "status": 0,
    "message": "successful",
    "data": {
        "path": [
            "/upload/0.37204773307559713.jpg",
            "/upload/0.30853986909127484.jpg"
        ],
        "message": "上传成功！"
    }
}
 *}
 */
