const exphbs  = require('express-handlebars');
const numeral = require('numeral');
var hbs_sections = require('express-handlebars-sections');
module.exports = function (app) {
    app.engine('hbs', exphbs({
        defaultLayout: 'main.hbs',
        extname: '.hbs',
        layoutsDir: 'views/_layouts',
        partialsDir: 'views/_partials',
        helpers: {
            section: hbs_sections(),
            format(val) {
              return numeral(val).format('0,0');
            },
    
          },
        
    }));
    app.set('view engine', 'hbs');
}
