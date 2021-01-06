const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/', async function(req, res) {

    const ret = await categoryModel.all();

    res.render('./vwCategories/index', {
        categories: ret
    });
})
router.get('/add', function(req, res) {
    res.render('./vwCategories/add')
})
router.post('/add', async function(req, res) {
    const entity = {
        NameID: req.body.txtNameID
    }
    const ret = await categoryModel.add(entity);
    res.render('./vwcategories/add');
})
module.exports = router;