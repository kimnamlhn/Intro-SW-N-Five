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
    async getStatistical() {
        // const rows = await db.load(`select * 
        // from GiangVien h, khoahoc kh
        // where  h.idGiangVien = kh.NguoiDay`);
        // if (rows.length === 0)
        //     return null;
    
        // return rows;
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
    // delCourse(idKhoaHoc) {
    //     return db.load(`DELETE FROM khoahoc, GiangVien
    //     USING khoahoc JOIN GiangVien
    //     WHERE GiangVien.idGiangVien = khoahoc.NguoiDay and IdKhoaHoc = ${idKhoaHoc}  `)  
    //    },
    delCourse(idKhoaHoc) {
        this.setNonFreignKeyCheck();
        //console.log(idKhoaHoc);
        return db.load(`delete from khoahoc where IdKhoaHoc = ${idKhoaHoc}`)  
       },
    

       setNonFreignKeyCheck(){
            return db.load(`SET FOREIGN_KEY_CHECKS = 0;`)

       },

        async getRegisterTeacher() {
        const rows = await db.load(`select * from GiangVienTam`);
        if (rows.length === 0)
            return null;

        return rows;
    },

     acceptRequest(idGiangVienTam) {
        return db.load(`update GiangVienTam set TrangThai = 1 where idGiangVienTam = ${idGiangVienTam} `); 
    },
 
     deleteRequest(idGiangVienTam) {
         return db.load(`delete from GiangVienTam where idGiangVienTam = ${idGiangVienTam} `);    
        },

    addCourse(TenKhoaHoc,LinhVuc,GiangVien,MoTa,HinhDaiDien){
        return db.load(`insert into KhoaHoc value (NULL,NULL,'${TenKhoaHoc}','${MoTa}',null,0,0,DATE_FORMAT(now(), "%m/%d/%y"),0,'${HinhDaiDien}',null,${GiangVien},${GiangVien},${LinhVuc})`);
    },

    async getAdmin() {
        const rows = await db.load(`select * 
        from TaiKhoan
        where  LoaiTaiKhoan = 0`);
        if (rows.length === 0)
            return null;
    
        return rows;
    },

    async getAllTeacher() {
        const rows = await db.load(`select * 
        from GiangVien`);
        if (rows.length === 0)
            return null;
        return rows;
    },

    async getAllCategory() {
        const rows = await db.load(`select * 
        from linhvuccap2`);
        if (rows.length === 0)
            return null;
        return rows;
    },


    async getAllChapter(idKhoaHoc) {
        const rows = await db.load(`select * 
        from KhoaHoc where idKhoaHoc = ${idKhoaHoc}`);
        if (rows.length === 0)
            return null;
        return rows;
    },

    addLesson(idKhoaHoc,TenBaiHoc,MoTa,idChuong){
        //Khoa hoc chua co chuong
        if(idChuong==''){
            db.load(`insert into ChuongKhoaHoc value (null,'Chuong 1',${idKhoaHoc})`);
            idChuong = 1;
        }
        console.log(idChuong);

        return db.load(`insert into BaiHoc value (null,'${TenBaiHoc}','${MoTa}',${idChuong})`);
    }

}