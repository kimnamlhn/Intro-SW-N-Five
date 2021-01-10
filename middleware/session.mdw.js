var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'mycourse'
};

var sessionStore = new MySQLStore(options);

module.exports = function(app) {
    app.use(session({
        secret: 'Its a secret',
        resave: false,
        store: sessionStore,
        saveUninitialized: true,
        cookie: { secure: false },
        charset: 'utf8',
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }));

}