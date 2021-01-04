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
<<<<<<< Updated upstream
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
=======
    load: sql => pool_query(sql)
        // load(sql) {
        //     return pool_query(sql);
        // }
}



//  Luc ket noi db thi mo code tu khuc nay tro len
// o duoi la nhap thoi














//     load(sql){
//         return new Promise(
//             function(done, fail){
//                 pool.query(sql, function(error, results, fields){
//                     if (error)
//                     fail(error);
//                 else {
//                     done(results); // nếu trả về nhiều kq thì done([results, a, b,c ..])
//                 }
//                 })
//             }
//         )
//     }
// }


// load câu sql lên
// connection.connect();
// connection.query(sql, function (error, results, fields) {
//     if (error)
//         fail(error);
//     else {
//         done(results); // nếu trả về nhiều kq thì done([results, a, b,c ..])
//     }
//     connection.end();
// });
//     }
// };
>>>>>>> Stashed changes
