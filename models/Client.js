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
	},
	password: {
		type: String,
		required: true,
		minlength: 7
	}, 
	tokens: [{
		key: {
			type: String,
			required: true
		}
	}]
});

clientSchema.methods.generateToken = async function() {
	// const access = 'auth'
	const key = jwt
		.sign({ _id: this._id.toHexString() }, keys.JWT_SECRET).toString();

	this.tokens.push({key});

/*	return await this.save();*/

	return this.save().then(() => {
		return key;
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
