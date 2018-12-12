'use strict';

const PAGE_LENGTH = 10;

const models = require('./models');

const User = models.db.User;

module.exports = {
    async create(data) {
        const users = await User.create(data);

        return users.toJSON();
    },
    async update(data) {
        const id = data.id;
        const users = await User.findById(id);

        if (users) {
            const result = await users.update(data);

            return result;
        }
        return null;
    },
    async findById(id) {
        const users = await User.findById(id);

        return users.toJSON();
    },
    async findMany(query){
        query = query || {};

        const users = await User.findAll(query);

        return users.map(users => users.toJSON());
    },
    async page(where, page) {
        where = where || {};
        page = page || 1;

        const query = {
            where,
            limit: PAGE_LENGTH,
            offset: ((page - 1) * PAGE_LENGTH),
        };
        const result = await User.findAndCountAll(query);

        return ({
            page,
            count: result.count,
            rows: result.rows.map(users => users.toJSON()),
        });
    },
};