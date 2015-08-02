'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricTransferRegisters = require('../../app/controllers/fabric-transfer-registers.server.controller');

	// Fabric transfer registers Routes
	app.route('/fabric-transfer-registers')
		.get(fabricTransferRegisters.list)
		.post(users.requiresLogin, fabricTransferRegisters.create);

	app.route('/fabric-transfer-registers/:fabricTransferRegisterId')
		.get(fabricTransferRegisters.read)
		.put(users.requiresLogin, fabricTransferRegisters.hasAuthorization, fabricTransferRegisters.update)
		.delete(users.requiresLogin, fabricTransferRegisters.hasAuthorization, fabricTransferRegisters.delete);

	// Finish by binding the Fabric transfer register middleware
	app.param('fabricTransferRegisterId', fabricTransferRegisters.fabricTransferRegisterByID);
};
