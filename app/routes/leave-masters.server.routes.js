'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var leaveMasters = require('../../app/controllers/leave-masters.server.controller');

	// Leave masters Routes
	app.route('/leave-masters')
		.get(leaveMasters.list)
		.post(users.requiresLogin, leaveMasters.create);

	app.route('/leave-masters/:leaveMasterId')
		.get(leaveMasters.read)
		.put(users.requiresLogin, leaveMasters.hasAuthorization, leaveMasters.update)
		.delete(users.requiresLogin, leaveMasters.hasAuthorization, leaveMasters.delete);

	// Finish by binding the Leave master middleware
	app.param('leaveMasterId', leaveMasters.leaveMasterByID);
};
