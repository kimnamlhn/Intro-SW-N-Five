const db = require('../utils/db');
module.exports={
    courseAuth(idHocVien,idKhoaHoc){
        const check = db.load(`select *
        from hocvien h, hocvien_dangky_khoahoc k
        where k.HocVien_idHocVien = h.idHocVien and h.idHocVien = ${idHocVien} and k.KhoaHoc_idKhoaHoc = ${idKhoaHoc}`);
        if(check === null) return false;
        return true;
    },

    async checkTeacher(TenTaiKhoan) {
        const rows = await db.load(`select *, cast(t.MatKhau as char) AS MatKhau 
        from giangvien g, taikhoan t
        where t.TenTaiKhoan = '${TenTaiKhoan}' and g.TaiKhoan_idTaiKhoan = t.idTaiKhoan`);
        if (rows.length === 0)
            return null;
        return rows[0];
        },
    async checkAdmin(TenTaiKhoan) {
        const rows = await db.load(`select *,cast(MatKhau as char) AS MatKhau from taikhoan where TenTaiKhoan = '${TenTaiKhoan}' and LoaiTaiKhoan = 0`);
        if (rows.length === 0)
            return null;
        return rows[0];
        },


}