const
    exception = require('./exception'),
    baseData = (status, message, data) => {
        // 基本返回的数据格式
        return {
            status: status,
            message: message,
            data: data
        }
    },
    self = {
        // 成功响应格式
        success: (data, msg) => {
            return baseData(0, msg ? msg : ' Interface response successful ', data);
        },
        // 异常或失败响应格式
        error: (error) => {
            if (error instanceof exception) {
                return baseData(error.code, error.message);
            } else {
                return baseData(-1, ' Interface response failure ', error.toString());
            }
        }
    };
module.exports = self;
