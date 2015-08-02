'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var generalItemInwardEntries = require('../../app/controllers/general-item-inward-entries.server.controller');

	// General item inward entries Routes
	app.route('/general-item-inward-entries')
		.get(generalItemInwardEntries.list)
		.post(users.requiresLogin, generalItemInwardEntries.create);

	app.route('/general-item-inward-entries/:generalItemInwardEntryId')
		.get(generalItemInwardEntries.read)
		.put(users.requiresLogin, generalItemInwardEntries.hasAuthorization, generalItemInwardEntries.update)
		.delete(users.requiresLogin, generalItemInwardEntries.hasAuthorization, generalItemInwardEntries.delete);

	// Finish by binding the General item inward entry middleware
	app.param('generalItemInwardEntryId', generalItemInwardEntries.generalItemInwardEntryByID);
};
