const nodemailer = require('nodemailer');

// this will not work currently
const sendmail = (email, subject, text) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			// your gmail account and password
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.MAILER_EMAIL,
		to: email,
		subject: 'Neeswebservices : ' + subject,
		text: text,
		html: '<div>' + text + '</div>',
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

module.exports = sendmail;
