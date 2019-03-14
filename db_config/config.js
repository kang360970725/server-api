module.exports =
    {
        mysql: {
            host: '47.52.29.161',
            user: 'root',
            password: '123456',
            database:'dev_platform', // 前面建的user表位于这个数据库中
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
        port:{
            doc:3302,
            api:3300
        }
    };