const express = require('express');
const detailModel = require('../models/home.model');
const router = express.Router();
const nodemailer =  require('nodemailer');

router.post('/', async function(req, res) {
    var transporter =  nodemailer.createTransport({ 
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nfiveadgroup2020@gmail.com', 
            pass: 'nfiveadmingroup.2020' 
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #bc0e28">Xin chào, chúng tôi là N-five!</h4>
                <span style="color: black">Từ nay bạn sẽ được cập nhật những khóa học mới nhất.</span>
                <h5 style="color: black">Cảm ơn bạn đã đăng ký nhận tin.</h5>
            </div>
        </div>
    `;
    var mainOptions = { 
        from: 'N-Five',
        to: req.body.mail,
        subject: 'N-Five Admin Group',
        text: '',
        html: content 
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.render('home', {
                mess: "Đăng ký nhận tin thất bại!"
            });
        } else {
            console.log('Message sent: ' +  info.response);
            res.render('home', {
                mess: "Đăng ký nhận tin thành công!"
            });
            }
    });
});
module.exports = router;