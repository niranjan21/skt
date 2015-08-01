'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var yarnReturnEntries = require('../../app/controllers/yarn-return-entries.server.controller');

	// Yarn return entries Routes
	app.route('/yarn-return-entries')
		.get(yarnReturnEntries.list)
		.post(users.requiresLogin, yarnReturnEntries.create);

	app.route('/yarn-return-entries/:yarnReturnEntryId')
		.get(yarnReturnEntries.read)
		.put(users.requiresLogin, yarnReturnEntries.hasAuthorization, yarnReturnEntries.update)
		.delete(users.requiresLogin, yarnReturnEntries.hasAuthorization, yarnReturnEntries.delete);

	// Finish by binding the Yarn return entry middleware
	app.param('yarnReturnEntryId', yarnReturnEntries.yarnReturnEntryByID);
};
