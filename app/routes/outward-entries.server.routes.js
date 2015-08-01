'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var outwardEntries = require('../../app/controllers/outward-entries.server.controller');

	// Outward entries Routes
	app.route('/outward-entries')
		.get(outwardEntries.list)
		.post(users.requiresLogin, outwardEntries.create);

	app.route('/outward-entries/:outwardEntryId')
		.get(outwardEntries.read)
		.put(users.requiresLogin, outwardEntries.hasAuthorization, outwardEntries.update)
		.delete(users.requiresLogin, outwardEntries.hasAuthorization, outwardEntries.delete);

	// Finish by binding the Outward entry middleware
	app.param('outwardEntryId', outwardEntries.outwardEntryByID);
};
