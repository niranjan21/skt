'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var generalItemOutwardEntries = require('../../app/controllers/general-item-outward-entries.server.controller');

	// General item outward entries Routes
	app.route('/general-item-outward-entries')
		.get(generalItemOutwardEntries.list)
		.post(users.requiresLogin, generalItemOutwardEntries.create);

	app.route('/general-item-outward-entries/:generalItemOutwardEntryId')
		.get(generalItemOutwardEntries.read)
		.put(users.requiresLogin, generalItemOutwardEntries.hasAuthorization, generalItemOutwardEntries.update)
		.delete(users.requiresLogin, generalItemOutwardEntries.hasAuthorization, generalItemOutwardEntries.delete);

	// Finish by binding the General item outward entry middleware
	app.param('generalItemOutwardEntryId', generalItemOutwardEntries.generalItemOutwardEntryByID);
};
