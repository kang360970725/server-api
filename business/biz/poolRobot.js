'use strict';

let dao = require("../../db_config/dao"),
    data = require('../../utils/data'),
    request = require("request"),
    config = require('../../db_config/config'),
    str = require("../../utils/stringHelper"),
    activityDao = require('../../business/dao/activity.js');
const fs = require('fs');
const path = require('path');

class biz {

    static async list(params) {
        return await biz.minepools();
    }

    static async one(params) {
        return await dao.manageConnection(async (connection) => {
            let pool = await activityDao.queryPool(connection, params);
            if (pool && pool.length > 0) {
                let param = {tokenValue: pool[0].token, poolId: pool[0].pool_id,balance:params.balance}
                if (str.isEmpty(param.tokenValue) || str.isEmpty(param.poolId)) {
                    return;
                }
                return JSON.parse(await params.redis.get("poolinfo_"+param.poolId));
                // await biz.minepools(param);
            }
        })
    }

    static async minepools(params) {
        return await new Promise(async (resolve, reject) => {
            let tokenValue = params && !str.isEmpty(params.tokenValue) ? params.tokenValue : config.pool.token_value;
            let token = config.pool.token_type + tokenValue;
            let url = "https://www.bluecatbot.com/api/minepools";
            if (params && !str.isEmpty(params.poolId)) {
                url = `${url}/${params.poolId}`;
                if (!str.isEmpty(params.balance)) {
                    url = `${url}/balance-daily`;
                }
            }
            let requestparam = {
                url: url,
                method: "GET",
                json: true,
                headers: {
                    [config.pool.token_name]: token,
                    "content-type": "application/json"
                },
                body: JSON.stringify("")
            }
            request(requestparam, function (error, response, body) {
                if (error) return reject(error);
                if (response.statusCode != 200) return reject(response);
                resolve(body);
            });
        })
    }
}


module.exports = biz;