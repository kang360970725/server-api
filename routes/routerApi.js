const path = require('path');
const fs = require('fs-extra');
const exception = require('../utils/exception.js');
const Route = require('koa-router');

const router = new Route({prefix: '/v1'})

const ctrlRoot = __dirname + `/../business/controller`;

// 如果存在 controllers 目录自动处理api请求路由
if (fs.existsSync(ctrlRoot)) {
    const files = fs.readdirSync(ctrlRoot);
    const ControllerPool = {};
    files.forEach(f => {
        let file = path.join(ctrlRoot, f);
        let stat = fs.statSync(file);
        if (stat.isFile()) {
            let ctrl = path.parse(file);
            ControllerPool[ctrl.name] = require(file);
        }
    })

    //不用登录访问的接口
    let whiteApiList =
        [
            "users/login",
            "users/register",
            "users/forgotPwd",
            "sendCode/sendCode"
        ];
    router.all('/:controller/:action', async function filter(ctx, next) {
        let {controller, action} = ctx.params;
        let params;
        if (ctx.method == 'GET') {
            params = ctx.query;
        } else {
            params = ctx.request.body;
        }

        // 获取上传文件
        if(ctx.request.files && ctx.request.files.file){
            params.files = ctx.request.files.file;
        }

        if (!controller) {
            ctx.throw(404, 'Not Found', {code: 404});
        }
        let Controller = ControllerPool[`${controller}`]; // require(`${process.cwd()}/controllers/${controller}Controller`)
        if (!Controller) {
            ctx.throw(404, 'Not Found', {code: 404});
        }
        let instance = Controller;
        let asyncAction = instance[action || 'index'];
        if (!asyncAction) {
            ctx.throw(404, 'Not Found', {code: 404});
        }

        if (whiteApiList.includes(controller+"/"+action)){
            console.log("白名单接口访问");
        } else {
            let currentUser = ctx.session.user;
            if (currentUser && currentUser.level && currentUser.level >= 5) {
                //管理员登录
                params.adminUser = currentUser;
            } else if (currentUser && currentUser.level < 5) {
                //用户登录
                params.currentUser = currentUser;
            } else {
                throw exception.BusinessException("未登录", -2);
            }
        }

        let result = await asyncAction.call(instance, params);
        if (controller === 'users' && action === 'login') {
            ctx.session.user = result.data;
        }
        ctx.status = 200;
        return result;
    })
}

module.exports = router;