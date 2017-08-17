const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/dev");
require("./models/Business");
require('./models/Client');

mongoose.connect(keys.mongoURI, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
	console.log(`${err.message}`);
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/bizRoute')(app);
require('./routes/clientRoute')(app);

app.use((err, req, res, next) => {
	res.status(500).json(err.message);
	next();
})


app.listen(5000, () => {
	console.log("Server running on port 5000");
});


