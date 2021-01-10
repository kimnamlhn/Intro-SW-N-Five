module.exports = function auth(req, res, next) {
    console.log(Admintype)
    if (req.session.Admintype == false) {

      req.session.retUrl = req.originalUrl;
      return res.redirect('/login');
    }
  
    next();
  }
 