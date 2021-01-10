const express = require('express');
const router = express.Router();
const teacherModel = require('../models/teacher.models')
router.get('/teacher', async function(req, res) {
    try {
        const rows = await teacherModel.all();
        console.log(rows)
        res.render('./teacher/teacherList', {
            teacher: rows
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }
})
router.get('/teacher/add', async function(req, res) {
    res.render('./teacher/add');
})
router.post('/teacher/add', async function(req, res) {
    const entity = {
        fullName: req.body.txtFullName,
        url: req.body.txtURL,
        id: req.body.txtID,
        job: req.body.txtJob
    }
    const rowss = await teacherModel.add(entity);
    res.redirect('/teacher');
})
router.get('/teacher/edit', async function(req, res) {
    const id = +req.query.id || -1;
    const rows = await teacherModel.single(id);
    const category = rows[0];
    res.render('./teacher/edit', {
        category
    });
})
router.post('/teacher/update', async function(req, res) {
    const ret = await teacherModel.patch(req.body);
    console.log(ret);
    res.redirect('/teacher')
})
router.post('/teacher/del', function(req, res) {
    const ret = teacherModel.del(req.body.id);
    res.redirect('/teacher');
})
router.get('/teacher/mieuta', async function(req, res) {
    try {
        const id = +req.query.id || -1;
        console.log(id)
        const rows = await teacherModel.single(id)
        teacher = rows[0];
        res.render('./teacher/mieuta', {
            teacher
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }
})
router.post('/teacher/mieuta', async function(req, res) {
    try {
        const id = +req.query.idGiangVien || -1;
        const rows = await teacherModel.all();
        var temp;
        console.log(id)
        console.log("khong co du lieu")
        for (let index = 1; index <= rows.length; index++) {
            if (id === rows[index].idGiangVien) {
                temp = rows[index]
            }

        }
        res.render('./teacher/mieuta', {
            teacher: temp
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }
})
module.exports = router