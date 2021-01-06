const db = require('../utils/db');

module.exports = {

    //detaiCourse
    async detailCourse(idKhoaHoc) {
    const rows = await db.load(`select *, DATE_FORMAT(k.NgayCapNhat, "%M %d %Y") as LastUpdate, DATE_FORMAT(g.NgaySinh, "%M %d %Y") as NgSinh
    from khoahoc k, giangvien g
    where k.NguoiDay = g.idGiangVien and k.IdKhoaHoc =  ${idKhoaHoc}`);
    if (rows.length === 0)
        return null;
    return rows[0];
    },
    async getFeedBack(idKhoaHoc) {
        const rows = await db.load(`select h.TenHocVien, d.Diem, d.NhanXet, k.SoLuongHVDanhGia, k.TenKhoaHoc, DATE_FORMAT(d.NgayDanhGia, "%M %d %Y") as NgayDanhGia
        from khoahoc k, hocvien h, hocvien_danhgia_khoahoc d
        where k.IdKhoaHoc = d.Khoahoc_IdKhoaHoc and h.idHocVien = d.HocVien_idHocVien and k.IdKhoaHoc = ${idKhoaHoc}`);
        if (rows.length === 0)
            return null;
        return rows;
        },
    async relatedCourse(idKhoaHoc) {
        const rows = await db.load(`SELECT *, DATE_FORMAT(k.NgayCapNhat, "%M %d %Y") as LastUpdate
        FROM giangvien g, khoahoc k, linhvuccap2 l
        where k.NguoiDay = g.idGiangVien and l.idLinhVucCap2 = k.LinhVuc  and k.LinhVuc = (select LinhVuc from khoahoc k1, linhvuccap2 l1 where k1.LinhVuc = l1.idLinhVucCap2 and k1.IdKhoaHoc = ${idKhoaHoc} and k1.IdKhoaHoc != k.IdKhoaHoc)
        ORDER BY k.SoLuongHVDangKy DESC
        LIMIT 5`);
        if (rows.length === 0)
            return null;
        return rows;
        },
    async teacherinfo(idKhoaHoc) {
        const rows = await db.load(`select *, count(g.idGiangVien) as SoKhoaHoc
        from giangvien g, khoahoc k
        where g.idGiangVien = k.NguoiDay and g.idGiangVien = (select idGiangVien from giangvien, khoahoc where idGiangVien = NguoiDay and IdKhoaHoc = ${idKhoaHoc})`);
        if (rows.length === 0)
            return null;
        return rows;
        },
    async addComment(comment) {
        return db.add(comment, 'hocvien_danhgia_khoahoc')
        },
    async listOfChapter(idKhoaHoc) {
        const rows = await db.load(`select c.idChuongKhoaHoc, c.TenChuong
        from khoahoc k, chuongkhoahoc c
        where k.IdKhoaHoc = c.KhoaHoc_IdKhoaHoc and k.IdKhoaHoc = ${idKhoaHoc}`);
        if (rows.length === 0)
            return null;
        return rows;
        },
    async listOfLesson(idChuong) {
        const rows = await db.load(`select b.*
        from baihoc b,  chuongkhoahoc c
        where b.ChuongKhoaHoc_idChuongKhoaHoc = c.idChuongKhoaHoc  and b.ChuongKhoaHoc_idChuongKhoaHoc = ${idChuong}`);
        if (rows.length === 0)
            return null;
        return rows;
        },

    
}

