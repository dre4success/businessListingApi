const mongoose = require("mongoose");
const Client = mongoose.model("Client");
const _ = require("lodash");
const auth = require("../handlers/auth");

module.exports = app => {
	app.post("/api/client", async (req, res) => {
		const id = req.body_id;
		req.body.token = auth.signToken(id);
		client = await new Client(req.body).save();
		res.header("x-auth", req.body.token).send(client);
	});
};
