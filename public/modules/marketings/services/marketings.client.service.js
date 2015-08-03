'use strict';

//Marketings service used to communicate Marketings REST endpoints
angular.module('marketings').factory('Marketings', ['$resource',
	function($resource) {
		return $resource('marketings/:marketingId', { marketingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);