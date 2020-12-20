const express = require('express');

const router = express.Router();
const moment = require('moment');
const bcrypt = require('bcryptjs');
const accountModels = require('../models/account/accountModels');
router.get('/login', async function(req, res) {
    res.render('vwAccount/login');

})
router.get('/register', async function(req, res) {
    res.render('vwAccount/register');

})

router.get('/profile', async function(req, res) {
    res.render('vwAccount/profile')
})

router.post('/register', async function(req, res) {
    const dob = moment(req.body.dob, 'DD/MM/YY').format('YYYY-MM-DD');
    const password_hash = bcrypt.hashSync(req.body.password, 8)
    const entity = {
        username: req.body.username,
        password_hash,
        fullName: req.body.name,
        email: req.body.email,
        dob,
        permission: 0
    }

    await accountModels.add(entity);
    res.render('vwAccount/register');
})




module.exports = router;