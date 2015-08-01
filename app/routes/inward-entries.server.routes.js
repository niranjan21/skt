'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var inwardEntries = require('../../app/controllers/inward-entries.server.controller');

	// Inward entries Routes
	app.route('/inward-entries')
		.get(inwardEntries.list)
		.post(users.requiresLogin, inwardEntries.create);

	app.route('/inward-entries/:inwardEntryId')
		.get(inwardEntries.read)
		.put(users.requiresLogin, inwardEntries.hasAuthorization, inwardEntries.update)
		.delete(users.requiresLogin, inwardEntries.hasAuthorization, inwardEntries.delete);

	// Finish by binding the Inward entry middleware
	app.param('inwardEntryId', inwardEntries.inwardEntryByID);
};
