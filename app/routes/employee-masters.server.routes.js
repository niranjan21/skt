'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var employeeMasters = require('../../app/controllers/employee-masters.server.controller');

	// Employee masters Routes
	app.route('/employee-masters')
		.get(employeeMasters.list)
		.post(users.requiresLogin, employeeMasters.create);

	app.route('/employee-masters/:employeeMasterId')
		.get(employeeMasters.read)
		.put(users.requiresLogin, employeeMasters.hasAuthorization, employeeMasters.update)
		.delete(users.requiresLogin, employeeMasters.hasAuthorization, employeeMasters.delete);

	// Finish by binding the Employee master middleware
	app.param('employeeMasterId', employeeMasters.employeeMasterByID);
};
