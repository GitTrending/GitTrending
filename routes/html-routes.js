const router = require('express').Router(),
	query = require('../controller/queryDatabase'),
	db = require("../models"),
	update = require('../controller/updateDatabase');
	vote = require('../controller/scoringRepos');
	isAuthenticated = require('./middleware/isAuthenticated.js');

router
	.get('/index', query.renderIndex)
	.get('/', isAuthenticated, query.displayRepos)

module.exports = router;