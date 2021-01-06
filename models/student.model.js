const db = require('../utils/db');
const TBL_USERS = 'hocvien';
module.exports = {

    all() {
        return db.load(`select * from ${TBL_USERS}`);
      },
    
    async single(id) {
    const rows = await db.load(`select * from ${TBL_USERS} where idHocVien = ${id}`);
    if (rows.length === 0)
        return null;

    return rows[0];
    },
    async singleByidTaiKhoan(idTaiKhoan) {
        const rows = await db.load(`select *, TIMESTAMPDIFF(year,NgaySinh, now() )  as Tuoi from ${TBL_USERS} where TaiKhoan_idTaiKhoan = '${idTaiKhoan}'`);
        if (rows.length === 0)
          return null;
    
        return rows[0];
      },
    add(entity) {
    return db.add(entity, TBL_USERS)
    },
    update(newName, idHocVien, attribute) {
        const sql = `
        update ${TBL_USERS} set ${attribute} = '${newName}' where idHocVien = ${idHocVien}
        `;
        return db.load(sql);
      },
    async singleByEmail(Email){
      const sql = `
      select * from hocvien
      where Email ='${Email}'
      `;
      return db.load(sql);
    },
    addHocVien(Email,idTaiKhoan,TenHocVien){
      const sql = `insert into HocVien values(NULL,'${TenHocVien}',NULL,'${Email}',${idTaiKhoan});`;
      return db.load(sql);
  },

    
}


