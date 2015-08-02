'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricSales = require('../../app/controllers/fabric-sales.server.controller');

	// Fabric sales Routes
	app.route('/fabric-sales')
		.get(fabricSales.list)
		.post(users.requiresLogin, fabricSales.create);

	app.route('/fabric-sales/:fabricSaleId')
		.get(fabricSales.read)
		.put(users.requiresLogin, fabricSales.hasAuthorization, fabricSales.update)
		.delete(users.requiresLogin, fabricSales.hasAuthorization, fabricSales.delete);

	// Finish by binding the Fabric sale middleware
	app.param('fabricSaleId', fabricSales.fabricSaleByID);
};
