'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var needlesInwardRegisters = require('../../app/controllers/needles-inward-registers.server.controller');

	// Needles inward registers Routes
	app.route('/needles-inward-registers')
		.get(needlesInwardRegisters.list)
		.post(users.requiresLogin, needlesInwardRegisters.create);

	app.route('/needles-inward-registers/:needlesInwardRegisterId')
		.get(needlesInwardRegisters.read)
		.put(users.requiresLogin, needlesInwardRegisters.hasAuthorization, needlesInwardRegisters.update)
		.delete(users.requiresLogin, needlesInwardRegisters.hasAuthorization, needlesInwardRegisters.delete);

	// Finish by binding the Needles inward register middleware
	app.param('needlesInwardRegisterId', needlesInwardRegisters.needlesInwardRegisterByID);
};
