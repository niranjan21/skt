'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var yarnReturns = require('../../app/controllers/yarn-returns.server.controller');

	// Yarn returns Routes
	app.route('/yarn-returns')
		.get(yarnReturns.list)
		.post(users.requiresLogin, yarnReturns.create);

	app.route('/yarn-returns/:yarnReturnId')
		.get(yarnReturns.read)
		.put(users.requiresLogin, yarnReturns.hasAuthorization, yarnReturns.update)
		.delete(users.requiresLogin, yarnReturns.hasAuthorization, yarnReturns.delete);

	// Finish by binding the Yarn return middleware
	app.param('yarnReturnId', yarnReturns.yarnReturnByID);
};
