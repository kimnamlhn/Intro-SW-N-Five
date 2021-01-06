const db = require('../utils/db');
module.exports={
    accountExistence(account){
        return db.load(`select tk.loaitaikhoan from taikhoan tk where tk.tentaikhoan= ${account}`);
    },
    getPassword(account){
        return db.load(`select tk.matkhau,tk.loaitaikhoan from taikhoan tk where tk.tentaikhoan= ${account}`);
    }
}