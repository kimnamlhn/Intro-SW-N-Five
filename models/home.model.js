const db = require('../utils/db');

module.exports = {

    async LinhVucCap2() {
        const rows = await db.load(`select *
        from LinhVucCap2`);
        if (rows.length === 0)
            return null;
        return rows;
        },
    async CoursesByLinhVuc(idLinhVucCap2) {
        const rows = await db.load(`select *,DATE_FORMAT(NgayCapNhat, "%M %d %Y") as NgayCapNhat from khoahoc where LinhVuc = ${idLinhVucCap2}`);
        if (rows.length === 0)
            return null;
        return rows;
        },    

    
}
