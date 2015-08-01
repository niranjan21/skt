'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var yarnReceiptEntries = require('../../app/controllers/yarn-receipt-entries.server.controller');

	// Yarn receipt entries Routes
	app.route('/yarn-receipt-entries')
		.get(yarnReceiptEntries.list)
		.post(users.requiresLogin, yarnReceiptEntries.create);

	app.route('/yarn-receipt-entries/:yarnReceiptEntryId')
		.get(yarnReceiptEntries.read)
		.put(users.requiresLogin, yarnReceiptEntries.hasAuthorization, yarnReceiptEntries.update)
		.delete(users.requiresLogin, yarnReceiptEntries.hasAuthorization, yarnReceiptEntries.delete);

	// Finish by binding the Yarn receipt entry middleware
	app.param('yarnReceiptEntryId', yarnReceiptEntries.yarnReceiptEntryByID);
};
