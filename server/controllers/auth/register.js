const sendmail = require('../../libs/mailer');
const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
	try {
		const { email, password, username } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).send({ msg: 'User already exists' });
		}
		// sendmail(email, 'Verify your email', 'Please verify your email');
		const hashPassword = bcrypt.hashSync(password, 10);
		const newUser = await new User({
			email: email.toLowerCase(),
			password: hashPassword,
			username,
		});
		const token = jwt.sign(
			{
				id: newUser._id,
				email,
			},
			process.env.AUTH_TOKEN,
			{
				expiresIn: '2h',
			}
		);

		await newUser.save();

		res.status(201).json({
			userDetails: {
				email: newUser.email,
				username: newUser.username,
				token: token,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err.message });
	}
};

module.exports = register;
