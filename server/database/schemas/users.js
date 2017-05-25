/*--- Our Schema for Users ---*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

// Define the User Schema
var userSchema = new Schema({
	//ID: { type: Number, unique: true },
	Status: { type: Number, required: true },
	Firstname: { type: String, required: true },
	Lastname: { type: String, required: true },
	Email: { type: String, required: true, unique: true },
	Password: { type: String, required: true },
	Phone: { type: Number },
	Mobile: { type: Number },
	FacebookID: { type: String },
	GoogleID: { type: String },
	Adventures: { type: Array },
	DateCreated: { type: Date },
	Profile: {} // for extra information you may / may not want
});

// A method that's called every time a user document is saved..
userSchema.pre('save', function (next) {

	var user = this;

	// If the password hasn't been modified, move along...
	if (!user.isModified('Password')) {
		return next();
	}

	// generate salt
	bcrypt.genSalt(10, function (err, salt) {

		if (err) {
			return next(err);
		}

		// create the hash and store it
		bcrypt.hash(user.Password, salt, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.Password = hash;
			next();
		});
	});
});

// Password verification helper
userSchema.methods.comparePassword = function (triedPassword, cb) {
	bcrypt.compare(triedPassword, this.Password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// The primary user model
var User = mongoose.model('User', userSchema);

module.exports = User;