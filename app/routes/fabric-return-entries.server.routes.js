'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricReturnEntries = require('../../app/controllers/fabric-return-entries.server.controller');

	// Fabric return entries Routes
	app.route('/fabric-return-entries')
		.get(fabricReturnEntries.list)
		.post(users.requiresLogin, fabricReturnEntries.create);

	app.route('/fabric-return-entries/:fabricReturnEntryId')
		.get(fabricReturnEntries.read)
		.put(users.requiresLogin, fabricReturnEntries.hasAuthorization, fabricReturnEntries.update)
		.delete(users.requiresLogin, fabricReturnEntries.hasAuthorization, fabricReturnEntries.delete);

	// Finish by binding the Fabric return entry middleware
	app.param('fabricReturnEntryId', fabricReturnEntries.fabricReturnEntryByID);
};
