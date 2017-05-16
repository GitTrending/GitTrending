const router = require('express').Router(),
	query = require('../controller/queryDatabase'),
	db = require("../models");
router
	.get('/index', query.renderIndex)
	.get('/', query.displayRepos)
	.post('/', query.queryRepoTopic)
	.post('/', query.queryRepoTopic)

module.exports = router;
