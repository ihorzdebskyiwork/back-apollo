const jwt = require('jsonwebtoken');
const permissionErrors = require('../exceptions/permissions');


const accessService = {
	async access(accessToken, forbiddenForRoles){
			if(!accessToken){
				throw permissionErrors.UNAUTHORIZED;
			}
			const {role} = await checkAuth(accessToken);
			grantAccess(role,forbiddenForRoles)
	},
}

const checkAuth = async (accessToken) => {
	try{
		return  jwt.decode(accessToken, process.env.JWTSECRET);
	}catch (e){
		throw permissionErrors.UNAUTHORIZED;
	}
}

const grantAccess = (currentRole,forbiddenForRoles) => {
		if(!forbiddenForRoles.length) return;
		const isGranted = !forbiddenForRoles.includes(currentRole);
		if(!isGranted) throw permissionErrors.FORBIDDEN;
}

module.exports = accessService;