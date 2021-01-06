module.exports = function (app) {
    app.use('/', require('../routes/home.route'));

    app.use('/courses', require('../routes/courses.route'));
    app.get('/search-result', function (req, res) {    
        res.render('guest/search-result');
    });
    app.use('/detail-course', require('../routes/detailCourse.route'));
    app.use('/login', require('../routes/login.route'));
    

    app.use('/register', require('../routes/register.route'));
    app.use('/cart', require('../routes/cart.route'));
    app.use('/user/profile', require('../routes/user.route'));
    app.use('/user/my-courses', require('../routes/mycourses.route'));
    app.get('/user/view-video', function (req, res) {    
        res.render('user/view-video',{
            layout:false
        });
    });
  
  
}
