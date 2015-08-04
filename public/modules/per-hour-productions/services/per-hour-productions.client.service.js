'use strict';

//Per hour productions service used to communicate Per hour productions REST endpoints
angular.module('per-hour-productions').factory('PerHourProductions', ['$resource',
	function($resource) {
		return $resource('per-hour-productions/:perHourProductionId', { perHourProductionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);