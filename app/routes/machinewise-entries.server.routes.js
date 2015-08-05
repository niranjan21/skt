'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var machinewiseEntries = require('../../app/controllers/machinewise-entries.server.controller');

	// Machinewise entries Routes
	app.route('/machinewise-entries')
		.get(machinewiseEntries.list)
		.post(users.requiresLogin, machinewiseEntries.create);

	app.route('/machinewise-entries/:machinewiseEntryId')
		.get(machinewiseEntries.read)
		.put(users.requiresLogin, machinewiseEntries.hasAuthorization, machinewiseEntries.update)
		.delete(users.requiresLogin, machinewiseEntries.hasAuthorization, machinewiseEntries.delete);

	// Finish by binding the Machinewise entry middleware
	app.param('machinewiseEntryId', machinewiseEntries.machinewiseEntryByID);
};
