const express = require('express');
const accountModel = require('../models/account.model');
const router = express.Router();
const crypt=require('bcryptjs')
router.get('/admin', function (req, res) {
    if(req.session.adminAuth === false)
    {
        res.render('admin/login');
    }
    else
    {
        req.render('admin/dashboard')
    }
});
router.get('/admin/dashboard', function (req, res) {
    if(req.session.adminAuth === false)
    {
        res.render('admin/login');
    }
    else
    {
        req.render('admin/dashboard')
    }
});
router.post('/login',async function(req,res)
{
    console.log(req.body.data);
    var obj=JSON.parse(req.data);
    if (req.session.userAuth || req.session.adminAuth || req.session.teacherAuth)
    {
        return 'Logon';
    }
    if (accountModel.accountExistence(obj.username)==null)
    {
        return 'AccountNotExisting';
    }
    else
    {
        var row=accountModel.getPassword(obj.password);
        if(crypt.compare(obj.data.password,row.matkhau))
        {
            if(number(row.loaitaikhoan)===0)
            {
                req.session.adminAuth=true;
            }
            if(number(row.loaitaikhoan)===1)
            {
                req.session.userAuth=true;
            }
            if(number(row.loaitaikhoan)===2)
            {
                req.session.teacherAuth=true;
            }
            req.session.guestAuth=false;
            res.render('home')
        }
        else
        {
            return 'Failed';
        }
    }
});
router.get('/login',function(req,res)
{
    if(req.session.adminAuth)
    {
        res.render('/admin/dashboard');
    }
    else
    {
        res.render('admin/login');
    }
});
module.exports = router;