const User = require('../models/user.model');
const {v4: uuid} = require("uuid");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const permissionErrors = require('../exceptions/permissions');

const userService = {
	async createUser({name, password, role}) {
		console.log('dsfsdfdsfsdf')
		const user = await User.findOne({name}).exec()
		if (user) {
			throw permissionErrors.USEREXISTS;
		}
		
		const hashedPassword = await hashPassword(password);
	
		const userDB = new User({
			id: uuid(),
			name,
			password: hashedPassword,
			role,
		});
		await userDB.save();
		const accessToken = await getAccessToken({id: userDB.id, role: userDB.role});
		return {
			...userDB.toObject(),
			accessToken
		}
	},
	async login({name, password}) {
		const user = await User.findOne({name}).lean().exec()
		if (!user) {
			throw permissionErrors.INVALIDCREDS
		}
		const isPasswordMatch = await comparePasswords(password, user.password)
		if (!isPasswordMatch) {
			throw permissionErrors.INVALIDCREDS;
		}
		const accessToken = await getAccessToken({id: user.id, role: user.role});
		return {
			...user,
			accessToken
		}
	},

	userRoles: {
		ADMIN: "Admin",
		FRUITJOHN:"FruitJohn",
		VEGETERIANMARY:"VegetarianMary"
	}
}

const getAccessToken = async (payload) => {
	return jwt.sign(payload, process.env.JWTSECRET);
}

const hashPassword = async (password) => {
	return bcrypt.hash(password, 10);
}

const comparePasswords = async (password, hash) => {
	return bcrypt.compareSync(password, hash);
}


module.exports = userService;