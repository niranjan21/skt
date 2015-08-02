'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricStockReports = require('../../app/controllers/fabric-stock-reports.server.controller');

	// Fabric stock reports Routes
	app.route('/fabric-stock-reports')
		.get(fabricStockReports.list)
		.post(users.requiresLogin, fabricStockReports.create);

	app.route('/fabric-stock-reports/:fabricStockReportId')
		.get(fabricStockReports.read)
		.put(users.requiresLogin, fabricStockReports.hasAuthorization, fabricStockReports.update)
		.delete(users.requiresLogin, fabricStockReports.hasAuthorization, fabricStockReports.delete);

	// Finish by binding the Fabric stock report middleware
	app.param('fabricStockReportId', fabricStockReports.fabricStockReportByID);
};
