'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var rollwiseEntries = require('../../app/controllers/rollwise-entries.server.controller');

	// Rollwise entries Routes
	app.route('/rollwise-entries')
		.get(rollwiseEntries.list)
		.post(users.requiresLogin, rollwiseEntries.create);

	app.route('/rollwise-entries/:rollwiseEntryId')
		.get(rollwiseEntries.read)
		.put(users.requiresLogin, rollwiseEntries.hasAuthorization, rollwiseEntries.update)
		.delete(users.requiresLogin, rollwiseEntries.hasAuthorization, rollwiseEntries.delete);

	// Finish by binding the Rollwise entry middleware
	app.param('rollwiseEntryId', rollwiseEntries.rollwiseEntryByID);
};
