const db = require('../utils/db');
module.exports = {
    async SoVideoDaHoc(idHocVien,idKhoaHoc){
        return db.load(`select count(*) as SoVideoDaHoc
        from hocvien_dahoc_video h, baihoc b, chuongkhoahoc c, video v
        where c.KhoaHoc_IdKhoaHoc = ${idKhoaHoc} and b.ChuongKhoaHoc_idChuongKhoaHoc = c.idChuongKhoaHoc and h.HocVien_idHocVien = ${idHocVien} and h.Video_idVideo = v.idVideo and v.BaiHoc_idBaiHoc = b.idBaiHoc`);
    },
    
    async SoVideoKhoaHoc(idKhoaHoc){
        return db.load(`select count(*) as SoVideoKhoaHoc
        from baihoc b, chuongkhoahoc c, video v
        where c.KhoaHoc_IdKhoaHoc = ${idKhoaHoc} and b.ChuongKhoaHoc_idChuongKhoaHoc = c.idChuongKhoaHoc and v.BaiHoc_idBaiHoc = b.idBaiHoc`);
    },
    async myCourses(idHocVien) {
        const rows = await db.load(`select k.*, g.TenGiangVien
        from khoahoc k, hocvien_dangky_khoahoc h, giangvien g 
        where h.KhoaHoc_IdKhoaHoc = k.IdKhoaHoc and h.HocVien_idHocVien = ${idHocVien} and k.NguoiDay = g.idGiangVien`);
        if (rows.length === 0)
            return null;
        return rows;
        },
    async buyCourse(entity) {
        return db.add(entity, 'hocvien_dangky_khoahoc')
        },
    
}

