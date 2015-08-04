'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var partyAllots = require('../../app/controllers/party-allots.server.controller');

	// Party allots Routes
	app.route('/party-allots')
		.get(partyAllots.list)
		.post(users.requiresLogin, partyAllots.create);

	app.route('/party-allots/:partyAllotId')
		.get(partyAllots.read)
		.put(users.requiresLogin, partyAllots.hasAuthorization, partyAllots.update)
		.delete(users.requiresLogin, partyAllots.hasAuthorization, partyAllots.delete);

	// Finish by binding the Party allot middleware
	app.param('partyAllotId', partyAllots.partyAllotByID);
};
