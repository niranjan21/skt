'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var marketings = require('../../app/controllers/marketings.server.controller');

	// Marketings Routes
	app.route('/marketings')
		.get(marketings.list)
		.post(users.requiresLogin, marketings.create);

	app.route('/marketings/:marketingId')
		.get(marketings.read)
		.put(users.requiresLogin, marketings.hasAuthorization, marketings.update)
		.delete(users.requiresLogin, marketings.hasAuthorization, marketings.delete);

	// Finish by binding the Marketing middleware
	app.param('marketingId', marketings.marketingByID);
};
