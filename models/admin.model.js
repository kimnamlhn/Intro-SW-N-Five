const db = require('../utils/db');
module.exports = {

    async single() {
    const rows = await db.load(`select * 
    from hocvien h, hocvien_dangky_khoahoc k, khoahoc kh
    where k.HocVien_idHocVien = h.idHocVien and  k.KhoaHoc_IdKhoaHoc = kh.IdKhoaHoc  and k.TrangThai = 0`);
    if (rows.length === 0)
        return null;

    return rows;
    },


    changeState(idHocVien, idKhoaHoc) {
       return db.load(`update hocvien_dangky_khoahoc set TrangThai = 1 where KhoaHoc_IdKhoaHoc = ${idKhoaHoc}  and HocVien_idHocVien =${idHocVien} `);    
      },
}

