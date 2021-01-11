module.exports = function auth(req, res, next) {
    if (req.session.Teachertype == false) {

      req.session.retUrl = req.originalUrl;
      return res.redirect('/login');
    }
  
    next();
  }
 