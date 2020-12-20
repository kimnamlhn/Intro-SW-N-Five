const db = require('./database/db')
const TBL_LOGIN = 'login';
module.exports = {
    add: function(entity) {
        return db.add(TBL_LOGIN, entity);
    }
}