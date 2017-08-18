const jwt = require("jsonwebtoken");
const keys = require("../config/dev");
const expressJwt = require('express-jwt');
checkToken = expressJwt({secret: keys.JWT_SECRET})

exports.signToken = id => {
	return jwt.sign({ _id: id }, keys.JWT_SECRET);
};

exports.decodeToken = (req, res, next) => {
	checkToken, (req, res) => {
		if (!req.user) return res.sendStatus(400);
		res.sendStatus(200);
	}
	next();
}
