const Fruit = require("../models/fruit.model");
const {v4: uuid} = require("uuid");

const fruitService = {
	async createFruit (createFruit) {
		const fruit = new Fruit({
			id: uuid(),
			...createFruit
		})
		return fruit.save();
	},

	async getFruit(id) {
		const [fruit] = await Fruit.find({id}).exec();
		if (!fruit) {
			throw new Error('Fruit not found');
		}
		return fruit;
	},

	async getAllFruits() {
		return Fruit.find().exec();
	},

	async updateFruit(id, updateFruit) {
		const [fruit] = await Fruit.find({id});
		if (!fruit) {
			throw new Error('Fruit not found');
		}
		return Fruit.findOneAndUpdate({id}, updateFruit, {new: true})
	},

	async removeFruit(id) {
		const fruit = await Fruit.find({id}).exec();
		if (!fruit) {
			throw new Error('Fruit not found');
		}
		await Fruit.findOneAndRemove({id})
		return `fruit with ${id} has been removed`;
	}
}

module.exports = fruitService;