/**
 * Our Schema for Adventures
 */
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

// Define the Adventure Schema
var adventureSchema = new Schema({
	//ID: { type: Number, unique: true },
	Type: { type: Number, required: true },
	Name: { type: String, required: true },
	Status: { type: Number, required: true },
	Latitude: { type: String, required: true },
	Longitude: { type: String, required: true },
	Icon: { type: String, required: true },
	Price: { type: Number, required: true },
	DateCreated: { type: Date },
	Details: {} // for extra information you may / may not want
});

// A method that's called every time a adventure document is saved..
adventureSchema.pre('save', function (next) {
	var adventure = this;

	// If the password hasn't been modified, move along...
	if (!adventure.isModified('Latitude')) {
		return next();
	}
});

// Password verification helper
// adventureSchema.methods.comparePassword = function (triedPassword, cb) {
// 	bcrypt.compare(triedPassword, this.password, function (err, isMatch) {
// 		if (err) return cb(err);
// 		cb(null, isMatch);
// 	});
// };

// The primary adventure model
var Adventure = mongoose.model('Adventure', adventureSchema);

module.exports = Adventure;