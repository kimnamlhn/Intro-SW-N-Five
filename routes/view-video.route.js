const express = require('express');
const vViewVideo = require('../models/view-video.model');
const router = express.Router();
const auth = require('../middleware/auth.mdw');
const detailModel = require('../models/detailCourse.model');
//Đi đến trang khóa học
router.get('/:id&:idCourse',auth, async function (req, res) {
    try {
      let id = parseInt(req.params.id)
      let IdKhoaHoc = parseInt(req.params.idCourse)
      const noVideo = (req.params.id === '')
      const detailCourse = await detailModel.detailCourse(IdKhoaHoc)
      const idVideo = (id !== ''? id:null)
      var video = null
      if(idVideo!== null){
        video = await vViewVideo.single(idVideo);
      }
      //Danh sach chuong
      const rows = await detailModel.listOfChapter(IdKhoaHoc);
      if (rows !== null){
         for (var i = 0;i<rows.length;i++){
           var lesson = await detailModel.listOfLesson(rows[i].idChuongKhoaHoc)
           const SoVideoCuaChuong = await vViewVideo.numVideoOfChapter(rows[i].idChuongKhoaHoc)
           const SoVideoDaHoc = await vViewVideo.numVideoStudied(rows[i].idChuongKhoaHoc,res.locals.stuAccount.idHocVien)
           rows[i].SoVideoCuaChuong = SoVideoCuaChuong.SoVideoCuaChuong
           rows[i].SoVideoDaHoc= SoVideoDaHoc.SoVideoDaXemCuaChuong
          for (var j=0;j<lesson.length;j++){
           
            const video = JSON.parse(JSON.stringify(await vViewVideo.videoByLesson(lesson[j].idBaiHoc)))
            var isActive = false
            if (video !== null && video.idVideo == id){
              isActive = true
            }
            //Kiểm tra xem học viên đã xem video chưa
            var temp = false
            if(video !==null){
              temp = await vViewVideo.checkViewed(video.idVideo,res.locals.stuAccount.idHocVien)}

           // console.log("Học viên học kh",temp)
            lesson[j].video = video
            lesson[j].isActive = isActive
            lesson[j].viewed = temp
          }
         
           var less = JSON.parse(JSON.stringify(lesson))
         rows[i].lessons = lesson
         }

      }
      
      //
      res.render('user/view-video', {
        idVideo: idVideo,
        empty: noVideo,
        detailCourse:detailCourse,
        video:video,
        listOfChapter: rows,
        });
      
         
    } catch (err) {
      console.error(err);
      res.send('View error log at server console.');
    }
  
  })
  router.post('/add-remove/:id', async function (req, res) {
    
    const idHocVien = res.locals.stuAccount.idHocVien
    const idVideo = parseInt(req.params.id)
    const check = await vViewVideo.checkViewed(idVideo,idHocVien);

    if(check === false){
      await vViewVideo.addViewed(idHocVien,idVideo)
    }
    else{
      await vViewVideo.removeViewed(idHocVien,idVideo)
    }
    res.redirect(req.headers.referer);
  })
  module.exports = router;


  






