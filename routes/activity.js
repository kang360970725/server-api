const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
exception = require('../utils/exception.js'),
    data = require('../utils/data');

let
    activityCtrl = require("../business/controller/activity");

router.prefix('/activity')

/**
 * @api {get} /activity/activitys 上传文件
 *
 * 上传文件
 */
router.get('/activitys', async (ctx, next) => {
    var params = ctx.query;
    return await activityCtrl.activitys(params);
})


/**
 * @api {get} /activity/addorupdate 上传文件
 *
 * 上传文件
 */
router.post('/addorupdate', async (ctx, next) => {
    var params = ctx.request.body;
    return await activityCtrl.addOrUpdateActivitys(params);
})


/**
 * @api {get} /activity/addorupdate 上传文件
 *
 * 上传文件
 */
router.post('/updateinfo', async (ctx, next) => {
    var params = ctx.request.body;
    return await activityCtrl.updateinfo(params);
})

module.exports = router