const db = require('../utils/db');

module.exports = {

    all(searchText) {
    const sql = `SELECT k.*, g.TenGiangVien,  l.TenLinhVuc as ChuDe, COUNT(*) OVER() as  SoKhoaHoc
    FROM KhoaHoc k, GiangVien g, LinhVucCap2 l
    WHERE g.idGiangVien = k.NguoiDay and k.LinhVuc = l.idLinhVucCap2 and MATCH(TenKhoaHoc) AGAINST('${searchText}' IN NATURAL LANGUAGE MODE) `;
    return db.load(sql);
    },
    descView(searchText){
        const sql = `SELECT k.*, g.TenGiangVien,  l.TenLinhVuc as ChuDe, COUNT(*) OVER() as  SoKhoaHoc
        FROM KhoaHoc k, GiangVien g, LinhVucCap2 l
        WHERE g.idGiangVien = k.NguoiDay and k.LinhVuc = l.idLinhVucCap2 and MATCH(TenKhoaHoc) AGAINST('${searchText}' IN NATURAL LANGUAGE MODE)
        ORDER BY SoLuongHVDangKy DESC  `;
        return db.load(sql);
    },
    descRating(searchText){
        const sql = `SELECT k.*, g.TenGiangVien,  l.TenLinhVuc as ChuDe, COUNT(*) OVER() as  SoKhoaHoc
        FROM KhoaHoc k, GiangVien g, LinhVucCap2 l
        WHERE g.idGiangVien = k.NguoiDay and k.LinhVuc = l.idLinhVucCap2 and MATCH(TenKhoaHoc) AGAINST('${searchText}' IN NATURAL LANGUAGE MODE)
        ORDER BY DiemDanhGia DESC `;
        return db.load(sql);
    }
   
}

