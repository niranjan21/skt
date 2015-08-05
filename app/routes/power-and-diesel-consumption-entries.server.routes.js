'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var powerAndDieselConsumptionEntries = require('../../app/controllers/power-and-diesel-consumption-entries.server.controller');

	// Power and diesel consumption entries Routes
	app.route('/power-and-diesel-consumption-entries')
		.get(powerAndDieselConsumptionEntries.list)
		.post(users.requiresLogin, powerAndDieselConsumptionEntries.create);

	app.route('/power-and-diesel-consumption-entries/:powerAndDieselConsumptionEntryId')
		.get(powerAndDieselConsumptionEntries.read)
		.put(users.requiresLogin, powerAndDieselConsumptionEntries.hasAuthorization, powerAndDieselConsumptionEntries.update)
		.delete(users.requiresLogin, powerAndDieselConsumptionEntries.hasAuthorization, powerAndDieselConsumptionEntries.delete);

	// Finish by binding the Power and diesel consumption entry middleware
	app.param('powerAndDieselConsumptionEntryId', powerAndDieselConsumptionEntries.powerAndDieselConsumptionEntryByID);
};
