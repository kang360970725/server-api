module.exports =
    {
        mysql: {
            host: '47.52.29.161',
            // host: '127.0.0.1',
            user: 'root',
            password: '123456',
            database:'dev_platform', // 前面建的user表位于这个数据库中
            // database:'member_platform', // 前面建的user表位于这个数据库中
            port: 13306
        }
        // mysql: {
        //     host: '45.195.143.40',
        //     user: 'eth',
        //     password: 'RpJh9qwKduSRdzLZ',
        //     database:'fomo888', // 前面建的user表位于这个数据库中
        //     port: 13338
        // }
        ,
        redis : {
            port: 6379,          // Redis port
            host: '192.168.0.214',   // Redis host
            prefix: 'sam:', //存诸前缀
            ttl: 60 * 60 * 24 * 1000 * 1.5,  //过期时间
            db: 0,
            family: 4, // ip地址族
            keepAlive: 0.1 * (1000 * 60 * 60), //保持连接24h
            connectTimeout: 1000 * 5, //连接超时
            readOnly: false
        },
        port:{
            doc:3302,
            api:3300
        }
        ,
        url:{
            // upload:"E:/blue/upload/"
            upload:"/user/img/upload/"
        }
        ,
        host:
            "http://192.168.0.33/source/"
        ,
        pool:{
            token_name : "Authorization",
            token_type : "Token ",
            token_value : "eacf3b56a09148ef231c6cb8456794c665e221e2"
        }
    };