'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var partyMasters = require('../../app/controllers/party-masters.server.controller');

	// Party masters Routes
	app.route('/party-masters')
		.get(partyMasters.list)
		.post(users.requiresLogin, partyMasters.create);

	app.route('/party-masters/:partyMasterId')
		.get(partyMasters.read)
		.put(users.requiresLogin, partyMasters.hasAuthorization, partyMasters.update)
		.delete(users.requiresLogin, partyMasters.hasAuthorization, partyMasters.delete);

	// Finish by binding the Party master middleware
	app.param('partyMasterId', partyMasters.partyMasterByID);
};
