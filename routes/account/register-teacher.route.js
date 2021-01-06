const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('./vwAccount/register_teacher');
})

module.exports = router;