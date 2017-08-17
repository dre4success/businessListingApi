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

app.listen(5000, () => {
	console.log("Server running on port 5000");
});
