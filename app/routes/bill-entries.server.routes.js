'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var billEntries = require('../../app/controllers/bill-entries.server.controller');

	// Bill entries Routes
	app.route('/bill-entries')
		.get(billEntries.list)
		.post(users.requiresLogin, billEntries.create);

	app.route('/bill-entries/:billEntryId')
		.get(billEntries.read)
		.put(users.requiresLogin, billEntries.hasAuthorization, billEntries.update)
		.delete(users.requiresLogin, billEntries.hasAuthorization, billEntries.delete);

	// Finish by binding the Bill entry middleware
	app.param('billEntryId', billEntries.billEntryByID);
};
