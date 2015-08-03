'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var countMasters = require('../../app/controllers/count-masters.server.controller');

	// Count masters Routes
	app.route('/count-masters')
		.get(countMasters.list)
		.post(users.requiresLogin, countMasters.create);

	app.route('/count-masters/:countMasterId')
		.get(countMasters.read)
		.put(users.requiresLogin, countMasters.hasAuthorization, countMasters.update)
		.delete(users.requiresLogin, countMasters.hasAuthorization, countMasters.delete);

	// Finish by binding the Count master middleware
	app.param('countMasterId', countMasters.countMasterByID);
};
