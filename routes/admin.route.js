const express = require('express');
const Adminauth = require('../middleware/adminAuth.mdw');

const adminModel = require('../models/admin.model');
const router = express.Router();

router.get('/', Adminauth, async function (req, res) {
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

  router.post('/delete', async function (req, res) {
    const IdKhoaHoc = req.body.IdKhoaHoc
    const idHocVien = req.body.idHocVien
    adminModel.deleteCourse(idHocVien,IdKhoaHoc)
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

  
    router.get('/del_course',Adminauth, async function (req, res) {
      const temp = await adminModel.getTeacher();
        res.render('admin/course_list',{
          list: temp,
          empty: temp === null
        });
      })
      router.post('/course_list/delete', async function (req, res) {
        const IdKhoaHoc = req.body.IdKhoaHoc
        adminModel.delCourse(IdKhoaHoc)
        res.redirect(req.headers.referer);
      })
      router.get('/statistical',Adminauth, async function (req, res) {
      const temp = await adminModel.getStatistical();
        res.render('admin/StatisticalPage',{
          list: temp,
          empty: temp === null
        });
      })
  
      router.get('/admin_manage', Adminauth,async function (req, res) {
        const temp = await adminModel.getAdmin();
          res.render('admin/admin_manage',{
            list: temp,
            empty: temp === null
          });
        })
        router.post('/admin_manage/delete', async function (req, res) {
          })
  


    router.get('/teacher_manage',Adminauth, async function (req, res) {
      const temp = await adminModel.getRegisterTeacher();
        res.render('admin/TeacherManage',{
          list: temp,
          empty: temp === null
        });
      })
      router.post('/teacher_manage/accept', async function (req, res) {
        const idGiangVienTam = req.body.idGiangVienTam
        adminModel.acceptRequest(idGiangVienTam)
        console.log(idGiangVienTam)
        res.redirect(req.headers.referer);
      })
    
      router.post('/teacher_manage/delete', async function (req, res) {
        const idGiangVienTam = req.body.idGiangVienTam
        adminModel.deleteRequest(idGiangVienTam)
        console.log(idGiangVienTam)
        res.redirect(req.headers.referer);
      })
    

      router.get('/edit_course',Adminauth, async function (req, res) {
        const temp = await adminModel.getTeacher();
          res.render('admin/edit_course',{
            list: temp,
            empty: temp === null
          });
        })

    router.get('/add_course',Adminauth, async function (req, res) {
      const temp = await adminModel.getAllTeacher();
      const cat = await adminModel.getAllCategory();
        res.render('admin/add_course',{
          CatList: cat,
          TeaList: temp,
          empty: temp === null
        });
      })


    router.post('/add_course/add', async function(req, res) {
      await adminModel.addCourse(req.body.Name, req.body.CatOption, req.body.TeaOption, req.body.Des,req.body.Pic);
      res.render('./admin/add_course', {
        succ_message: "Thêm khóa học thành công!"
      });

  })

  router.post('/course_list/(:id)?', async function(req, res) {
    const temp = await adminModel.getAllChapter(req.body.IdKhoaHoc)
    res.render('./admin/add_lesson', {
      IdKhoaHoc: req.body.IdKhoaHoc,
      ChapList: temp,
    });
  })

  router.post('/course_list/(:id)?/add', async function(req, res) {
    await adminModel.addLesson(req.params.id,req.body.Name, req.body.Des,req.body.ChapOption)
    res.render('./admin/course_list', {
      succ_message: "Thêm bài học thành công!"
    });
  })      

    module.exports = router
