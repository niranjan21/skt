'use strict';

//Job cards service used to communicate Job cards REST endpoints
angular.module('job-cards').factory('JobCards', ['$resource',
	function($resource) {
		return $resource('job-cards/:jobCardId', { jobCardId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);