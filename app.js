const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
//require('express-async-errors'); // giúp awwait lỗi bên trong của promise (không cần try catch)

const app = express();
app.use(express.static(path.join(__dirname, './resources')));
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials',
}));
app.set('view engine', 'hbs');
 
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/courses', function (req, res) {    
    res.render('guest/courses');
});

app.get('/cart', function (req, res) {    
    res.render('guest/cart');
});
app.get('/search-result', function (req, res) {    
    res.render('guest/search-result');
});

//End Guest
//User

app.get('/user/view-video', function (req, res) {    
    res.render('user/view-video',{
        layout:false
    });
});


app.use(function(req, res) {
res.render('404', {
    layout: false
})

});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.render('500', {
      layout: false
    })
  })

const PORT = 3000;
app.listen(PORT, _=> {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
