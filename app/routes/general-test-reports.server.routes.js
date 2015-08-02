'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var generalTestReports = require('../../app/controllers/general-test-reports.server.controller');

	// General test reports Routes
	app.route('/general-test-reports')
		.get(generalTestReports.list)
		.post(users.requiresLogin, generalTestReports.create);

	app.route('/general-test-reports/:generalTestReportId')
		.get(generalTestReports.read)
		.put(users.requiresLogin, generalTestReports.hasAuthorization, generalTestReports.update)
		.delete(users.requiresLogin, generalTestReports.hasAuthorization, generalTestReports.delete);

	// Finish by binding the General test report middleware
	app.param('generalTestReportId', generalTestReports.generalTestReportByID);
};
