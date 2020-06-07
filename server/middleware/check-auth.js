const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const decoded = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);
		req.userData = decoded;
		next();
	} catch {
		return res.status(401).json({message: 'Auth failed'})
	}
}