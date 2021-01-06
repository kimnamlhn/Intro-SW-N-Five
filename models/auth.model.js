const db = require('../utils/db');
module.exports={
    courseAuth(idHocVien,idKhoaHoc){
        const check = db.load(`select *
        from hocvien h, hocvien_mua_khoahoc k
        where k.HocVien_idHocVien = h.idHocVien and h.idHocVien = ${idHocVien} and k.KhoaHoc_idKhoaHoc = ${idKhoaHoc}`);
        if(check === null) return false;
        return true;
    }
}