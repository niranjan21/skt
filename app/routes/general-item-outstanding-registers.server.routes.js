'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var generalItemOutstandingRegisters = require('../../app/controllers/general-item-outstanding-registers.server.controller');

	// General item outstanding registers Routes
	app.route('/general-item-outstanding-registers')
		.get(generalItemOutstandingRegisters.list)
		.post(users.requiresLogin, generalItemOutstandingRegisters.create);

	app.route('/general-item-outstanding-registers/:generalItemOutstandingRegisterId')
		.get(generalItemOutstandingRegisters.read)
		.put(users.requiresLogin, generalItemOutstandingRegisters.hasAuthorization, generalItemOutstandingRegisters.update)
		.delete(users.requiresLogin, generalItemOutstandingRegisters.hasAuthorization, generalItemOutstandingRegisters.delete);

	// Finish by binding the General item outstanding register middleware
	app.param('generalItemOutstandingRegisterId', generalItemOutstandingRegisters.generalItemOutstandingRegisterByID);
};
