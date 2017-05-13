const router = require('express').Router(),
	query = require('../controller/queryDatabase'),
	db = require("../models");
router
	.get('/', query.displayRepos)
	.post('/', query.queryRepoTopic)
	.post('/', query.queryRepoTopic)

module.exports = router;
