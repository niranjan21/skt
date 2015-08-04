'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var perHourProductions = require('../../app/controllers/per-hour-productions.server.controller');

	// Per hour productions Routes
	app.route('/per-hour-productions')
		.get(perHourProductions.list)
		.post(users.requiresLogin, perHourProductions.create);

	app.route('/per-hour-productions/:perHourProductionId')
		.get(perHourProductions.read)
		.put(users.requiresLogin, perHourProductions.hasAuthorization, perHourProductions.update)
		.delete(users.requiresLogin, perHourProductions.hasAuthorization, perHourProductions.delete);

	// Finish by binding the Per hour production middleware
	app.param('perHourProductionId', perHourProductions.perHourProductionByID);
};
