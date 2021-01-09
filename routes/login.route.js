const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const stuModel = require('../models/student.model')
const LoginAuth = require('../middleware/LoginAuth.mdw');
router.get('/',LoginAuth, async function (req, res) {
    const ref = req.headers.referer
    if (req.headers.referer) {
        req.session.retUrl = ref;
      }
    
    res.render('user/login');
  })
  
  router.post('/', async function (req, res) {
    const stu = await stuModel.singleByEmail(req.body.email);
    if (stu.length === 0) {
      return res.render('user/login', {
        err_message: 'Invalid Email or password.'
      });
    }
    const user = await userModel.singleByidTaiKhoan(stu[0].TaiKhoan_idTaiKhoan);

    const ret =  bcrypt.compareSync(req.body.password, user.MatKhau);
    if (ret === false) {
      return res.render('user/login', {
        err_message: 'Invalid Email or password.'
      });
    }
    req.session.accounttype=true;
    req.session.authUser=user;
    let url = req.session.retUrl || '/';
    res.redirect(url);
  })

  router.post('/-out', async function (req, res) {

    req.session.accounttype=false;
    req.session.authUser=null;
    res.redirect(req.headers.referer);
  })
  

  module.exports = router;