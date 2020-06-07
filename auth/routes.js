const express = require('express');
const router = express.Router();
const auth = require('./auth-controller.js');


router.post('/signup', (req, res) => {
	auth.signUp(req, res);
})

router.post('/login', (req, res) => {
	auth.logIn(req, res);
})

router.get('/users', (req, res) => {
	auth.getUsers(req, res)
})

module.exports = router;