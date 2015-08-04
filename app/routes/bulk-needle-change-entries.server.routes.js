'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bulkNeedleChangeEntries = require('../../app/controllers/bulk-needle-change-entries.server.controller');

	// Bulk needle change entries Routes
	app.route('/bulk-needle-change-entries')
		.get(bulkNeedleChangeEntries.list)
		.post(users.requiresLogin, bulkNeedleChangeEntries.create);

	app.route('/bulk-needle-change-entries/:bulkNeedleChangeEntryId')
		.get(bulkNeedleChangeEntries.read)
		.put(users.requiresLogin, bulkNeedleChangeEntries.hasAuthorization, bulkNeedleChangeEntries.update)
		.delete(users.requiresLogin, bulkNeedleChangeEntries.hasAuthorization, bulkNeedleChangeEntries.delete);

	// Finish by binding the Bulk needle change entry middleware
	app.param('bulkNeedleChangeEntryId', bulkNeedleChangeEntries.bulkNeedleChangeEntryByID);
};
