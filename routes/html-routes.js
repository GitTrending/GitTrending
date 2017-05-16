const router = require('express').Router(),
	query = require('../controller/queryDatabase'),
	db = require("../models");
const isAuthenticated = require('./middleware/isAuthenticated.js');
router
	.get('/index', query.renderIndex)
	.get('/', isAuthenticated, query.displayRepos)
	.post('/', query.queryRepoTopic)
	.post('/trending', query.addRepo)
	.post('/addTopic', query.addTopic)
	.get('trending', query.updateScore)

module.exports = router;
