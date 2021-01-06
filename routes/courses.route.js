const express = require('express');
const courseModel = require('../models/courses.model');
const router = express.Router();
//Đi đến trang khóa học
router.get('/:id', async function (req, res) {
    try {
      const coId = req.params.id;
     // const list = await courseModel.infoCourses();
      const list = await courseModel.courseByCateg(coId)
     const categ = await courseModel.allWithDetails()
     // console.log(res.locals.lcCategories)
      res.render('guest/courses', {
        mycourses: list,
        empty: list === null,
        categ: categ,
        numOfCateg: categ === null
      });
    } catch (err) {
      console.error(err);
      res.send('View error log at server console.');
    }
  
  })
  //Đi đến trang khóa học chi tiết
 
  module.exports = router;





