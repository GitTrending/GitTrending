const passport = require('./passport.config.js');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// go to login page
const loginPage = (req, res) => {
  res.render('login');
}

// signin a user in 
const signInRedirect = (req, res) => {
  //res.json("you have successfully logged in!");
  res.redirect('/');
}

const logout = (req, res) => {
  req.logout();
  res.redirect('/login');
}


module.exports = {
  loginPage,
  signInRedirect,
  logout,
}

