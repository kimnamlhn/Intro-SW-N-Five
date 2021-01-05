const db = require('../utils/db');
const TBL_TEACHER = 'teacher';
module.exports = {
    all() {
        return db.load(`select * from ${TBL_TEACHER}`);
    },
    add(entity) {
        return db.add(TBL_TEACHER, entity);
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
    }
};