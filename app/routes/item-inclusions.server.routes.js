'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var itemInclusions = require('../../app/controllers/item-inclusions.server.controller');

	// Item inclusions Routes
	app.route('/item-inclusions')
		.get(itemInclusions.list)
		.post(users.requiresLogin, itemInclusions.create);

	app.route('/item-inclusions/:itemInclusionId')
		.get(itemInclusions.read)
		.put(users.requiresLogin, itemInclusions.hasAuthorization, itemInclusions.update)
		.delete(users.requiresLogin, itemInclusions.hasAuthorization, itemInclusions.delete);

	// Finish by binding the Item inclusion middleware
	app.param('itemInclusionId', itemInclusions.itemInclusionByID);
};
