const express = require('express');
const router = express.Router();
const pub = require('./public-controller.js');


router.get('', (req, res) => {
	pub.getAppState(req, res)
})

router.get('/users', (req, res) => {
	pub.getUsers(req, res)
})

module.exports = router;