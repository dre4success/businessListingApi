const jwt = require('jsonwebtoken');
const keys = require('../config/dev');
const mongoose = require('mongoose');
const Client = mongoose.model('Client');

const signToken = user => {
  const timestamp = new Date().getTime();
  return jwt.sign({ uid: user._id, iat: timestamp }, keys.JWT_SECRET);
};

exports.signUp = async (req, res, next) => {
	
	const email = req.body.email
	const password = req.body.password

	if(!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password'});
	}

}