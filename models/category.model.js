const express = require('express');
const db = require('../utils/db')
const TBL_category = 'category'
module.exports = {
    all() {
        return db.load('select * from category');
    },
    add(entity) {
        return db.add(TBL_category, entity);
    }

}