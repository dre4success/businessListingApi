const jwt = require("jsonwebtoken");
const keys = require("../config/dev");

exports.signToken = id => {
	return jwt.sign({ _id: id }, keys.JWT_SECRET);
};


