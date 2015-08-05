'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var productionReports = require('../../app/controllers/production-reports.server.controller');

	// Production reports Routes
	app.route('/production-reports')
		.get(productionReports.list)
		.post(users.requiresLogin, productionReports.create);

	app.route('/production-reports/:productionReportId')
		.get(productionReports.read)
		.put(users.requiresLogin, productionReports.hasAuthorization, productionReports.update)
		.delete(users.requiresLogin, productionReports.hasAuthorization, productionReports.delete);

	// Finish by binding the Production report middleware
	app.param('productionReportId', productionReports.productionReportByID);
};
