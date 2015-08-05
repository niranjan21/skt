'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var productionTestEntries = require('../../app/controllers/production-test-entries.server.controller');

	// Production test entries Routes
	app.route('/production-test-entries')
		.get(productionTestEntries.list)
		.post(users.requiresLogin, productionTestEntries.create);

	app.route('/production-test-entries/:productionTestEntryId')
		.get(productionTestEntries.read)
		.put(users.requiresLogin, productionTestEntries.hasAuthorization, productionTestEntries.update)
		.delete(users.requiresLogin, productionTestEntries.hasAuthorization, productionTestEntries.delete);

	// Finish by binding the Production test entry middleware
	app.param('productionTestEntryId', productionTestEntries.productionTestEntryByID);
};
