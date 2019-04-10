let
    BUSINESS = require("../../constant/business"),
    str = require("../../utils/stringHelper"),
    moment = require('moment');

class dao {
    //添加商品
    static async addGoods(connection, query) {
        let sql = () => `
        INSERT INTO goods
        (good_name,\`desc\`,
         img_cover, 
         img_info, 
         update_time, 
         header, 
         unit, 
         price, 
         state, 
         del_flag)
         VALUES (
         ?,?,?,?,?,?,?,?,?,0
         );
        `;
        let params = [];
        params.push(query.name);
        params.push(query.desc);
        params.push(query.imgCover);
        params.push(query.imgInfo);
        params.push(new Date());
        params.push(query.header);
        params.push(query.unit);
        params.push(query.price);
        params.push(query.state);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    //添加商品规格
    static async addGoodsSpec(connection, query) {
        let sql = () => `
        INSERT INTO goods_spec
        (goods_id,
         spec_code,
         spec_price, 
         spec_market_price, 
         stock, 
         del_flag 
         )
         VALUES (
         ?,?,?,?,?,0
         );
        `;
        let params = [];
        params.push(query.goodId);
        params.push(query.code);
        params.push(query.price);
        params.push(query.marketPrice);
        params.push(query.stock);
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }

    static async updateGoods(connection, query) {
        var set = [];
        var where = [];
        let params = [];
        let sql = () => `
        UPDATE goods 
        SET
        ${set.join(' , ')}
        WHERE
        ${where.join(' and ')}
        `;
        if (!str.isEmpty(query.name)) {
            set.push('good_name = ?');
            params.push(query.name)
        }
        if (!str.isEmpty(query.desc)) {
            set.push(`\`desc\` = ?`);
            params.push(query.desc)
        }
        if (!str.isEmpty(query.imgCover)) {
            set.push('img_cover = ?');
            params.push(query.imgCover)
        }
        if (!str.isEmpty(query.imgInfo)) {
            set.push('img_info = ?');
            params.push(query.imgInfo)
        }

        set.push('update_time = ?');
        params.push(new Date())

        if (!str.isEmpty(query.header)) {
            set.push('header = ?');
            params.push(query.header)
        }

        if (!str.isEmpty(query.unit)) {
            set.push('unit = ?');
            params.push(query.unit)
        }

        if (!str.isEmpty(query.price)) {
            set.push('price = ?');
            params.push(query.price)
        }

        if (!str.isEmpty(query.state)) {
            set.push('state = ?');
            params.push(query.state)
        }

        if (!str.isEmpty(query.delFlag)) {
            set.push('del_flag = ?');
            params.push(query.delFlag)
        }

        where.push('good_id = ?')
        params.push(query.goodId)
        if (set.length <= 0 || str.isEmpty(query.goodId)) {
            return 0;
        }
        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async queryGoods(connection, query) {
        let where = [];
        let content = [];
        var limit = "LIMIT ";
        var orderBy = "ORDER BY ";
        let rule = "desc";
        var order = "create_time ";
        let sql = () => `
        SELECT 
        ${content.join(' , ')}
        FROM goods
        WHERE ${where.join(' and ')}
        ${orderBy}
        ${limit};
        `;
        let params = [];
        content.push(' good_id ');
        content.push(' good_name ');
        content.push(' img_cover ');
        content.push(' create_time ');
        content.push(' price ');
        if (!str.isEmpty(query.desc)) {
            content.push(' `desc` ');
        }

        if (!str.isEmpty(query.imgInfo)) {
            content.push(' img_info ');
        }

        if (!str.isEmpty(query.header)) {
            content.push(' header ');
        }

        where.push(' 1 = 1 ');
        if (!str.isEmpty(query.goodId)) {
            where.push(' good_id = ? ');
            params.push(query.goodId);
        }

        if (!str.isEmpty(query.name)) {
            where.push(' good_name like ? ');
            params.push("%" + query.name + "%");
        }

        if (!str.isEmpty(query.delFlag)) {
            where.push(' del_flag = ? ');
            params.push(query.delFlag);
        }

        if (!str.isEmpty(query.state)) {
            where.push(' state = ? ');
            params.push(query.state);
        }

        if ('asc' == query.orderRule) {
            rule = query.orderRule;
        }
        if ('price' == query.orderBy) {
            order = query.orderBy;
        }

        orderBy += `${order}  ${rule}`;

        if (str.isEmpty(query.pageIndex) || str.isEmpty(query.pageSize)) {
            limit = "";
        } else {
            limit += `${(query.pageIndex) * query.pageSize}, ${query.pageSize}`;
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }


    static async queryGoodsCount(connection, query) {
        let where = [];
        let sql = () => `
        SELECT 
        count(1) as count
        FROM goods
        WHERE ${where.join(' and ')}
        `;
        let params = [];
        where.push(' 1 = 1 ');
        if (!str.isEmpty(query.goodId)) {
            where.push(' good_id = ? ');
            params.push(query.goodId);
        }

        if (!str.isEmpty(query.name)) {
            where.push(' good_name like ? ');
            params.push("%" + query.name + "%");
        }
        if (!str.isEmpty(query.header)) {
            where.push(' header like ? ');
            params.push("%" + query.header + "%");
        }

        if (!str.isEmpty(query.delFlag)) {
            where.push(' del_flag = ? ');
            params.push(query.delFlag);
        }

        if (!str.isEmpty(query.state)) {
            where.push(' state = ? ');
            params.push(query.state);
        }

        return new Promise(async (resolve, reject) => {
            connection.query(sql(), params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    }
}

module.exports = dao