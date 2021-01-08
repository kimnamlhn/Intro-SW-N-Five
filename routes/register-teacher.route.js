const express = require('express');
const router = express.Router();
const categ = require('../models/courses.model');
const detailModel = require('../models/home.model');
const teacherModel = require('../models/teacher.models');
router.get('/', async function(req, res) {


    const rows = await detailModel.LinhVucCap2();
    for (var i = 0; i < rows.length; i++) {
        var obj = JSON.parse(JSON.stringify(await detailModel.CoursesByLinhVuc(rows[i].idLinhVucCap2)))
        rows[i].courses = obj
    }
    //console.log(rows)
    res.render('./vwAccount/register_teacher', {
        lvCap2: rows,
    });


})
router.post('/', async function(req, res) {
    const rows = await detailModel.LinhVucCap2();
    for (var i = 0; i < rows.length; i++) {
        var obj = JSON.parse(JSON.stringify(await detailModel.CoursesByLinhVuc(rows[i].idLinhVucCap2)))
        rows[i].courses = obj
    };
    console.log(req.body);

    const entity = [{
        TenGiangVien: req.body.name,
        NgaySinh: req.body.dob,
        MoTa: req.body.Des,
        Email: req.body.email,
        password: req.body.password
    }]
    const teacher = await teacherModel.register(req.body.name, req.body.dob, req.body.Des,req.body.email);
    // const teacher = await teacherModel.add(entity);
    console.log(teacher);

    res.render('./vwAccount/register_teacher', {
        succ_message: "dang ki thanh cong, cho xet duyet!"
    });

})
module.exports = router;