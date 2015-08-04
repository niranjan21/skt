'use strict';

//Mills service used to communicate Mills REST endpoints
angular.module('mills').factory('Mills', ['$resource',
	function($resource) {
		return $resource('mills/:millId', { millId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);