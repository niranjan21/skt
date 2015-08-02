'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricSaleRegisters = require('../../app/controllers/fabric-sale-registers.server.controller');

	// Fabric sale registers Routes
	app.route('/fabric-sale-registers')
		.get(fabricSaleRegisters.list)
		.post(users.requiresLogin, fabricSaleRegisters.create);

	app.route('/fabric-sale-registers/:fabricSaleRegisterId')
		.get(fabricSaleRegisters.read)
		.put(users.requiresLogin, fabricSaleRegisters.hasAuthorization, fabricSaleRegisters.update)
		.delete(users.requiresLogin, fabricSaleRegisters.hasAuthorization, fabricSaleRegisters.delete);

	// Finish by binding the Fabric sale register middleware
	app.param('fabricSaleRegisterId', fabricSaleRegisters.fabricSaleRegisterByID);
};
