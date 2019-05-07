module.exports =
    {
        // mysql: {
        //     host: '39.98.60.62',
        //     // host: '127.0.0.1',
        //     user: 'root',
        //     password: 'MyNewPass4!',
        //     database:'dev_platform', // 前面建的user表位于这个数据库中
        //     // database:'member_platform', // 前面建的user表位于这个数据库中
        //     port: 3306
        // }
        mysql: {
            host: '47.52.29.161',
            // host: '127.0.0.1',
            user: 'root',
            password: '123456',
            database:'dev_platform', // 前面建的user表位于这个数据库中
            // database:'member_platform', // 前面建的user表位于这个数据库中
            port: 13306,
            timezone:"08:00"
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
        redis_cluster : [{
            port: 7001,          // Redis port
            host: '47.52.16.255',   // Redis host
            prefix: 'sam:', //存诸前缀
            password:"mypwd!54321",
            db: 0,
        },{
            port: 7002,          // Redis port
            host: '47.52.16.255',   // Redis host
            prefix: 'sam:', //存诸前缀
            password:"mypwd!54321",
            db: 0,
        },{
            port: 7003,          // Redis port
            host: '47.52.16.255',   // Redis host
            prefix: 'sam:', //存诸前缀
            password:"mypwd!54321",
            db: 0,
        },{
            port: 7004,          // Redis port
            host: '47.52.16.255',   // Redis host
            prefix: 'sam:', //存诸前缀
            password:"mypwd!54321",
            db: 0,
        },{
            port: 7005,          // Redis port
            host: '47.244.142.147',   // Redis host
            prefix: 'sam:', //存诸前缀
            password:"mypwd!54321",
            db: 0,
        },{
            port: 7006,          // Redis port
            host: '47.244.142.147',   // Redis host
            prefix: 'sam:', //存诸前缀
            password:"mypwd!54321",
            db: 0,
        }],

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
        ,
        whiteList : ["192.168.0.154:9527","39.98.60.62"]
    };