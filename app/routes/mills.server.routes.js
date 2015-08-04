'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var mills = require('../../app/controllers/mills.server.controller');

	// Mills Routes
	app.route('/mills')
		.get(mills.list)
		.post(users.requiresLogin, mills.create);

	app.route('/mills/:millId')
		.get(mills.read)
		.put(users.requiresLogin, mills.hasAuthorization, mills.update)
		.delete(users.requiresLogin, mills.hasAuthorization, mills.delete);

	// Finish by binding the Mill middleware
	app.param('millId', mills.millByID);
};
