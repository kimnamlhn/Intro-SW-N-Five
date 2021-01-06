const express = require('express');
const courseModel = require('../models/coures.model');
const router = express.Router();
router.get('/course', async function(req, res) {
    try {
        const list = await courseModel.all();
        res.render('./course/source', {

        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }


})

module.exports = router;