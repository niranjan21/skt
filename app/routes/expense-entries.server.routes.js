'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var expenseEntries = require('../../app/controllers/expense-entries.server.controller');

	// Expense entries Routes
	app.route('/expense-entries')
		.get(expenseEntries.list)
		.post(users.requiresLogin, expenseEntries.create);

	app.route('/expense-entries/:expenseEntryId')
		.get(expenseEntries.read)
		.put(users.requiresLogin, expenseEntries.hasAuthorization, expenseEntries.update)
		.delete(users.requiresLogin, expenseEntries.hasAuthorization, expenseEntries.delete);

	// Finish by binding the Expense entry middleware
	app.param('expenseEntryId', expenseEntries.expenseEntryByID);
};
