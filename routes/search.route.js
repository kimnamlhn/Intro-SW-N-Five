const express = require('express');
const courseModel = require('../models/courses.model');
const searchModel = require('../models/search.model');
const router = express.Router();
//Đi đến trang khóa học
router.get('/', async function (req, res) {
    try {
      var result;
      var option=null; 
      const search = req.query['search-text']
      if(req.query.option===undefined){
        result = await searchModel.all(search)
      }
      else if(req.query.option === 'Số lượt đăng ký giảm dần'){
        option=[{option:'Số lượt đăng ký giảm dần',default:true},{option:'Điểm đánh giá giảm dần',default:false}]
        result = await searchModel.descView(search)
      }
      else{
        option=[{option:'Số lượt đăng ký giảm dần',default:false},{option:'Điểm đánh giá giảm dần',default:true}]
        result = await searchModel.descRating(search)
      }
      console.log(req.query)
      console.log(option)
      res.render('guest/search-result', {
        result: result,
        numCourses: result === null? 0:result.length,
        searchText: search,
        option:option
      });
    } catch (err) {
      console.error(err);
      res.send('View error log at server console.');
    }
  
  })
 
  module.exports = router;





