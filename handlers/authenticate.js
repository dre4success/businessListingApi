/*const mongoose = require("mongoose");
const Client = mongoose.model("Client");
const auth = require('./auth');
// const expressJwt = require('express-jwt');
// checkToken = expressJwt({secret: auth.})

const authenticate = (req, res, next) => {
	var token = req.header("x-auth");

	Client.findByToken(token)
		.then(client => {
			if (!client) {
				return Promise.reject();
			}

			req.user = client;
			req.token = token;
			next();
		})
		.catch(e => {
			res.status(401).send();
		});
	const decoded = auth.check(token);
	Client.findOne({
		_id: decoded._id,
		token
	}).then(client => {
		if (!client) {
			return Promise.reject();
		}
		req.user = client;
		req.token = token;
		next();
	})
	.catch(e => {
		res.status(401).send()
	})
};

module.exports = {authenticate}
*/