const router = require('express').Router();
const auth = require('../controller/authenticate.js');
const db = require("../models");
router
  .get('/login', auth.loginPage)
  .get('/auth/github',
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    (req, res) => {},
  )
  .get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    auth.signInRedirect,
  )
  .get('/logout', auth.logout);
