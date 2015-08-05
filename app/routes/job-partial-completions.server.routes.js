'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var jobPartialCompletions = require('../../app/controllers/job-partial-completions.server.controller');

	// Job partial completions Routes
	app.route('/job-partial-completions')
		.get(jobPartialCompletions.list)
		.post(users.requiresLogin, jobPartialCompletions.create);

	app.route('/job-partial-completions/:jobPartialCompletionId')
		.get(jobPartialCompletions.read)
		.put(users.requiresLogin, jobPartialCompletions.hasAuthorization, jobPartialCompletions.update)
		.delete(users.requiresLogin, jobPartialCompletions.hasAuthorization, jobPartialCompletions.delete);

	// Finish by binding the Job partial completion middleware
	app.param('jobPartialCompletionId', jobPartialCompletions.jobPartialCompletionByID);
};
