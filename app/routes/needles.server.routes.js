'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var needles = require('../../app/controllers/needles.server.controller');

	// Needles Routes
	app.route('/needles')
		.get(needles.list)
		.post(users.requiresLogin, needles.create);

	app.route('/needles/:needleId')
		.get(needles.read)
		.put(users.requiresLogin, needles.hasAuthorization, needles.update)
		.delete(users.requiresLogin, needles.hasAuthorization, needles.delete);

	// Finish by binding the Needle middleware
	app.param('needleId', needles.needleByID);
};
