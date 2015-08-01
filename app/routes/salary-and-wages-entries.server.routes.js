'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var salaryAndWagesEntries = require('../../app/controllers/salary-and-wages-entries.server.controller');

	// Salary and wages entries Routes
	app.route('/salary-and-wages-entries')
		.get(salaryAndWagesEntries.list)
		.post(users.requiresLogin, salaryAndWagesEntries.create);

	app.route('/salary-and-wages-entries/:salaryAndWagesEntryId')
		.get(salaryAndWagesEntries.read)
		.put(users.requiresLogin, salaryAndWagesEntries.hasAuthorization, salaryAndWagesEntries.update)
		.delete(users.requiresLogin, salaryAndWagesEntries.hasAuthorization, salaryAndWagesEntries.delete);

	// Finish by binding the Salary and wages entry middleware
	app.param('salaryAndWagesEntryId', salaryAndWagesEntries.salaryAndWagesEntryByID);
};
