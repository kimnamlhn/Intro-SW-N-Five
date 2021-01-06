const db = require('../utils/db');
module.exports={
    async courseAuth(idHocVien,idKhoaHoc){
        const check = await db.load(`select *
        from hocvien h, hocvien_dangky_khoahoc k
        where k.HocVien_idHocVien = h.idHocVien and h.idHocVien = ${idHocVien} and k.KhoaHoc_idKhoaHoc = ${idKhoaHoc}`);
        if(check.length === 0) return true;
        return false;
    }
}