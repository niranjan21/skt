'use strict';

//Setting up route
angular.module('job-partial-completions').config(['$stateProvider',
	function($stateProvider) {
		// Job partial completions state routing
		$stateProvider.
		state('listJobPartialCompletions', {
			url: '/job-partial-completions',
			templateUrl: 'modules/job-partial-completions/views/list-job-partial-completions.client.view.html'
		}).
		state('createJobPartialCompletion', {
			url: '/job-partial-completions/create',
			templateUrl: 'modules/job-partial-completions/views/create-job-partial-completion.client.view.html'
		}).
		state('viewJobPartialCompletion', {
			url: '/job-partial-completions/:jobPartialCompletionId',
			templateUrl: 'modules/job-partial-completions/views/view-job-partial-completion.client.view.html'
		}).
		state('editJobPartialCompletion', {
			url: '/job-partial-completions/:jobPartialCompletionId/edit',
			templateUrl: 'modules/job-partial-completions/views/edit-job-partial-completion.client.view.html'
		});
	}
]);