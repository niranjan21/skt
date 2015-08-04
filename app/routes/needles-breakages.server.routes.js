'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var needlesBreakages = require('../../app/controllers/needles-breakages.server.controller');

	// Needles breakages Routes
	app.route('/needles-breakages')
		.get(needlesBreakages.list)
		.post(users.requiresLogin, needlesBreakages.create);

	app.route('/needles-breakages/:needlesBreakageId')
		.get(needlesBreakages.read)
		.put(users.requiresLogin, needlesBreakages.hasAuthorization, needlesBreakages.update)
		.delete(users.requiresLogin, needlesBreakages.hasAuthorization, needlesBreakages.delete);

	// Finish by binding the Needles breakage middleware
	app.param('needlesBreakageId', needlesBreakages.needlesBreakageByID);
};
