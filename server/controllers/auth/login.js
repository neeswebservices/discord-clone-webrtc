const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email.toLowerCase() });
		if (!user) {
			return res.status(400).send({ msg: 'User not found, please sign up !' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.send({ msg: 'Invalid password, please try again !' });
		}
		const token = jwt.sign({ id: user._id, email }, process.env.AUTH_TOKEN, {
			expiresIn: '1d',
		});

		res.status(200).json({
			userDetails: {
				sucess: true,
				email: user.email,
				username: user.username,
				token: token,
			},
		});
	} catch (err) {
		return res
			.status(500)
			.json({ msg: err.message + 'something went wrong !' });
	}
};

module.exports = login;
