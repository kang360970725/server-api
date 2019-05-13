let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    exception = require('../../utils/exception.js'),
    moment = require('moment');

class dao {
    //添加商品
    static async addGoodsOrder(connection, query) {
        let sql = () => `
        INSERT INTO goods_order
        (order_no,\`desc\`, 
         good_id, 
         good_price, 
         pay_price, 
         address, 
         user_id, 
         phone, 
         name,state)
         VALUES (
         UUID(),?,?,?,?,?,?,?,?,0
         );
        `;
        let params = [];
        params.push(query.desc);
        params.push(query.goodId);
        params.push(query.goodPrice);
        params.push(query.payPrice);
        params.push(query.address);
        params.push(query.userId);
        params.push(query.phone);
        params.push(query.name);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err)
                resolve(result);
            });
        })
    }


    static async updateGoodsOrder(connection, query) {
        var set = [];
        var where = [];
        let params = [];
        let sql = () => `
        UPDATE goods_order 
        SET
        ${set.join(' , ')}
        WHERE
        ${where.join(' and ')}
        `;
        if (!str.isEmpty(query.address)) {
            set.push('address = ?');
            params.push(query.address)
        }
        if (!str.isEmpty(query.desc)) {
            set.push(`\`desc\` = ?`);
            params.push(query.desc)
        }
        if (!str.isEmpty(query.phone)) {
            set.push('phone = ?');
            params.push(query.phone)
        }
        if (!str.isEmpty(query.name)) {
            set.push('name = ?');
            params.push(query.name)
        }

        if (!str.isEmpty(query.state)) {
            set.push('state = ?');
            params.push(query.state)
        }

        if (!str.isEmpty(query.waybillNo)) {
            set.push('waybill_no = ?');
            params.push(query.waybillNo)
        }

        if (!str.isEmpty(query.price)) {
            set.push('price = ?');
            params.push(query.price)
        }

        where.push('order_id = ?')
        params.push(query.orderId)
        if (set.length <= 0 || str.isEmpty(query.orderId)) {
            return 0;
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err)
                resolve(result);
            });
        })
    }


    static async queryGoodsOrder(connection, query) {
        let where = [];
        let content = [];
        var limit = "LIMIT ";
        var orderBy = "ORDER BY ";
        let rule = "desc";
        var order = "go.order_time ";
        let sql = () => `
        SELECT 
        ${content.join(' , ')}
        FROM goods_order go 
        LEFT JOIN goods g ON go.good_id = g.good_id
        WHERE ${where.join(' and ')}
        ${orderBy}
        ${limit};
        `;
        let params = [];
        content.push(' go.order_id ');
        content.push(' go.order_no ');
        content.push(' go.order_time ');
        content.push(' go.good_id ');
        content.push(' go.good_price ');
        content.push(' go.pay_price ');
        content.push(' go.`desc` ');
        content.push(' go.address ');
        content.push(' go.user_id ');
        content.push(' go.phone ');
        content.push(' go.name ');
        content.push(' go.state ');
        content.push(' go.waybill_no ');
        content.push(' g.good_name ');


        where.push(' 1 = 1 ');
        if (!str.isEmpty(query.orderId)) {
            where.push(' go.order_id = ? ');
            params.push(query.orderId);
        }

        if (!str.isEmpty(query.orderNo)) {
            where.push(' go.order_no like ? ');
            params.push("%" + query.orderNo + "%");
        }

        if (!str.isEmpty(query.name)) {
            where.push(' go.name like ? ');
            params.push("%" + query.name + "%");
        }

        if (!str.isEmpty(query.phone)) {
            where.push(' go.phone like ? ');
            params.push("%" + query.phone + "%");
        }

        if (query.startTime) {
            where.push(' go.order_time >= ? ');
            params.push(query.startTime);
        }

        if (query.endTime) {
            where.push(' go.order_time <= ? ');
            params.push(query.endTime);
        }

        if (!str.isEmpty(query.userId)) {
            where.push(' go.user_id = ? ');
            params.push(query.userId);
        }

        if (!str.isEmpty(query.state)) {
            where.push(' go.state = ? ');
            params.push(query.state);
        }

        if (!str.isEmpty(query.waybillNo)) {
            where.push(' go.waybill_no = ? ');
            params.push(query.waybillNo);
        }

        orderBy += `${order}  ${rule}`;

        if (str.isEmpty(query.pageIndex) || str.isEmpty(query.pageSize)) {
            limit = "";
        } else {
            limit += `${(query.pageIndex) * query.pageSize}, ${query.pageSize}`;
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err)
                resolve(result);
            });
        })
    }


    static async queryGoodsOrderCount(connection, query) {
        let where = [];
        let sql = () => `
        SELECT 
        count(1) as count
        FROM goods_order
        WHERE ${where.join(' and ')}
        `;
        let params = [];
        where.push(' 1 = 1 ');
        if (!str.isEmpty(query.orderId)) {
            where.push(' order_id = ? ');
            params.push(query.orderId);
        }

        if (!str.isEmpty(query.orderNo)) {
            where.push(' order_no like ? ');
            params.push("%" + query.orderNo + "%");
        }

        if (!str.isEmpty(query.name)) {
            where.push(' name like ? ');
            params.push("%" + query.name + "%");
        }

        if (!str.isEmpty(query.phone)) {
            where.push(' phone like ? ');
            params.push("%" + query.phone + "%");
        }

        if (query.startTime) {
            where.push(' order_time >= ? ');
            params.push(query.startTime);
        }

        if (query.endTime) {
            where.push(' order_time <= ? ');
            params.push(query.endTime);
        }

        if (!str.isEmpty(query.userId)) {
            where.push(' user_id = ? ');
            params.push(query.userId);
        }

        if (!str.isEmpty(query.state)) {
            where.push(' state = ? ');
            params.push(query.state);
        }

        if (!str.isEmpty(query.waybillNo)) {
            where.push(' waybill_no = ? ');
            params.push(query.waybillNo);
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err)
                resolve(result);
            });
        })
    }
}

module.exports = dao