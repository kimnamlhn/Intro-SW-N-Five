const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
var express_hbs = require('express-handlebars-sections');
//require('express-async-errors'); // giúp awwait lỗi bên trong của promise (không cần try catch)

const app = express();
app.use(express.static(path.join(__dirname, './resources')));
app.use('/resources', express.static('resources'));
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials',
    helpers: {
        section: express_hbs(),
<<<<<<< Updated upstream

    }
}));

app.use(express.urlencoded({
    extended: true
=======
    }
>>>>>>> Stashed changes
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('home');
});
app.get('/courses', function(req, res) {
    res.render('guest/courses');
});

app.get('/cart', function(req, res) {
    res.render('guest/cart');
});
app.get('/search-result', function(req, res) {
    res.render('guest/search-result');
});

app.get('/general-intro', function(req, res) {
    res.render('guest/gioi_thieu_chung',{
        layout: 'gioi_thieu_chung'
    });
});

app.get('/support', function(req, res) {
    res.render('guest/ho_tro',{
        layout: 'ho_tro'
    });
});

//End Guest
//User

app.get('/user/view-video', function(req, res) {
    res.render('user/view-video', {
        layout: false
    });
});

app.get('/user/outcomes', function(req, res) {
    res.render('user/kq_hoc_tap', {
        layout: 'user_layout'
    });
});


app.use('/register', require('./routes/account/register-teacher.route'));
<<<<<<< Updated upstream
app.use('/login', require('./routes/account/login_teacher.route'));
app.use('/', require('./routes/teacher.route'));
app.use('/admin/categories', require('./routes/categories.route'));
app.use('/admin', require('./routes/admin.route'));
=======


//Admin
app.get('/admin/add-admin', function(req, res) {
    res.render('admin/add_admin', {
        layout: 'admin_layout'
    });
});

app.get('/admin/manage', function(req, res) {
    res.render('admin/quan_ly_admin', {
        layout: 'admin_layout'
    });
});


>>>>>>> Stashed changes





app.use(function(req, res) {
    res.render('404', {
        layout: false
    })

});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.render('500', {
        layout: false
    })
})

const PORT = 3000;
app.listen(PORT, _ => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});