'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricReceipts = require('../../app/controllers/fabric-receipts.server.controller');

	// Fabric receipts Routes
	app.route('/fabric-receipts')
		.get(fabricReceipts.list)
		.post(users.requiresLogin, fabricReceipts.create);

	app.route('/fabric-receipts/:fabricReceiptId')
		.get(fabricReceipts.read)
		.put(users.requiresLogin, fabricReceipts.hasAuthorization, fabricReceipts.update)
		.delete(users.requiresLogin, fabricReceipts.hasAuthorization, fabricReceipts.delete);

	// Finish by binding the Fabric receipt middleware
	app.param('fabricReceiptId', fabricReceipts.fabricReceiptByID);
};
