'use strict';
const router = require('express').Router(),
    auth = require('../controller/authenticate.js'),
    db = require("../models"),
    passport = require('../controller/passport.config.js'),
    query = require('../controller/queryDatabase'),
    update = require('../controller/updateDatabase'),
    vote = require('../controller/scoringRepos');

router
    .get('/login', auth.loginPage)
    .get('/auth/github',
        passport.authenticate('github', { scope: ['user:email'] }),
        function(req, res) {}
    )
    .get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        auth.signInRedirect
    )
    .get('/logout', auth.logout)
    .post('/trending/:topic/:score/:id', vote.updateScore)
    .post('/', query.queryRepoTopic)
    .post('/trending', update.addRepo)
    .post('/addTopic', update.addTopic)
    .post('/trending/:topic_name/:repo_id', vote.updateScore)

module.exports = router;
