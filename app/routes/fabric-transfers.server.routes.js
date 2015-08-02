'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricTransfers = require('../../app/controllers/fabric-transfers.server.controller');

	// Fabric transfers Routes
	app.route('/fabric-transfers')
		.get(fabricTransfers.list)
		.post(users.requiresLogin, fabricTransfers.create);

	app.route('/fabric-transfers/:fabricTransferId')
		.get(fabricTransfers.read)
		.put(users.requiresLogin, fabricTransfers.hasAuthorization, fabricTransfers.update)
		.delete(users.requiresLogin, fabricTransfers.hasAuthorization, fabricTransfers.delete);

	// Finish by binding the Fabric transfer middleware
	app.param('fabricTransferId', fabricTransfers.fabricTransferByID);
};
