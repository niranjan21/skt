'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var paymentEntries = require('../../app/controllers/payment-entries.server.controller');

	// Payment entries Routes
	app.route('/payment-entries')
		.get(paymentEntries.list)
		.post(users.requiresLogin, paymentEntries.create);

	app.route('/payment-entries/:paymentEntryId')
		.get(paymentEntries.read)
		.put(users.requiresLogin, paymentEntries.hasAuthorization, paymentEntries.update)
		.delete(users.requiresLogin, paymentEntries.hasAuthorization, paymentEntries.delete);

	// Finish by binding the Payment entry middleware
	app.param('paymentEntryId', paymentEntries.paymentEntryByID);
};
