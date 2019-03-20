'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    config = require('../../db_config/config'),
    bonusDao = require('../../business/dao/sendCode');

//邮件相关配置
let nodemailer = require('nodemailer');
let mailTransport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    // service: 'smtp.exmail.qq.com',
    port: '465',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: 'kang360970725@qq.com',
        pass: 'unyfaqcwfhoscabc'
    },
});

//短信配置相关
const SMSClient = require('@alicloud/sms-sdk');
const accessKeyId = 'LTAIpu10iPJzJ6uw';
const secretAccessKey = 'oTIBvri8AW8OICLYUm1LQTHju9pi28';



class biz {

    //发送验证码
    static async sendCode(params) {
        return await dao.manageConnection(async (connection) => {
            var result = {}
            //发送短信
            if (params.terminal == 0) {
                result = await biz.senSmsFn(params);
                params.code = result.code;
                console.log(result);
                if (result.status == 0) {
                    var newSql = await bonusDao.sendCode(connection, params);
                }
                delete result.code;
                return result
            }
            //发送邮件
            if (params.terminal == 1) {
                result = await biz.senEmailFn(params);
                params.code = result.code;
                console.log(result);
                if (result.status == 0) {
                    var newSql = await bonusDao.sendCode(connection, params);
                }
                delete result.code;
                return result
            }
        })
    }


    //Email模板
    static async htmlTemp_Email(obj) {
        let html = '';
        let selectChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let code = '';
        for (let i = 0; i < 6; i++) {
            let charIndex = Math.floor(Math.random() * 26);
            code += selectChar[charIndex];
        }
        switch (obj.busType) {
            case '0':
                html = '<div class="email">' +
                    '<div class="email_box">' +
                    '<h4 class="title_1">欢迎加入蓝猫量化俱乐部</h4>' +
                    '<p>您的注册验证码是: <span class="code">' + code + '</span></p>' +
                    '<p>该验证码5分钟内有效，请尽快完成注册。</p>' +
                    '</div>' +
                    '<style>' +
                    '.email{width: 100%;background-color: rgb(240, 240, 240);}' +
                    '.email_box{box-shadow: 0 0 3px #ddd;border-bottom: 1px solid #e0e0e0;font-family: Helvetica, Verdana, sans-serif;color: #434343;max-width: 600px;overflow: hidden;padding: 40px;margin: 20px;}' +
                    '.title_1{text-align: center;}' +
                    '.code{font-weight: 600;}</style>' +
                    '</div>';
                break;
            case '3':
                html = '<div class="email">' +
                    '<div class="email_box">' +
                    '<h4 class="title_1">蓝猫量化</h4>' +
                    '<h6 class="title_2">你正在进行密码找回操作,你的操作验证码是:' + code + '</h6>' +
                    '<p>若非本人操作，请尽快联系管理员或你的专属代理!</p>' +
                    '</div>' +
                    '<style>' +
                    '.email{width: 100%;background-color: rgb(240, 240, 240);}' +
                    '.email_box{box-shadow: 0 0 3px #ddd;border-bottom: 1px solid #e0e0e0;font-family: Helvetica, Verdana, sans-serif;color: #434343;max-width: 600px;overflow: hidden;padding: 40px;margin: 20px;}' +
                    '.title_1{text-align: center;}' +
                    '.code{font-weight: 600;color: #ff8227;}</style>' +
                    '</div>';
                break;
        }
        return {html: html, code: code};
    };
    //发送邮件方法
    static async senEmailFn(param) {
        var options = {
            from: '"蓝猫量化俱乐部" <kang360970725@qq.com>',
            to: '<' + param.account + '>',
            subject: '蓝猫量化俱乐部',
            html: '<h5>你好，这是一封来自蓝猫量化俱乐部的邮件！</h5><p>......</p>'
        };

        let result = await biz.htmlTemp_Email(param);
        if (!!result) {
            options.html = result.html;
            const sendSucess = await mailTransport.sendMail(options);
            if (!sendSucess) {
                return {
                    status: -200,
                    msg: "发送邮件失败"
                };
            }
            else {
                return {
                    status: 0,
                    msg: "发送邮件成功",
                    code: result.code
                };
            }
        } else {
            return {
                status: -200,
                msg: '未处理异常!'
            };
        }
    }


    //短信模板
    static async htmlTemp_Sms(obj) {
        let html = '';
        let code = '';
        for(var i=0;i<6;i++){
            code+=Math.floor(Math.random()*10)
        }
        let objs = {
            code: code,
            templateCode: ''
        }
        switch (obj.busType) {
            case '0':
                objs.templateCode = 'SMS_150737405';
                break;
            case '3':
                objs.templateCode = 'SMS_152110354';
                break;
        }
        return objs;
    };
    //发送短信件方法
    static async senSmsFn(param) {
        //初始化sms_client
        let smsClient = new SMSClient({accessKeyId, secretAccessKey})
        //发送短信

        let result = await biz.htmlTemp_Sms(param);
        if (!!result) {
            var options = {
                PhoneNumbers: param.account,
                SignName: "蓝猫量化",//认证签名
                TemplateCode: result.templateCode,//模板id
                TemplateParam: "{\"code\": "+ result.code +"}"
            };
            var Sms = await smsClient.sendSMS(options)
            if (Sms.Code != "OK") {
                return {
                    status: -200,
                    msg: "发送短信失败"
                };
            }
            else {
                return {
                    status: 0,
                    msg: "发送短信成功",
                    code: result.code
                };
            }
        } else {
            return {
                status: -200,
                msg: '未处理异常!'
            };
        }
    }
}


module.exports = biz;