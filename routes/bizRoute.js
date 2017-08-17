const mongoose = require("mongoose");
const Business = mongoose.model("Business");

module.exports = app => {
	app.post("/api/business", async (req, res) => {
		const business = await new Business(req.body).save();

		res.status(200).json(business);
	});

	app.get()
};
