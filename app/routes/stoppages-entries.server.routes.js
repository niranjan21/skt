'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var stoppagesEntries = require('../../app/controllers/stoppages-entries.server.controller');

	// Stoppages entries Routes
	app.route('/stoppages-entries')
		.get(stoppagesEntries.list)
		.post(users.requiresLogin, stoppagesEntries.create);

	app.route('/stoppages-entries/:stoppagesEntryId')
		.get(stoppagesEntries.read)
		.put(users.requiresLogin, stoppagesEntries.hasAuthorization, stoppagesEntries.update)
		.delete(users.requiresLogin, stoppagesEntries.hasAuthorization, stoppagesEntries.delete);

	// Finish by binding the Stoppages entry middleware
	app.param('stoppagesEntryId', stoppagesEntries.stoppagesEntryByID);
};
