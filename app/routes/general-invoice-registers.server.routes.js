'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var generalInvoiceRegisters = require('../../app/controllers/general-invoice-registers.server.controller');

	// General invoice registers Routes
	app.route('/general-invoice-registers')
		.get(generalInvoiceRegisters.list)
		.post(users.requiresLogin, generalInvoiceRegisters.create);

	app.route('/general-invoice-registers/:generalInvoiceRegisterId')
		.get(generalInvoiceRegisters.read)
		.put(users.requiresLogin, generalInvoiceRegisters.hasAuthorization, generalInvoiceRegisters.update)
		.delete(users.requiresLogin, generalInvoiceRegisters.hasAuthorization, generalInvoiceRegisters.delete);

	// Finish by binding the General invoice register middleware
	app.param('generalInvoiceRegisterId', generalInvoiceRegisters.generalInvoiceRegisterByID);
};
