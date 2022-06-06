const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
	let token = req.body.token || req.query.token || req.headers['authorization'];
	if (!token) {
		return res.status(403).send('You are not authorized ! ');
	}

	try {
		token = token.split(' ')[1];
		const decoded = jwt.verify(token, config.AUTH_TOKEN);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).send({ msg: 'Invalid token' });
	}
	return next();
};

module.exports = verifyToken;
