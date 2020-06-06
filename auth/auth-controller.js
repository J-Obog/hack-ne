const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*module.exports.updateRecord = (req, res, model) => {
	console.log(req.query);
	model.update(req.query, {
		where: {
			user_id: req.query.user_id,
		}
	})
	.then(() => {
		res.sendStatus(200);
	}) 
	.catch(err => {
		console.error(err); 
	})  
}


module.exports.logOut = async (req, res) => {
	const token = req.body.refreshToken; 
	if(token) {
		await 
	} else {
		res.status(500).json({message: 'Auth failed'})
	}
}

app.post ("/logout", async(req, res) => {

    //logging out 
    const token = req.body.refreshToken;
    if (token) {
        const sql = "update jwt_auth set token = null where token = $1"
        const result = await pool.query(sql,
                                 [token]);
        
        res.send({"success": "logged out successfully"})
    }


})*/

module.exports.signUp = async (req, res) => {
	try {
		const hash =  await bcrypt.hash(req.body.password, 10);
		const data = {
			username: req.body.username,
			password: req.body.password,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			dob: req.body.dob
		}
		await User.create(data);
		res.status(200).json({'message': 'User created'});
	} catch {
		res.status(500).json({'message': 'Registration failed'})
	}
}

module.exports.logIn = async (req, res) => {
	try { 
    	const result = await User.findOne({where: {username: req.body.username}});
    	const user = result.dataValues;
    	if(result == null) {
    		res.status(500).json({'message': 'Auth failed'})
    	} else {
    		const cmpResult = await bcrypt.compare(req.body.password, user.password);
    		if(cmpResult) {
    			const payLoad = {userId: user.user_id, username: user.username};
    			const options = {algorithm: 'HS256', expiresIn: '1h'};
    			const token = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, options);
				return res.status(200).json({message: 'Auth successful', token: token})
    		} else {
    			res.status(401).json({'message': 'Auth failed'})
    		}
    	}
    } catch {
    	res.status(500).json({'message': 'Auth failed'})
    }
}