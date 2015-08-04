'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var yarnDescriptions = require('../../app/controllers/yarn-descriptions.server.controller');

	// Yarn descriptions Routes
	app.route('/yarn-descriptions')
		.get(yarnDescriptions.list)
		.post(users.requiresLogin, yarnDescriptions.create);

	app.route('/yarn-descriptions/:yarnDescriptionId')
		.get(yarnDescriptions.read)
		.put(users.requiresLogin, yarnDescriptions.hasAuthorization, yarnDescriptions.update)
		.delete(users.requiresLogin, yarnDescriptions.hasAuthorization, yarnDescriptions.delete);

	// Finish by binding the Yarn description middleware
	app.param('yarnDescriptionId', yarnDescriptions.yarnDescriptionByID);
};
