const router = require('express').Router(),
	query = require('../controller/queryDatabase'),
	db = require("../models");
const isAuthenticated = require('./middleware/isAuthenticated.js');
// for login page the route is /index
router
	.get('/index', query.renderIndex)
	.get('/', isAuthenticated, query.displayRepos)
	.post('/', query.queryRepoTopic)
	.post('/trending', query.addRepo)
	.post('/addTopic', query.addTopic)

module.exports = router;
