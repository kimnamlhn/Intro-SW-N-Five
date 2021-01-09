const db = require('../utils/db');
const coures = require('../models/courses.model');
const TBL_TEACHER = 'GiangVien';
module.exports = {
    all() {
        return db.load(`select * from ${TBL_TEACHER}`);
    },
    add(entity) {
        return db.add(entity, TBL_TEACHER);
    },
    single: function(id) {
        return db.load(`select * from ${TBL_TEACHER} where id = ${id} `)
    },
    patch: function(entity) {
        const condition = {
            id: entity.id
        }
        return db.patch(TBL_TEACHER, entity, condition);
    },
    del: function(id) {
        var condition = {
            id: id
        }
        return db.del(TBL_TEACHER, condition);
    },


    register(TenGiangVien, NgaySinh, MoTa, Email){
        return db.load(`insert into GiangVienTam value (null, "${TenGiangVien}", null, "${MoTa}", null, "${Email}",0) `);    
    }
};