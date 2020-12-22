const express = require('express');
const courseModel = require('../models/courses.model');
const router = express.Router();
router.get('/', async function (req, res) {
    try {
      const list = await courseModel.all();
      res.render('guest/courses', {
        mycourses: list,
        empty: list.length === 0
      });
    } catch (err) {
      console.error(err);
      res.send('View error log at server console.');
    }
  
  
  })
  
  module.exports = router;





