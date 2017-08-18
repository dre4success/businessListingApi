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
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 7
	},
	token: String
});

/*clientSchema.statics.findByToken = function(token) {
	var decoded
	try {
		decoded = jwt.verify(token, keys.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}

	return this.findOne({
		_id: decoded._id,
		token
	});
};*/

clientSchema.statics.findByCred = function(email, password) {
	return this.findOne({ email }).then(client => {
		if (!client) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, client.password, (err, res) => {
				if (res) {
					resolve(client);
				} else {
					reject();
				}
			});
		});
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
