'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var jobCards = require('../../app/controllers/job-cards.server.controller');

	// Job cards Routes
	app.route('/job-cards')
		.get(jobCards.list)
		.post(users.requiresLogin, jobCards.create);

	app.route('/job-cards/:jobCardId')
		.get(jobCards.read)
		.put(users.requiresLogin, jobCards.hasAuthorization, jobCards.update)
		.delete(users.requiresLogin, jobCards.hasAuthorization, jobCards.delete);

	// Finish by binding the Job card middleware
	app.param('jobCardId', jobCards.jobCardByID);
};
