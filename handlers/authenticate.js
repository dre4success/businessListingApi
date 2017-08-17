const mongoose = require("mongoose");
const Client = mongoose.model("Client");

exports.authenticate = (req, res, next) => {
	let token = req.header("x-auth");

	Client.findByToken(token)
		.then(client => {
			if (!client) {
				return Promise.reject();
			}

			req.client = client;
			req.token = token;
			next();
		})
		.catch(e => {
			res.status(401).send();
		});
};
