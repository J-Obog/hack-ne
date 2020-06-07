const User = require('../models/user.js');

module.exports.getUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    res.status(200).json({ users: result });
  } catch {
    res.status(500).json({ message: 'Query failed' });
  }
};

module.exports.getAppState = async (req, res) => {
	try {
		const topRecent = await User.findAll({limit: 3, order: [ ['updatedAt', 'DESC'] ]});
		const topJoined = await User.findAll({limit: 3, order: [ ['createdAt', 'ASC'] ]});
		const totalOn = await User.count({ where: { online: true }});
		return res.status(200).json({
			noOnline: totalOn,
			mostRecent: topRecent,
			newMemebers: topJoined
		})
  } catch {
  	return res.status(500).json({ message: 500 })
  } 
}
