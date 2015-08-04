'use strict';

//Stoppages service used to communicate Stoppages REST endpoints
angular.module('stoppages').factory('Stoppages', ['$resource',
	function($resource) {
		return $resource('stoppages/:stoppageId', { stoppageId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);