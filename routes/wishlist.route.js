const express = require('express');
const auth = require('../middleware/auth.mdw');
const router = express.Router();
const wlishModel = require('../models/wishlist.model')

router.get('/', auth, async function (req, res) 
  {
    try {
        const id = res.locals.stuAccount.idHocVien
        const list =  await wlishModel.all(id)
      res.render('user/mywatchlist', {
        wishList: list,
        empty: list === null
      });
    } catch (err) {
      console.error(err);
      res.send('View error log at server console.');
    }
  
  })

  router.post('/remove', async function (req, res) {
    const IdKhoaHoc = req.body.IdKhoaHoc;
    const idHocVien = req.body.idHocVien;

   await wlishModel.remove(idHocVien,IdKhoaHoc,'hocvien_yeuthich_khoahoc');
  res.redirect(req.headers.referer);
  })


  router.post('/add', async function (req, res) {
    const IdKhoaHoc = req.body.IdKhoaHoc;
    const idHocVien = req.body.idHocVien;
 
    await wlishModel.add(idHocVien,IdKhoaHoc,'hocvien_yeuthich_khoahoc');
  res.redirect(req.headers.referer);
  })
//   router.get('/edit-pass', auth, async function (req, res) {
//     res.render('user/editPass');
//   })

//   router.post('/edit-name', async function (req, res) {
//     const newname = req.body.TenHocVien;
//     const id = req.body.idHocVien
//    await stuModel.update(newname,id,'TenHocVien')
//   res.redirect(req.headers.referer);
//   })

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
