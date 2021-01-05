const { promises } = require('fs');
const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "admin",
    database: 'learning',
    connectionLimit: 100,
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => pool_query(sql),
    add: function(table, entity) {
        return new Promise(function(resolve, reject) {
            const sql = `insert into ${table} set ?`;
            pool.query(sql, entity, function(error, results, feilds) {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            })
        })
    },
    del: function(table, condition) {
        return new Promise(function(resolve, reject) {
            const sql = `delete from ${table} where ?`;
            pool.query(sql, condition, function(error, results, feilds) {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            })
        })
    },
    patch: function(table, entity, condition) {
        return new Promise(function(resolve, reject) {
            const sql = `update  ${table} set ? where ?`;
            pool.query(sql, [entity, condition], function(error, results, feilds) {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            })
        })
    },
    del: function(table, condition) {
        return new Promise(function(resolve, reject) {
            const sql = `delete from ${table} where ?`;
            pool.query(sql, condition, function(error, results, feilds) {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            })
        })
    },
}