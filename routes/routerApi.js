
const path = require('path');
const fs = require('fs-extra');

const Route = require('koa-router');

const router = new Route({ prefix: '/api' })
const ctrlRoot = __dirname+`/../business/controller`;

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

    router.all('/:controller/:action', async function filter(ctx, next) {
        let { controller, action } = ctx.params;
        let params ;
        if(ctx.method == 'GET'){
            params = ctx.query;
        }else{
            params = ctx.request.body;
        }
        if (!controller) {
            ctx.throw(404,'Not Found', {code: 404 });
        }
        let Controller = ControllerPool[`${controller}`]; // require(`${process.cwd()}/controllers/${controller}Controller`)
        if (!Controller) {
            ctx.throw(404,'Not Found', {code: 404 });
        }
        let instance = Controller;
        let asyncAction = instance[action || 'index'];
        if (!asyncAction) {
            ctx.throw(404,'Not Found', {code: 404 });
        }
        ctx.status = 200;
        return await asyncAction.call(instance, params);
    })
}

module.exports = router;