'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var powerConsumptionEntries = require('../../app/controllers/power-consumption-entries.server.controller');

	// Power consumption entries Routes
	app.route('/power-consumption-entries')
		.get(powerConsumptionEntries.list)
		.post(users.requiresLogin, powerConsumptionEntries.create);

	app.route('/power-consumption-entries/:powerConsumptionEntryId')
		.get(powerConsumptionEntries.read)
		.put(users.requiresLogin, powerConsumptionEntries.hasAuthorization, powerConsumptionEntries.update)
		.delete(users.requiresLogin, powerConsumptionEntries.hasAuthorization, powerConsumptionEntries.delete);

	// Finish by binding the Power consumption entry middleware
	app.param('powerConsumptionEntryId', powerConsumptionEntries.powerConsumptionEntryByID);
};
