'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var directOutwardEntries = require('../../app/controllers/direct-outward-entries.server.controller');

	// Direct outward entries Routes
	app.route('/direct-outward-entries')
		.get(directOutwardEntries.list)
		.post(users.requiresLogin, directOutwardEntries.create);

	app.route('/direct-outward-entries/:directOutwardEntryId')
		.get(directOutwardEntries.read)
		.put(users.requiresLogin, directOutwardEntries.hasAuthorization, directOutwardEntries.update)
		.delete(users.requiresLogin, directOutwardEntries.hasAuthorization, directOutwardEntries.delete);

	// Finish by binding the Direct outward entry middleware
	app.param('directOutwardEntryId', directOutwardEntries.directOutwardEntryByID);
};
