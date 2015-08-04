'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var stoppages = require('../../app/controllers/stoppages.server.controller');

	// Stoppages Routes
	app.route('/stoppages')
		.get(stoppages.list)
		.post(users.requiresLogin, stoppages.create);

	app.route('/stoppages/:stoppageId')
		.get(stoppages.read)
		.put(users.requiresLogin, stoppages.hasAuthorization, stoppages.update)
		.delete(users.requiresLogin, stoppages.hasAuthorization, stoppages.delete);

	// Finish by binding the Stoppage middleware
	app.param('stoppageId', stoppages.stoppageByID);
};
