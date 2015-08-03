'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var invoiceEntries = require('../../app/controllers/invoice-entries.server.controller');

	// Invoice entries Routes
	app.route('/invoice-entries')
		.get(invoiceEntries.list)
		.post(users.requiresLogin, invoiceEntries.create);

	app.route('/invoice-entries/:invoiceEntryId')
		.get(invoiceEntries.read)
		.put(users.requiresLogin, invoiceEntries.hasAuthorization, invoiceEntries.update)
		.delete(users.requiresLogin, invoiceEntries.hasAuthorization, invoiceEntries.delete);

	// Finish by binding the Invoice entry middleware
	app.param('invoiceEntryId', invoiceEntries.invoiceEntryByID);
};
