'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var productionParameters = require('../../app/controllers/production-parameters.server.controller');

	// Production parameters Routes
	app.route('/production-parameters')
		.get(productionParameters.list)
		.post(users.requiresLogin, productionParameters.create);

	app.route('/production-parameters/:productionParameterId')
		.get(productionParameters.read)
		.put(users.requiresLogin, productionParameters.hasAuthorization, productionParameters.update)
		.delete(users.requiresLogin, productionParameters.hasAuthorization, productionParameters.delete);

	// Finish by binding the Production parameter middleware
	app.param('productionParameterId', productionParameters.productionParameterByID);
};
