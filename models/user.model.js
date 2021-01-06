const db = require('../utils/db');
const { singleByidTaiKhoan } = require('./student.model');
const TBL_USERS = 'TaiKhoan';
module.exports = {

    all() {
        return db.load(`select * from ${TBL_USERS}`);
      },
    
    async single(id) {
    const rows = await db.load(`select *,cast(MatKhau as char) AS MatKhau from ${TBL_USERS} where idTaiKhoan = ${id}`);
    if (rows.length === 0)
        return null;

    return rows[0];
    },
    async singleByUserName(username) {
        const rows = await db.load(`select *, cast(MatKhau as char) AS MatKhau from ${TBL_USERS} where TenTaiKhoan = '${username}'`);
        if (rows.length === 0)
          return null;
    
        return rows[0];
      },
    add(entity) {
    return db.add(entity, TBL_USERS)
    },
    lastId(){
        const sql = `select idTaiKhoan from TaiKhoan ORDER BY idTaiKhoan DESC LIMIT 1`;
        const lastid = db.load(sql);
        return lastid;
    },
    update(newVal, idTaiKhoan, attribute) {
      const sql = `
      update ${TBL_USERS} set ${attribute} = '${newVal}' where idTaiKhoan = ${idTaiKhoan}
      `;
      return db.load(sql);
    },
    async singleByidTaiKhoan(idTaiKhoan) {
      const rows = await db.load(`select *, cast(MatKhau as char) AS MatKhau from ${TBL_USERS} where idTaiKhoan = '${idTaiKhoan}'`);
      if (rows.length === 0)
        return null;
  
      return rows[0];
    },
    
}


