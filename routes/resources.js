const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
exception = require('../utils/exception.js'),
    data = require('../utils/data');


router.prefix('/resources')


/**
 * @api {post} /resources/uploadfiles 上传文件
 * @apiName B端注册
 * @apiGroup resources
 * @apiVersion 1.0.0
 *
 * @apiParam {String} file  文件
 * @apiParam {String} file  多个问题文件
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
router.post('/uploadfiles', async (ctx, next) => {
    // 上传多个文件
    const files = ctx.request.files.file; // 获取上传文件
    let path=[];
    if(files && files.length && files.length > 1){
        for (let file of files) {
            path.push(dopipe(file));
        }
    }else if(files.length = 1){
        path.push(dopipe(files));
    }else{
        exception.BusinessException("上传错误",201);
    }
    var reslut ={
        path:path,
        message:"上传成功！"
    }
    ctx.status = 200;
    return reslut
})

function dopipe(file){
    let __dirname = "D:/blue/";
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    const ext = file.name.split('.').pop();        // 获取上传文件扩展名
    let file_name =`/upload/${Math.random().toString()}.${ext}`;
    let file_path = path.join(__dirname,file_name)
    const upStream = fs.createWriteStream(file_path); // 创建可写流
    reader.pipe(upStream);
    return file_name;
}

module.exports = router