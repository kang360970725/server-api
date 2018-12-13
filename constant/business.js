// 这是一个例子，在这里存放常量对象

module.exports = Object.freeze({
    // 删除
    delete: {
        //已删除
        isDelete: 0,
        //未删除
        notDelete: 3
    },
    //  用户类型
    type: {
         //商家
        business: 1,
        //设计师
        designer: 2 
    },
    // 状态
    state: {
        // 禁用
        disable: 1,
        // 正常
        normal: 0
    }
   
})