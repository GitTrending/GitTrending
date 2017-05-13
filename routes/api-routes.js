'use strict';
const router = require('express').Router();
const auth = require('../controller/authenticate.js');
const db = require("../models");
const passport = require('../controller/passport.config.js');
router
  .get('/login', auth.loginPage)
  .get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){}
  )
  .get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    auth.signInRedirect
  )
  .get('/logout', auth.logout);

module.exports = router;
