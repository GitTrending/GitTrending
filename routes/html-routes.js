const router = require('express').Router(),
	query = require('../controller/queryDatabase'),
	db = require("../models");
const isAuthenticated = require('./middleware/isAuthenticated.js');
router
	.get('/', isAuthenticated, query.displayRepos)
	.post('/', query.queryRepoTopic)
	.post('/', query.queryRepoTopic)

module.exports = router;
