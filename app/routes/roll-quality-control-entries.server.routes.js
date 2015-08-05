'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var rollQualityControlEntries = require('../../app/controllers/roll-quality-control-entries.server.controller');

	// Roll quality control entries Routes
	app.route('/roll-quality-control-entries')
		.get(rollQualityControlEntries.list)
		.post(users.requiresLogin, rollQualityControlEntries.create);

	app.route('/roll-quality-control-entries/:rollQualityControlEntryId')
		.get(rollQualityControlEntries.read)
		.put(users.requiresLogin, rollQualityControlEntries.hasAuthorization, rollQualityControlEntries.update)
		.delete(users.requiresLogin, rollQualityControlEntries.hasAuthorization, rollQualityControlEntries.delete);

	// Finish by binding the Roll quality control entry middleware
	app.param('rollQualityControlEntryId', rollQualityControlEntries.rollQualityControlEntryByID);
};
