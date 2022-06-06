const auth = require('express').Router();
const authController = require('../controllers/auth/main');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const verifyToken = require('../middlewares/auth');

const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required().min(6),
	username: Joi.string().required().min(3).max(20),
});

const loginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required().min(4).max(40),
});

auth.post(
	'/login',
	validator.body(loginSchema),
	authController.controllers.login
);
auth.post(
	'/register',
	validator.body(registerSchema),
	authController.controllers.register
);

// test
auth.get('/test', verifyToken, (req, res) => {
	res.send('test');
});

module.exports = auth;
