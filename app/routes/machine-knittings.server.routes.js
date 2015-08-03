'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var machineKnittings = require('../../app/controllers/machine-knittings.server.controller');

	// Machine knittings Routes
	app.route('/machine-knittings')
		.get(machineKnittings.list)
		.post(users.requiresLogin, machineKnittings.create);

	app.route('/machine-knittings/:machineKnittingId')
		.get(machineKnittings.read)
		.put(users.requiresLogin, machineKnittings.hasAuthorization, machineKnittings.update)
		.delete(users.requiresLogin, machineKnittings.hasAuthorization, machineKnittings.delete);

	// Finish by binding the Machine knitting middleware
	app.param('machineKnittingId', machineKnittings.machineKnittingByID);
};
