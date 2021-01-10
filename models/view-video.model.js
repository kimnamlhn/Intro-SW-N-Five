const db = require('../utils/db');

module.exports = {
    //Kiểm tra xem học viên đã mua khóa học chưa
    async checkBuyCourse(idKhoaHoc,idHocVien) {
    const rows = await db.load(`select *
    from hocvien_mua_khoahoc where HocVien_idHocVien = ${idHocVien} and KhoaHoc_IdKhoaHoc = ${idKhoaHoc}`);
    if (rows.length === 0)
        return false;
    return true;
    },
    //Lấy idVideo đầu tiên của khóa học
    async getFirstVideo(idKhoaHoc) {
        const rows = await db.load(`select v.*
        from khoahoc k, chuongkhoahoc c, baihoc b, video v
        where k.IdKhoaHoc = c.KhoaHoc_IdKhoaHoc and b.ChuongKhoaHoc_idChuongKhoaHoc = c.idChuongKhoaHoc and v.BaiHoc_idBaiHoc = b.idBaiHoc and k.IdKhoaHoc = ${idKhoaHoc}
        order by v.idVideo
        limit 1`);
        if (rows.length === 0)
            return null
        return rows[0];
        },
    async single(idVideo) {
        const rows = await db.load(`select * from video where idVideo = ${idVideo}`);
        if (rows.length === 0)
            return null
        return rows[0];
        },

    async videoByLesson(idBaiHoc) {
        const rows = await db.load(`select * 
        from video v, baihoc b
        where v.BaiHoc_idBaiHoc = b.idBaiHoc and b.idBaiHoc =${idBaiHoc}`);
        if (rows.length === 0)
            return null
        return rows[0];
        },
        //So video cua 1 chuong
    async numVideoOfChapter(idChuongKhoaHoc) {
        const rows = await db.load(`select count(*) as SoVideoCuaChuong
        from video v, baihoc b
        where b.idBaiHoc = v.BaiHoc_idBaiHoc and b.ChuongKhoaHoc_idChuongKhoaHoc = ${idChuongKhoaHoc}`);
        if (rows.length === 0)
            return null
        return rows[0];
        },
        //So video cua chuong ma hoc vien da hoc
    async numVideoStudied(idChuongKhoaHoc, idHocVien) {
        const rows = await db.load(`select count(*) as SoVideoDaXemCuaChuong
        from video v, baihoc b, hocvien_dahoc_video h
        where b.idBaiHoc = v.BaiHoc_idBaiHoc and b.ChuongKhoaHoc_idChuongKhoaHoc = ${idChuongKhoaHoc} and h.HocVien_idHocVien = ${idHocVien}
        and h.Video_idVideo = v.idVideo`);
        if (rows.length === 0)
            return null
        return rows[0];
        },
    async addViewed(idHocVien,idVideo) {
        return db.load(`insert into hocvien_dahoc_video values(${idHocVien},${idVideo});`)
        },
    async removeViewed(idHocVien,idVideo) {
        return db.load(`delete from hocvien_dahoc_video where HocVien_idHocVien = ${idHocVien} and Video_idVideo = ${idVideo}`)
        },
    async CourseByVideo(idVideo) {
        const rows = await db.load(`select k.IdKhoaHoc
        from khoahoc k, chuongkhoahoc c, baihoc b, video v
        where k.IdKhoaHoc = c.KhoaHoc_IdKhoaHoc and b.ChuongKhoaHoc_idChuongKhoaHoc = c.idChuongKhoaHoc and v.BaiHoc_idBaiHoc = b.idBaiHoc and v.idVideo = ${idVideo}`);
        if (rows.length === 0)
            return null
        return rows[0];
        },
    async checkViewed(idVideo,idHocVien) {
        const rows = await db.load(`select * from hocvien_dahoc_video where HocVien_idHocVien = ${idHocVien} and Video_idVideo = ${idVideo}`);
        if (rows.length === 0)
            return false;
        return true;
        },
    
    



        
    
    
    
}

