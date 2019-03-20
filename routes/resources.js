const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
exception = require('../utils/exception.js'),
    data = require('../utils/data');

let
    businessCtrl = require("../business/controller/business");

router.prefix('/resources')

/**
 * @api {post} /resources/uploadfiles 上传文件
 *
 * 上传文件
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