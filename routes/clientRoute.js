const mongoose = require("mongoose");
const Client = mongoose.model("Client");
const _ = require("lodash");

module.exports = app => {
	app.post("/api/client", (req, res, next) => {
		let body = req.body;
		const client = new Client(body);

		client
			.save()
			.then(() => {
				return client.generateToken();
			})
			.then(key => {
				res.header("x-auth", key).send(client);
			})
			.catch(e => {
				res.status(400).send(e);
			});
	});

	
};
