'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bulkNeedleChangeReports = require('../../app/controllers/bulk-needle-change-reports.server.controller');

	// Bulk needle change reports Routes
	app.route('/bulk-needle-change-reports')
		.get(bulkNeedleChangeReports.list)
		.post(users.requiresLogin, bulkNeedleChangeReports.create);

	app.route('/bulk-needle-change-reports/:bulkNeedleChangeReportId')
		.get(bulkNeedleChangeReports.read)
		.put(users.requiresLogin, bulkNeedleChangeReports.hasAuthorization, bulkNeedleChangeReports.update)
		.delete(users.requiresLogin, bulkNeedleChangeReports.hasAuthorization, bulkNeedleChangeReports.delete);

	// Finish by binding the Bulk needle change report middleware
	app.param('bulkNeedleChangeReportId', bulkNeedleChangeReports.bulkNeedleChangeReportByID);
};
