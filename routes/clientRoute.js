const mongoose = require("mongoose");
const Client = mongoose.model("Client");
const auth = require("../handlers/auth");

module.exports = app => {
	app.post("/api/client", async (req, res) => {
		const id = req.body_id;
		req.body.token = auth.signToken(id);
		client = await new Client(req.body).save();
		res.header("x-auth", req.body.token).send(client);
	});

	/*app.post('/api/client/login', async (req, res) => {
		const client = await Client.findByCred(req.body.email, req.body.password);
		res.header('x-auth', client.token).send(client);
	})*/

	app.delete('/api/client/:token', async (req, res) => {
		const client = await Client.deleteOne({token: req.params.token})
		res.status(200).json('successfully deleted');
	})

	app.get('/api/client', async (req, res) => {
		const client = await Client.find()
		res.status(200).json(client)
	})
};
