const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const keys = require("../config/dev");

const clientSchema = new Schema({
	email: {
		type: String,
		required: "Please Enter Your Email Address",
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "{VALUE} is not a valid email"
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7
	},
	token: {
		type: String,
		required: true
	}
});

clientSchema.methods.generateToken = function() {
	const token = jwt
		.sign({ _id: this._id.toHexString() }, keys.JWT_SECRET)
		.toString();

	return this.save().then(() => {
		return token;
	});
};

clientSchema.pre("save", function(next) {
	if (this.isModified("password")) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(this.password, salt, (err, hash) => {
				this.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

module.exports = mongoose.model("Client", clientSchema);
