const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const createError = require('http-errors');
const index = require('./routes/index')
const send = require('./routes/sendCode')
const hotUsers = require('./routes/hotUsers')
const business = require('./routes/business')
const bot = require('./routes/bot')
const bonus = require('./routes/bonus')
const responsed = require('./utils/data')
let cors = require('@koa/cors');


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    try {
        ctx.set('X-Powered-By', 'koa@2');
        let result = await next();
        if (!ctx.body) {
            ctx.body = responsed.success(result, 'successful')
        }
    } catch (err) {
        // 不抛出sql错误
        if(!!err.sqlState || !!err.sqlMessage){
            console.log(err);
            err=createError.InternalServerError(defaultMessage);
        }else{
            err = createError(err);
        }
        // ctx.status = typeof err.status === 'number' ? err.status : (typeof err.statusCode === 'number' ? err.statusCode : 500);
        let req = ctx.request,
            log = `---------统一错误日志----------
                    请求url地址：${req.headers["host"] + req.originalUrl};
                    远程ip地址：${req.ip};
                    远程ip地址族：${JSON.stringify(req.ips || [])};
                    method:${req.method};
                    error:${err}
                `;
        console.log(log);
        console.log(err);
        // application
        ctx.app.emit('error', err, ctx)
        if (err.status === 404 && !err.message) {
            jsonHandler({ message: 'Not Found', code: err.code || 404 });
        } else {
            jsonHandler(err);
        }
    }
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    function jsonHandler(err) {
        ctx.type = 'application/json'
        let body = '';
        let status =  err.code && typeof err.code === 'number'   ? err.code : -1;
        let msg = err.message || err.msg || err.defaultMessage || http.STATUS_CODES[ctx.status] || defaultMessage
        if (err.expose) body = { message: msg, originalError: err, status: status }
        else body = { message: msg, status: status }

        if (!!err.data) {
            body.data = err.data;
        }
        ctx.body = body;
    }
})

app.use(cors({
    origin: '*',
    exposeHeaders: ['Token']
}));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(send.routes(), send.allowedMethods())
app.use(hotUsers.routes(), hotUsers.allowedMethods())
app.use(business.routes(), business.allowedMethods())
app.use(bot.routes(), bot.allowedMethods())
app.use(bonus.routes(), bonus.allowedMethods())

module.exports = app

