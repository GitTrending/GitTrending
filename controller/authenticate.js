const passport = require('./passport.config.js');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/index')
}

// go to login page
const loginPage = (req, res) => {
  res.render('index');
}

// signin a user in 
const signInRedirect = (req, res) => {
  console.log("here in callback>>>");
  console.log("req.user is>>>>", req.user);
  //res.json("you have successfully logged in!");
  res.redirect('/');
}

const logout = (req, res) => {
  req.logout();
  res.redirect('/index');
}


module.exports = {
  loginPage,
  signInRedirect,
  logout,
}

