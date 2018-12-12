/**
 * Created by liaoyunda on 16/11/22.
 */
const db = require('../../db_config/db');
const Sequelize = require('sequelize');

const user = db.define('users', {
    id: {
        type: Sequelize.STRING(5),
        primaryKey: true
    },
    uuid: Sequelize.CHAR(),
    account: Sequelize.CHAR(),
    password: Sequelize.CHAR(),
    nickname: Sequelize.CHAR(),
    email: Sequelize.CHAR(),
    apikey: Sequelize.CHAR(),
    secret: Sequelize.CHAR(),
    Invitcode: Sequelize.CHAR(),
    Invitdcode: Sequelize.CHAR(),
    phone: Sequelize.CHAR(),
    wechat: Sequelize.CHAR(),
    walletaddress: Sequelize.CHAR(),
    type: Sequelize.INTEGER(),
    createtime: Sequelize.DATEONLY(),
    endtime: Sequelize.DATEONLY(),
    starttime: Sequelize.DATEONLY(),
    level: Sequelize.CHAR(),
    disable: Sequelize.CHAR(2),
    principal: Sequelize.CHAR(),
    bot_update: Sequelize.CHAR(2),
    bot_type: Sequelize.CHAR(2),
    user_principal: Sequelize.CHAR(),
    popular_user: Sequelize.CHAR(2),
    activation_state: Sequelize.CHAR(2),
    bonus_base: Sequelize.CHAR(),
    bot_lirun: Sequelize.CHAR(),
    globalpartners: Sequelize.CHAR(),
    bonus_ratio: Sequelize.CHAR(),
    group: Sequelize.CHAR(),
    api_user: Sequelize.CHAR()
}, {
    timestamps: false,
    freezeTableName: true
});
module.exports = user;