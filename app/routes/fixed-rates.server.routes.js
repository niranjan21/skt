'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fixedRates = require('../../app/controllers/fixed-rates.server.controller');

	// Fixed rates Routes
	app.route('/fixed-rates')
		.get(fixedRates.list)
		.post(users.requiresLogin, fixedRates.create);

	app.route('/fixed-rates/:fixedRateId')
		.get(fixedRates.read)
		.put(users.requiresLogin, fixedRates.hasAuthorization, fixedRates.update)
		.delete(users.requiresLogin, fixedRates.hasAuthorization, fixedRates.delete);

	// Finish by binding the Fixed rate middleware
	app.param('fixedRateId', fixedRates.fixedRateByID);
};
