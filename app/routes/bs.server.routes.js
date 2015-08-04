'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bs = require('../../app/controllers/bs.server.controller');

	// Bs Routes
	app.route('/bs')
		.get(bs.list)
		.post(users.requiresLogin, bs.create);

	app.route('/bs/:bId')
		.get(bs.read)
		.put(users.requiresLogin, bs.hasAuthorization, bs.update)
		.delete(users.requiresLogin, bs.hasAuthorization, bs.delete);

	// Finish by binding the B middleware
	app.param('bId', bs.bByID);
};
