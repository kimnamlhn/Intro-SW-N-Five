const express = require('express');
//const detailModel = require('../models/home.model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const stuModel = require('../models/student.model');
//Xác minh email
const {Auth} = require('two-step-auth');

async function login(emailId){
    const res = await Auth(emailId, "NFIVE");
    return res;
}


router.get('/', async function (req, res) {
    res.render('user/register');
  })
  
  router.post('/', async function (req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const Email = req.body.email
    const stu = await stuModel.singleByEmail(Email)
    if (stu.length !== 0) {
      return res.render('user/register', {
        err_message: 'Email này đã được sử dụng.'
      });
    }
  const user = {
      idTaiKhoan: null,
      TenTaiKhoan: null,
      MatKhau: hash,
      Salt: null,
      LoaiTaiKhoan: 2
  }
  req.session.tmpUser = user
  const status = await login(Email);
  res.render('user/confirmOTP',{
    user: user,
    Email: Email,
    fullName: req.body.name,
    OTP: status.OTP,
    fail: status.success !== true,
  });

  })



  router.post('/confirmOTP', async function (req, res) {
   const fullName = req.body.fullName;
   const Email = req.body.Email;
   await userModel.add(req.session.tmpUser);
  const lastid = JSON.parse(JSON.stringify(await userModel.lastId()))[0].idTaiKhoan
  console.log("Last id", lastid)
  await stuModel.addHocVien(Email,lastid,fullName);
  res.render('user/login',{
    succ_message: 'Đăng kí thành công.'
   });
  })
 
  module.exports = router;
