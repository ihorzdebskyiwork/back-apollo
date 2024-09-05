const {model, Schema } = require('mongoose');

const userSchema = new Schema({
	id: String,
	name: String,
	role: String,
	password: String
});

module.exports = model('User', userSchema);