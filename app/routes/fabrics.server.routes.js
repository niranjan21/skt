'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabrics = require('../../app/controllers/fabrics.server.controller');

	// Fabrics Routes
	app.route('/fabrics')
		.get(fabrics.list)
		.post(users.requiresLogin, fabrics.create);

	app.route('/fabrics/:fabricId')
		.get(fabrics.read)
		.put(users.requiresLogin, fabrics.hasAuthorization, fabrics.update)
		.delete(users.requiresLogin, fabrics.hasAuthorization, fabrics.delete);

	// Finish by binding the Fabric middleware
	app.param('fabricId', fabrics.fabricByID);
};
