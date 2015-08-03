'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var concerns = require('../../app/controllers/concerns.server.controller');

	// Concerns Routes
	app.route('/concerns')
		.get(concerns.list)
		.post(users.requiresLogin, concerns.create);

	app.route('/concerns/:concernId')
		.get(concerns.read)
		.put(users.requiresLogin, concerns.hasAuthorization, concerns.update)
		.delete(users.requiresLogin, concerns.hasAuthorization, concerns.delete);

	// Finish by binding the Concern middleware
	app.param('concernId', concerns.concernByID);
};
