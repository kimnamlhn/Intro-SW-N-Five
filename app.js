const express = require('express');
const exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');

const app = express();
app.use('/', express.static('/public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    helpers: {
        section: function(name, options) {
            if (!this._sections) { this._sections = {} };
            this._sections[name] = options.fn(this);
            return null;
        }
    },
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('home');
});


app.use('/account', require('./controllers/account.controllers'));



const PORT = 3000;
app.listen(PORT, _ => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});