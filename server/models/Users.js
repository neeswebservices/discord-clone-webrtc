const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		default: '',
		type: String,
	},
});

module.exports = mongoose.model('User', UserSchema);
