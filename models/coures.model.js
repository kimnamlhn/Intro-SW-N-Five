const db = require('../utils/db');
const TBL_COURES = 'course';
module.exports = {
    all: function() {
        return db.load(`select * from ${TBL_COURES}`);
    }
}