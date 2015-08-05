'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var allowanceEntries = require('../../app/controllers/allowance-entries.server.controller');

	// Allowance entries Routes
	app.route('/allowance-entries')
		.get(allowanceEntries.list)
		.post(users.requiresLogin, allowanceEntries.create);

	app.route('/allowance-entries/:allowanceEntryId')
		.get(allowanceEntries.read)
		.put(users.requiresLogin, allowanceEntries.hasAuthorization, allowanceEntries.update)
		.delete(users.requiresLogin, allowanceEntries.hasAuthorization, allowanceEntries.delete);

	// Finish by binding the Allowance entry middleware
	app.param('allowanceEntryId', allowanceEntries.allowanceEntryByID);
};
