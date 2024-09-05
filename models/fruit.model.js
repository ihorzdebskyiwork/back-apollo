const {model, Schema } = require('mongoose');

const fruitSchema = new Schema({
	id: String,
	name: String,
	price: Number,
});

module.exports = model('Fruit', fruitSchema);