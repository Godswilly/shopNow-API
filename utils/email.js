const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	// 1) Create a transporter
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
		// Activate in Gmail "less secure app" option
	});
	// 2) Define the email options
	const mailOPtions = {
		from: 'Kalu Agu Kalu <hello@kalu.com>',
		to: options.email,
		subject: options.subject,
		text: options.message,
	};
	// 3) Actually send the email with nodemailer
	await transporter.sendMail(mailOPtions);
};

module.exports = sendEmail;
