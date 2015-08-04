'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var needlesInwardEntries = require('../../app/controllers/needles-inward-entries.server.controller');

	// Needles inward entries Routes
	app.route('/needles-inward-entries')
		.get(needlesInwardEntries.list)
		.post(users.requiresLogin, needlesInwardEntries.create);

	app.route('/needles-inward-entries/:needlesInwardEntryId')
		.get(needlesInwardEntries.read)
		.put(users.requiresLogin, needlesInwardEntries.hasAuthorization, needlesInwardEntries.update)
		.delete(users.requiresLogin, needlesInwardEntries.hasAuthorization, needlesInwardEntries.delete);

	// Finish by binding the Needles inward entry middleware
	app.param('needlesInwardEntryId', needlesInwardEntries.needlesInwardEntryByID);
};
