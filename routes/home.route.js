const express = require('express');
const detailModel = require('../models/home.model');
const router = express.Router();
//Đi đến trang chủ
router.get('/', async function(req, res) {
    try {
        // const list = await detailModel.topNewCourses()
        // const topviewers = await detailModel.topViewersCourses()
        // const topTopic = await detailModel.topTopic()
        const rows = await detailModel.LinhVucCap2();
        for (var i = 0; i < rows.length; i++) {
            var obj = JSON.parse(JSON.stringify(await detailModel.CoursesByLinhVuc(rows[i].idLinhVucCap2)))
            rows[i].courses = obj
        }
        res.render('home', {
            //   newCourses: list,
            //   empty: list === null,
            //   topViewers: topviewers,
            //    topTopic: topTopic,
            //    numTopTopic: topTopic === null
            lvCap2: rows,
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }

})

module.exports = router;