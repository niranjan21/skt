'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var deliveryEntries = require('../../app/controllers/delivery-entries.server.controller');

	// Delivery entries Routes
	app.route('/delivery-entries')
		.get(deliveryEntries.list)
		.post(users.requiresLogin, deliveryEntries.create);

	app.route('/delivery-entries/:deliveryEntryId')
		.get(deliveryEntries.read)
		.put(users.requiresLogin, deliveryEntries.hasAuthorization, deliveryEntries.update)
		.delete(users.requiresLogin, deliveryEntries.hasAuthorization, deliveryEntries.delete);

	// Finish by binding the Delivery entry middleware
	app.param('deliveryEntryId', deliveryEntries.deliveryEntryByID);
};
