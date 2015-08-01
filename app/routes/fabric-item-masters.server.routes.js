'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricItemMasters = require('../../app/controllers/fabric-item-masters.server.controller');

	// Fabric item masters Routes
	app.route('/fabric-item-masters')
		.get(fabricItemMasters.list)
		.post(users.requiresLogin, fabricItemMasters.create);

	app.route('/fabric-item-masters/:fabricItemMasterId')
		.get(fabricItemMasters.read)
		.put(users.requiresLogin, fabricItemMasters.hasAuthorization, fabricItemMasters.update)
		.delete(users.requiresLogin, fabricItemMasters.hasAuthorization, fabricItemMasters.delete);

	// Finish by binding the Fabric item master middleware
	app.param('fabricItemMasterId', fabricItemMasters.fabricItemMasterByID);
};
