module.exports = function loginAuth(req, res, next) {
    if (req.session.accounttype=== true) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/');
    }
  
    next();
  }