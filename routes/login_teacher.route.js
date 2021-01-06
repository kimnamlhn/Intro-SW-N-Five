const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {

    res.render('./vwAccount/login_teacher');
})

module.exports = router;