'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var deductionEntries = require('../../app/controllers/deduction-entries.server.controller');

	// Deduction entries Routes
	app.route('/deduction-entries')
		.get(deductionEntries.list)
		.post(users.requiresLogin, deductionEntries.create);

	app.route('/deduction-entries/:deductionEntryId')
		.get(deductionEntries.read)
		.put(users.requiresLogin, deductionEntries.hasAuthorization, deductionEntries.update)
		.delete(users.requiresLogin, deductionEntries.hasAuthorization, deductionEntries.delete);

	// Finish by binding the Deduction entry middleware
	app.param('deductionEntryId', deductionEntries.deductionEntryByID);
};
