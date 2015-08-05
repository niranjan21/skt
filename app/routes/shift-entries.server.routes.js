'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var shiftEntries = require('../../app/controllers/shift-entries.server.controller');

	// Shift entries Routes
	app.route('/shift-entries')
		.get(shiftEntries.list)
		.post(users.requiresLogin, shiftEntries.create);

	app.route('/shift-entries/:shiftEntryId')
		.get(shiftEntries.read)
		.put(users.requiresLogin, shiftEntries.hasAuthorization, shiftEntries.update)
		.delete(users.requiresLogin, shiftEntries.hasAuthorization, shiftEntries.delete);

	// Finish by binding the Shift entry middleware
	app.param('shiftEntryId', shiftEntries.shiftEntryByID);
};
