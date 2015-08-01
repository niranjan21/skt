'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fabricRequirementInwardEntries = require('../../app/controllers/fabric-requirement-inward-entries.server.controller');

	// Fabric requirement inward entries Routes
	app.route('/fabric-requirement-inward-entries')
		.get(fabricRequirementInwardEntries.list)
		.post(users.requiresLogin, fabricRequirementInwardEntries.create);

	app.route('/fabric-requirement-inward-entries/:fabricRequirementInwardEntryId')
		.get(fabricRequirementInwardEntries.read)
		.put(users.requiresLogin, fabricRequirementInwardEntries.hasAuthorization, fabricRequirementInwardEntries.update)
		.delete(users.requiresLogin, fabricRequirementInwardEntries.hasAuthorization, fabricRequirementInwardEntries.delete);

	// Finish by binding the Fabric requirement inward entry middleware
	app.param('fabricRequirementInwardEntryId', fabricRequirementInwardEntries.fabricRequirementInwardEntryByID);
};
