'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var productionRemarksEntries = require('../../app/controllers/production-remarks-entries.server.controller');

	// Production remarks entries Routes
	app.route('/production-remarks-entries')
		.get(productionRemarksEntries.list)
		.post(users.requiresLogin, productionRemarksEntries.create);

	app.route('/production-remarks-entries/:productionRemarksEntryId')
		.get(productionRemarksEntries.read)
		.put(users.requiresLogin, productionRemarksEntries.hasAuthorization, productionRemarksEntries.update)
		.delete(users.requiresLogin, productionRemarksEntries.hasAuthorization, productionRemarksEntries.delete);

	// Finish by binding the Production remarks entry middleware
	app.param('productionRemarksEntryId', productionRemarksEntries.productionRemarksEntryByID);
};
