const express = require('express');
const courseModel = require('../models/detailCourse.model');
const cartModel = require('../models/cart.model');
const coursesModel = require('../models/courses.model');
const router = express.Router();
const auth = require('../middleware/auth.mdw')
const courseAuth = require('../models/auth.model')
const mcoursesModel = require('../models/mycourses.model');


router.get('/', async function (req, res) {
    try {
        const courseList = [];
        var amount = 0;
        for (const course of req.session.cart) {
          const detCourse = await courseModel.detailCourse(course.id)
          amount+=detCourse.giaMoi;
          courseList.push({
            detCourse
          })
        }
      res.render('guest/cart', {
       cartList: courseList,
        empty: req.session.cart.length === 0,
        nCourse: courseList.length,
        total: amount

      });
    } catch (err) {
      console.error(err);
      res.send('View error log at server console.');
    }
  
  })

  router.post('/add', async function (req, res) {
    const id = req.body.IdKhoaHoc;   
   // console.log(req.body)
   //req.session.cart = []
    cartModel.add(req.session.cart,{id})
    res.redirect(req.headers.referer);
  })
  
  router.post('/remove', async function (req, res) {
    const id = req.body.IdKhoaHoc;   
    cartModel.del(req.session.cart,id)
    res.redirect(req.headers.referer);
  })

  router.post('/checkout',auth, async function (req, res) {
    const list = req.session.cart
    let idHocVien = res.locals.stuAccount.idHocVien
   for (var i = 0; i<list.length;i++){
      let obj = {
        KhoaHoc_IdKhoaHoc: parseInt(list[i].id),
        HocVien_idHocVien: idHocVien,
        NgayDangKy: new Date().toISOString().slice(0, 10)
      }
      let check = await courseAuth.courseAuth(idHocVien,parseInt(list[i].id))
      if (check == false){
      await mcoursesModel.buyCourse(obj)
      }
    } 
   req.session.cart = []
    res.redirect(req.headers.referer);
  })
  
module.exports = router
