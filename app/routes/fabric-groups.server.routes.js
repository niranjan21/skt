'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricGroups = require('../../app/controllers/fabric-groups.server.controller');

	// Fabric groups Routes
	app.route('/fabric-groups')
		.get(fabricGroups.list)
		.post(users.requiresLogin, fabricGroups.create);

	app.route('/fabric-groups/:fabricGroupId')
		.get(fabricGroups.read)
		.put(users.requiresLogin, fabricGroups.hasAuthorization, fabricGroups.update)
		.delete(users.requiresLogin, fabricGroups.hasAuthorization, fabricGroups.delete);

	// Finish by binding the Fabric group middleware
	app.param('fabricGroupId', fabricGroups.fabricGroupByID);
};
