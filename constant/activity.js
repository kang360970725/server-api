// 这是一个例子，在这里存放常量对象

module.exports = Object.freeze({
    //  活动类型
    type: {
         //活动
        activity: 0,
        //产品
        product: 1,
        //服务
        service: 2,
    },
    // 状态
    forbidden: {
        // 禁用
        disable: 1,
        // 正常
        normal: 0
    }
})