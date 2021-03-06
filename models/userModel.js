const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please enter your username'],
		minlength: [3, 'Username must have more or equal to 3 characters'],
		maxlength: [20, 'Username must have less or equal to 20 characters'],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Please enter an email'],
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: [6, 'Minimum password length must be 6 characters'],
		select: false,
	},
	confirmPassword: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: 'Passwords are not the same!!',
		},
	},
	role: {
		type: String,
		enum: ['user', 'seller', 'admin'],
		default: 'user',
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	dateAdded: {
		type: Date,
		default: Date.now,
		select: false,
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);

	this.confirmPassword = undefined;
	next();
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
});

userSchema.pre(/^find/, async function (next) {
	// This points to the current query
	this.find({ active: { $ne: false } });
	next();
});

userSchema.methods.comparePassword = async function (
	candidatePassword,
	userPassword
) {
	const isMatch = await bcrypt.compare(candidatePassword, userPassword);
	return isMatch;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		// True Means Changed Password

		return JWTTimestamp < changedTimestamp;
	}

	// False means NOT changed
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	console.log({ resetToken }, this.passwordResetToken);

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
