const express = require('express');
const auth = require('../middleware/auth.mdw');
const router = express.Router();
const mCourseModel = require('../models/mycourses.model')
const vViewVideo = require('../models/view-video.model');
router.get('/', auth, async function (req, res) 
  {
    try {
      
        const id = res.locals.stuAccount.idHocVien
        const rows =  await mCourseModel.myCourses(id)
        //
        if (rows !== null){
            for (var i = 0;i<rows.length;i++){
              const fistIdVid = await vViewVideo.getFirstVideo(rows[i].IdKhoaHoc)
                var SoVideoDaHoc = JSON.parse(JSON.stringify(await mCourseModel.SoVideoDaHoc(id,rows[i].IdKhoaHoc)))
                var TongVideo = JSON.parse(JSON.stringify(await mCourseModel.SoVideoKhoaHoc(rows[i].IdKhoaHoc)))
                var progress = 0
            
                if (TongVideo[0].SoVideoKhoaHoc != 0 && SoVideoDaHoc[0].SoVideoKhoaHoc !=0){
                    progress = parseFloat(SoVideoDaHoc[0].SoVideoDaHoc)/parseFloat(TongVideo[0].SoVideoKhoaHoc)
                }
               rows[i].progress = Math.round(progress*100)
               
               rows[i].fistIdVid = fistIdVid ===null? null: fistIdVid.idVideo
              }
        }
      
        //
      res.render('user/mycourses', {
        myCourses: rows,
        empty: rows === null,
        nCourses: rows === null? 0:rows.length,
      });
    } catch (err) {
      console.error(err);
      res.send('View error log at server console.');
    }
  
  })


module.exports = router

