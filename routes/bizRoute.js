const mongoose = require("mongoose");
const Business = mongoose.model("Business");
const auth = require('../handlers/auth');
// const {authenticate} = require('../handlers/authenticate'); 

module.exports = app => {
app.post("/api/business", async (req, res) => {
	const { name, address, description, categories } = req.body;

	const business = await new Business({
		name,
		address,
		description,
		categories
		// _client: req.user
	}).save();
	res.status(200).json(business);
});

	app.put("/api/business/:id", async (req, res) => {
		const business = await Business.findOneAndUpdate(
			{ _id: req.params.id },
			req.body
		).exec();

		res.status(200).json(business);
	});

	app.delete("/api/business/:id", async (req, res) => {
		const business = await Business.deleteOne({ _id: req.params.id });

		res.status(200).send("Successfully deleted");
	});

	app.get("/api/business", async (req, res) => {
		const business = await Business.find();
		res.status(200).json(business);
	});

	app.get("/api/business/:id", async (req, res) => {
		const business = await Business.findOne({ _id: req.params.id });
		res.status(200).json(business);
	});
};
