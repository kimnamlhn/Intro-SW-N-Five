// const express = require('express');
// const categoryModel = require('../models/category.model');

// const router = express.Router();

// router.get('/', async function (req, res) {

//         const rows = await categoryModel.all();
//         res.render('vwCategories/index', {
//             categories: rows,
//             empty: rows.length === 0
//         });
//     })

//     module.exports = router;


    // xong thi mo code tu khuc nay tro len 


    // try {
    //     const rows = await db.load('select * from categories');
    //     res.render('vwCategories/index', {
    //         categories: rows,
    //         empty: rows.length === 0
    //     });
    // } catch (err) {
    //     console.error(err);
    //     res.send('View error log at server console.');
    // }



    // const render_function = function (rows){
    //     res.render('vwCategories/index', {
    //         categories: rows,
    //         empty: rows.length === 0
    //     });
    // }

    // db.load('select * from categories', render_function);


    //     const connection = mysql.createConnection({
    //         host: 'localhost',
    //         port: 8889,
    //         user: 'root',
    //         password: 'root',
    //         database: 'my_db'
    //     });

    //     connection.connect();
    //     connection.query('select * from categories', function (error, result, fields) {
    //         if (error)
    //             throw error;
    //         console.log(results);

    //     });
    //     res.render('vwCategories/index', {
    //         categories: results,
    //         empty: results.length === 0
    //     });

    //     connection.end();
