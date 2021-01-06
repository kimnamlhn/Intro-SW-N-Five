const express = require('express');
const auth = require('../middleware/auth.mdw');
const adminModel = require('../models/admin.model');
const router = express.Router();

router.get('/', auth, async function (req, res) {
  const temp = await adminModel.single();
    res.render('admin/StudentManage',{
      list: temp,
      empty: temp === null
    });
  })
  router.post('/accept', async function (req, res) {
    const IdKhoaHoc = req.body.IdKhoaHoc
    const idHocVien = req.body.idHocVien
    adminModel.changeState(idHocVien,IdKhoaHoc)
    //console.log(IdKhoaHoc,idHocVien)
    res.redirect(req.headers.referer);
  })



  router.post('/accept', async function (req, res) {
    const idHv = req.body.idHocVien;
   await adminModel.update(idHocVien)
  res.redirect(req.headers.referer);
  })

//   router.post('/edit-email', async function (req, res) {
//     const newEmail = req.body.Email;
//     const id = req.body.idHocVien
//    await stuModel.update(newEmail,id,'Email')
//   res.redirect(req.headers.referer);
//   })
//   router.post('/edit-dob', async function (req, res) {
//     const newDOB = req.body.NgaySinh;
//     const id = req.body.idHocVien;
//     var parts =newDOB.split('/');
//     const dob = parts[2]+'/'+parts[1]+'/'+ parts[0];
//     await stuModel.update(dob,id,'NgaySinh');
//   res.redirect(req.headers.referer);
//   })

// router.post('/edit-pass', async function (req, res) {
//     const id = req.body.idTaiKhoan;
//     const stu = await userModel.single(id);
//     const oldPassword = req.body.oldPassword;
//     const newPassword = req.body.newPassword;
//     console.log(stu.MatKhau)
//     const ret =  bcrypt.compareSync(oldPassword, stu.MatKhau);
//     console.log(ret);
//     if (ret === false) {
//       return res.render('user/editPass', {
//         err_message: 'Invalid old password.'
//       });
//     }
//     const hash = bcrypt.hashSync(newPassword, 10);
//     await userModel.update(hash,id,'MatKhau');
//      res.render('user/editPass', {
//       succ_message: 'Success changing your password.'
//     });
//   })

  

module.exports = router
