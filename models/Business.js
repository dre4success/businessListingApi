const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const bizSchema = new Schema ({
	name: String,
	address: String,
	description: String,
	categories: [String]
	// _client: { type: mongoose.Schema.ObjectId, ref: 'Client'}
})

module.exports = mongoose.model('Business', bizSchema);