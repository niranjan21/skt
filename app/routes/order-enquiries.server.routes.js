'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderEnquiries = require('../../app/controllers/order-enquiries.server.controller');

	// Order enquiries Routes
	app.route('/order-enquiries')
		.get(orderEnquiries.list)
		.post(users.requiresLogin, orderEnquiries.create);

	app.route('/order-enquiries/:orderEnquiryId')
		.get(orderEnquiries.read)
		.put(users.requiresLogin, orderEnquiries.hasAuthorization, orderEnquiries.update)
		.delete(users.requiresLogin, orderEnquiries.hasAuthorization, orderEnquiries.delete);

	// Finish by binding the Order enquiry middleware
	app.param('orderEnquiryId', orderEnquiries.orderEnquiryByID);
};
