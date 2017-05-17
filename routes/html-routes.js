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

	// Pass in selected repo score and selected repo ID to update score.
	// We could, in theory, add more to the controller to get the score, then update it.
	// But I thought it would be nice to use the score we have in front-end
	// And pass to the back-end to reduce runtime server calls.
	// Note to add in trending to path, after I make sure this works.
	.post('/:repo_name/:score/:id', query.updateScore)

module.exports = router;
