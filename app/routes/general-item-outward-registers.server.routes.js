'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var generalItemOutwardRegisters = require('../../app/controllers/general-item-outward-registers.server.controller');

	// General item outward registers Routes
	app.route('/general-item-outward-registers')
		.get(generalItemOutwardRegisters.list)
		.post(users.requiresLogin, generalItemOutwardRegisters.create);

	app.route('/general-item-outward-registers/:generalItemOutwardRegisterId')
		.get(generalItemOutwardRegisters.read)
		.put(users.requiresLogin, generalItemOutwardRegisters.hasAuthorization, generalItemOutwardRegisters.update)
		.delete(users.requiresLogin, generalItemOutwardRegisters.hasAuthorization, generalItemOutwardRegisters.delete);

	// Finish by binding the General item outward register middleware
	app.param('generalItemOutwardRegisterId', generalItemOutwardRegisters.generalItemOutwardRegisterByID);
};
