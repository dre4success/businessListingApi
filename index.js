const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/dev");
require("./models/Business");

mongoose.connect(keys.mongoURI, {
	useMongoClient: true
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/bizRoute')(app);

app.use((err, req, res, next) => {
	res.status(500).json(err.message);
	next();
})


app.listen(5000, () => {
	console.log("Server running on port 5000");
});

