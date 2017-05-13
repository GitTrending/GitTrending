const router = require('express').Router(),
	burgerController = require('../controllers/burgers_controller'),
	db = require("../models");

router
	.get('/', burgerController.findAll)
	.post('/addBurger', burgerController.postBurger)
	.post('/', burgerController.eatBurger);

module.exports = router;