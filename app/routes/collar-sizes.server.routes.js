'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var collarSizes = require('../../app/controllers/collar-sizes.server.controller');

	// Collar sizes Routes
	app.route('/collar-sizes')
		.get(collarSizes.list)
		.post(users.requiresLogin, collarSizes.create);

	app.route('/collar-sizes/:collarSizeId')
		.get(collarSizes.read)
		.put(users.requiresLogin, collarSizes.hasAuthorization, collarSizes.update)
		.delete(users.requiresLogin, collarSizes.hasAuthorization, collarSizes.delete);

	// Finish by binding the Collar size middleware
	app.param('collarSizeId', collarSizes.collarSizeByID);
};
