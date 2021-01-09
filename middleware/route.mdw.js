module.exports = function(app) {
    app.use('/', require('../routes/home.route'));

    app.use('/courses', require('../routes/courses.route'));
    app.use('/search/course', require('../routes/search.route'));

    app.use('/detail-course', require('../routes/detailCourse.route'));
    app.use('/login', require('../routes/login.route'));


    app.use('/register', require('../routes/register.route'));
    app.use('/cart', require('../routes/cart.route'));
    app.use('/user/profile', require('../routes/user.route'));
    app.use('/user/my-courses', require('../routes/mycourses.route'));
    app.use('/user/view-video', require('../routes/view-video.route'));
    app.use('/register/teacher', require('../routes/register-teacher.route'));
    app.use('/admin', require('../routes/admin.route'));
    app.use('/',require('../routes/teacher.route'));

}