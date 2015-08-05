'use strict';

//Job partial completions service used to communicate Job partial completions REST endpoints
angular.module('job-partial-completions').factory('JobPartialCompletions', ['$resource',
	function($resource) {
		return $resource('job-partial-completions/:jobPartialCompletionId', { jobPartialCompletionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);