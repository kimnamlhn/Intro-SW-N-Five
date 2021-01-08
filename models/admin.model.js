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
    async getTeacher() {
        const rows = await db.load(`select * 
        from GiangVien h, khoahoc kh
        where  h.idGiangVien = kh.NguoiDay`);
        if (rows.length === 0)
            return null;
    
        return rows;
    },

    changeState(idHocVien, idKhoaHoc) {
       return db.load(`update hocvien_dangky_khoahoc set TrangThai = 1 where KhoaHoc_IdKhoaHoc = ${idKhoaHoc}  and HocVien_idHocVien =${idHocVien} `);    
      },

    deleteCourse(idHocVien, idKhoaHoc) {
        return db.load(`delete from hocvien_dangky_khoahoc where KhoaHoc_IdKhoaHoc = ${idKhoaHoc}  and HocVien_idHocVien =${idHocVien} `);    
       },


    // acceptCourse(idKhoaHoc) {
    // return db.load(`update khoahoc set TrangThai = 1 where idKhoaHoc = ${idKhoaHoc}`);    
    // },
    // async delCourse(idKhoaHoc) {
    //     await db.load(`delete from video where baihoc_idbaihoc = ${idKhoaHoc}`);    
    //     await db.load(`delete from chuongkhoahoc where KhoaHoc_idKhoaHoc = ${idKhoaHoc}`);    
    //     await db.load(`delete from baihoc where chuongkhoahoc_idchuongkhoahoc = ${idKhoaHoc}`);    
    //     await db.load(`delete from khoahoc where idKhoaHoc = ${idKhoaHoc}`);    
    //    },

    async getRegisterTeacher() {
        const rows = await db.load(`select * 
        from Taikhoan_dangky_giangvien r, taikhoan t where t.idTaiKhoan = r.TaiKhoan_idTaiKhoan`);
        if (rows.length === 0)
            return null;
    
        return rows;
    },

     acceptRequest(TaiKhoan_idTaiKhoan) {
        return db.load(`update Taikhoan_dangky_giangvien set TrangThai = 1 where TaiKhoan_idTaiKhoan = ${TaiKhoan_idTaiKhoan } `);    
    },
 
     deleteRequest(TaiKhoan_idTaiKhoan) {
         return db.load(`delete from Taikhoan_dangky_giangvien where TaiKhoan_idTaiKhoan = ${TaiKhoan_idTaiKhoan} `);    
        },
 
}

                                         