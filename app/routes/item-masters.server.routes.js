'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var itemMasters = require('../../app/controllers/item-masters.server.controller');

	// Item masters Routes
	app.route('/item-masters')
		.get(itemMasters.list)
		.post(users.requiresLogin, itemMasters.create);

	app.route('/item-masters/:itemMasterId')
		.get(itemMasters.read)
		.put(users.requiresLogin, itemMasters.hasAuthorization, itemMasters.update)
		.delete(users.requiresLogin, itemMasters.hasAuthorization, itemMasters.delete);

	// Finish by binding the Item master middleware
	app.param('itemMasterId', itemMasters.itemMasterByID);
};
