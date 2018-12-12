var router = require('koa-router')();
var t_user_review_config = require('../models/db/user');
var db = require('../db_config/db');

router.get('/user/:uuid', async function (ctx, next) {
    var config = await t_user_review_config.findOne({
        where:{
            userId: ctx.params.userId,
            config_type: "0"
        }
    });
    console.log(config.id+config.userId);
    ctx.state = {
        userName: config.userName
    };

    await ctx.render('user', {
    });
})
module.exports = router;
