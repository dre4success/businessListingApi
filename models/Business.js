const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const bizSchema = new Schema ({
	name: String,
	address: String,
	description: String,
	categories: [String]
})

module.exports = mongoose.model('Business', bizSchema);