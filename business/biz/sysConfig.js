'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    exception = require('../../utils/exception.js'),
    sysDao = require('../../business/dao/sysConfig');
const fs = require('fs');
const path = require('path');

class biz {

    static async add(params) {
        return await dao.manageConnection(async (connection) => {
            return await sysDao.add(connection, params);
        })
    }
    static async uploadfiles(params) {
        try {
            const files = params.files; // 获取上传文件
            let path = [];
            if (files && files.length && files.length > 1) {
                for (let file of files) {
                    let url = await biz.dopipe(file)
                    path.push(config.host + url);
                }
            } else if (files.length = 1) {
              let url = await biz.dopipe(files)
                path.push(config.host + url);
            } else {
                throw  exception.BusinessException("上传错误", 201);
            }
            if(params.type == "sys_img"){
                dao.manageConnection(async (connection) => {
                    for (let item of path) {
                        await sysDao.add(connection, {type:params.type,value:item});
                    }
                })
            }
            return {
                path: path,
                message: "上传成功！"
            }
        }catch (err) {
            throw  exception.BusinessException("上传错误", 201);
        }
    }
    static async dopipe(file) {
        let date = await biz.getNowFormatDate();
        let __dirname = config.url.upload + date;
        biz.mkdirsSync(__dirname);
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        const ext = file.name.split('.').pop();        // 获取上传文件扩展名
        let file_name = `${Math.random().toString()}.${ext}`;
        let file_path = path.join(__dirname, file_name)
        const upStream = fs.createWriteStream(file_path); // 创建可写流
        reader.pipe(upStream);
        return date+"/"+file_name;
    }

    static async getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate.toString();
    }

    static async mkdirsSync(dirname) {
        if (fs.existsSync(dirname)) {
            return;
        } else {
            if (biz.mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return;
            }
        }
    }
}


module.exports = biz;