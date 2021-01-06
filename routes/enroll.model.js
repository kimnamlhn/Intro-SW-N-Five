const db = require('../utils/db');
const { singleByidTaiKhoan } = require('./student.model');
const TBL_USERS = 'hocvien_dangky_khoahoc';
module.exports = {

   
    add(entity) {
    return db.add(entity, TBL_USERS)
    },
   
    
}


