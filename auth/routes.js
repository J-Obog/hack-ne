require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js')
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
	bcrypt.hash(req.body.username, 10, (err, hash) => {
		if(err) {
			return res.status(500).json({error: err})
		} else {
			User.create({username: req.body.username, password: hash})
			.then(() => {
				res.status(200).json({message: 'User created'})
			})
			.catch(err => {
				res.status(500).json({message: 'Sign up failed'})
			}) 
		}
	})
}) 

router.post('/login', (req, res, next) => {
	User.findOne({where: { username: req.body.username }})
	.then(user => {
		if(user == null) {
			return res.status(401).json({message: 'Auth failed'});
		}
		bcrypt.compare(req.body.password, user.dataValues.password, (err, result) => {
			if(err) {
				return res.status(401).json({message: 'Auth failed'})
			}
			if(result) {
				const token = jwt.sign({
					userId: user.dataValues.user_id, 
					username: user.dataValues.username	
				}, 
				process.env.ACCESS_TOKEN_SECRET, 
				{
					expiresIn: '1h'
				});

				return res.status(200).json({message: 'Auth successful', token: token})
			}
			res.status(401).json({message: 'Auth failed'})
		})
	})
	.catch(err => {
		res.status(500).json({error: err})
	})
});


module.exports = router;