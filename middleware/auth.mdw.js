module.exports = function auth(req, res, next) {
    if (req.session.accounttype=== false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/login');
    }
  
    next();
  }