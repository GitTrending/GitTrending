const router = require('express').Router(),
	query = require('../controller/queryDatabase'),
	db = require("../models");
router
	.get('/', query.displayRepos)
	.post('/', query.queryRepoTopic)
	.post('/trending', query.addRepo)
	.post('/addTopic', query.addTopic)

module.exports = router;
