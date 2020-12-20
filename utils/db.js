const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "123456",
    database: 'data mau',
    connectionLimit: 100,
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
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