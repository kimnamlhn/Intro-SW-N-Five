module.exports = function (app) {
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
}