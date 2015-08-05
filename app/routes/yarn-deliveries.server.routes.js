'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var yarnDeliveries = require('../../app/controllers/yarn-deliveries.server.controller');

	// Yarn deliveries Routes
	app.route('/yarn-deliveries')
		.get(yarnDeliveries.list)
		.post(users.requiresLogin, yarnDeliveries.create);

	app.route('/yarn-deliveries/:yarnDeliveryId')
		.get(yarnDeliveries.read)
		.put(users.requiresLogin, yarnDeliveries.hasAuthorization, yarnDeliveries.update)
		.delete(users.requiresLogin, yarnDeliveries.hasAuthorization, yarnDeliveries.delete);

	// Finish by binding the Yarn delivery middleware
	app.param('yarnDeliveryId', yarnDeliveries.yarnDeliveryByID);
};
