'use strict';

const redis = require('ioredis'),
    _ = require('lodash'),
    lru = require('lru-cache'),
    options = {
        //max: 500,
        //length: function (n, key) { return n * 2 + key.length }, 
        dispose: function (key, n) {
            console.log(key + '- 缓存过期');
        },
        maxAge: 1000 * 60 * 60 * 24, //最大缓存时间1天
        stale: true
    },
    cache = new lru(options);

let events = {
    connect: (err, msg) => {
        console.log("redis connected .");
        ;
    },
    ready: (err, msg) => {
        console.log("redis ready .");
    },
    error: (err, msg) => {
        console.log('redis error .' + err.message);
    },
    close: (err, msg) => {
        console.log('redis closed .');
    },
    end: (err, msg) => {
        console.log('redis ended .');
    },
    select: (err, msg) => {
        console.log('redis db change.');
    }
}

class RedisClient {
    constructor(opts, evts) {
        this.options = _.extend({
            retryStrategy: function (times) {
                var delay = Math.min(times * 2, 2000);
                console.log('redis retryStrategy ' + delay);
                return delay;
            },
            reconnectOnError: function (err) {
                console.log('redis conection error.message: ' + err.message);
                return true;
            }
        }, opts);
        let cacheKey = JSON.stringify(this.options);
        let client = cache.get(cacheKey);
        if (!!client) {
            return client;
        } else {

            let evtobj = _.extend(events, evts || {});
            client = new redis.Cluster(opts);
            for (let key in evtobj) {
                if (evtobj.hasOwnProperty(key)) {
                    client.on(key, evtobj[key]);
                }
            }
            let keepAlive = this.options.keepAlive;
            keepAlive = isNaN(keepAlive) ? 0 : keepAlive;
            cache.set(cacheKey, client, this.options.keepAlive)
            return client;
        }
    }
}

exports.RedisClient = RedisClient;
exports.redis = function (options) {
    const _client = new RedisClient(options);

    return {
        rawClient: _client,
        get: async (key) => {
            return _client.get(key)
        },
        set: async (key, value, expire) => {
            if (!_.isString(value)) {
                value = JSON.stringify(value)
            }
            if (_.isNumber(expire)) {
                return _client.setex(key, expire, value);
            }
            return _client.set(key, value);
        },

        ltrim: async (key, index, end) => {
            return _client.ltrim(key, index, end);
        },

        lpush: async (key, value, expire) => {
            if (!_.isString(value)) {
                value = JSON.stringify(value)
            }
            return await _client.lpush(key, value);
        },
        lrange: async (key, index, end) => {
            return await _client.lrange(key,index, end);
        },
        llen: async (key) => {
            return await _client.llen(key);
        },

        /**
         * 更新过期时间
         */
        updateExpire: async (key, expire) => {
            if (expire && expire != '' && expire < 1)
                expire = 1;
            return _client.expire(key, expire);
        },

        /**
         * 查询Key是否存在
         */
        keyExist: async (key) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = await _client.exists(key)
                    resolve(result && result.length > 0)
                } catch (err) {
                    reject(err)
                }
            })
        },
        /**
         * 删除指定Key记录
         */
        delete: async (key) => {
            return _client.del(key);
        }
    }
}