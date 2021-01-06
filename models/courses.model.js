const db = require('../utils/db');

module.exports = {
    all(){
        return db.load('select * from KhoaHoc');
    },
    infoCourses() {
        const sql = `
        select k.*, g.TenGiangVien
        from giangvien g, khoahoc k
        where g.idGiangVien = k.NguoiDay
        `;
        return db.load(sql);
      },
    allWithDetails() {
    const sql = `select lv1.idLinhVuc, lv1.TenLinhVuc, count(lv1.idLinhVuc) as soLV
    from linhvuccap1 lv1, linhvuccap2 lv2
    where lv1.idLinhVuc = lv2.LinhVucCap1_idLinhVuc
    group by lv1.idLinhVuc, lv1.TenLinhVuc`;
    return db.load(sql);
    },
    async detailCateg(idLinhVucCap2) {
        const rows = await db.load(`select lv2.idLinhVucCap2, lv2.TenLinhVuc as TenLinhVucCap2
        from  linhvuccap2 lv2
        where lv2.LinhVucCap1_idLinhVuc = ${idLinhVucCap2}`);
        if (rows.length === 0)
          return null;
    
        return rows;
      },
    async courseByCateg(idLinhVucCap2) {
    const rows = await db.load(`select k.*, g.TenGiangVien, l.TenLinhVuc as ChuDe, COUNT(*) OVER() as  SoKhoaHoc
    from khoahoc k, giangvien g, linhvuccap2 l
    where g.idGiangVien = k.NguoiDay and k.LinhVuc = ${idLinhVucCap2} and l.idLinhVucCap2 = k.LinhVuc 
    group by k.IdKhoaHoc`);
    if (rows.length === 0)
        return null;
    return rows;
    },
    async numOfCourses(idLinhVucCap2) {
      const rows = await db.load(`select count(*) as SoLuongKhoaHoc
      from khoahoc k
      where k.LinhVuc =  ${idLinhVucCap2}`);
      if (rows.length === 0)
          return null;
      return rows;
      }
   
    
}

