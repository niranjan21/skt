'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var directInwardEntries = require('../../app/controllers/direct-inward-entries.server.controller');

	// Direct inward entries Routes
	app.route('/direct-inward-entries')
		.get(directInwardEntries.list)
		.post(users.requiresLogin, directInwardEntries.create);

	app.route('/direct-inward-entries/:directInwardEntryId')
		.get(directInwardEntries.read)
		.put(users.requiresLogin, directInwardEntries.hasAuthorization, directInwardEntries.update)
		.delete(users.requiresLogin, directInwardEntries.hasAuthorization, directInwardEntries.delete);

	// Finish by binding the Direct inward entry middleware
	app.param('directInwardEntryId', directInwardEntries.directInwardEntryByID);
};
