'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricDescriptions = require('../../app/controllers/fabric-descriptions.server.controller');

	// Fabric descriptions Routes
	app.route('/fabric-descriptions')
		.get(fabricDescriptions.list)
		.post(users.requiresLogin, fabricDescriptions.create);

	app.route('/fabric-descriptions/:fabricDescriptionId')
		.get(fabricDescriptions.read)
		.put(users.requiresLogin, fabricDescriptions.hasAuthorization, fabricDescriptions.update)
		.delete(users.requiresLogin, fabricDescriptions.hasAuthorization, fabricDescriptions.delete);

	// Finish by binding the Fabric description middleware
	app.param('fabricDescriptionId', fabricDescriptions.fabricDescriptionByID);
};
