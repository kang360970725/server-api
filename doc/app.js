const
    Koa = require('koa'),
    app = new Koa(),
    static = require("koa-static"),
    exec = require('child_process').exec,
    dbConfig = require('../db_config/config')


    exec(' apidoc -i ../routes -o ./dist ', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            console.error('APIDoc生成失败');
            return;
        }
        console.log('APIDoc生成成功');
        app.use(static('./dist'));
        app.listen(dbConfig.port.doc, () => {
            console.log('APIDoc启动成功');
        });
    });
