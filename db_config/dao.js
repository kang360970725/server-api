'use strict'

const mysql = require('mysql');
const dbConfig = require('../db_config/config');
// const _ = require('lodash');

// 默认设置了mysql的charset=utf8mb4
const db = mysql.createPool(Object.assign({
    multipleStatements: 'true',
    connectionLimit: 50,
    charset:"utf8mb4"
}, dbConfig.mysql));

var dao = {
     manageTransactionConnection: function (asyncAction) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if (err) return reject(err);
                var closeAutoCommit = (err, result) => {
                    connection.query('SET autocommit=1;', (commitErr, ret) => {
                        if (!!commitErr) {
                            console.log(commitErr);
                        }
                        connection.release();
                        if (!!err) {
                            return reject(err);
                        }
                        resolve(result);
                    });
                };

                connection.query('SET autocommit=0;', (err, ret) => {
                    if (!!err) {
                        return closeAutoCommit(err);
                    }
                    connection.beginTransaction(async (err) => {
                        if (err) {
                            return closeAutoCommit(err);
                        }

                        if (!!asyncAction) {
                            try {
                                let result = await asyncAction(connection);
                                connection.commit((err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            return closeAutoCommit(err);
                                        });
                                    }
                                    return closeAutoCommit(null, result);
                                });
                            } catch (error) {
                                connection.rollback(() => {
                                    return closeAutoCommit(error);
                                });
                            }
                        } else {
                            resolve(connection)
                        }
                    });

                });
            });
        });
    },

    manageConnection: function (asyncAction) {
        return new Promise((resolve, reject) => {
            db.getConnection(async (err, connection) => {
                if (err) return reject(err);
                if (!!asyncAction) {
                    try {
                        resolve(await asyncAction(connection));
                    } catch (error) {
                        reject(error);
                    }
                    finally {
                        connection.release();
                    }
                } else {
                    resolve(connection);
                }
            });
        })
    }
};
module.exports = dao