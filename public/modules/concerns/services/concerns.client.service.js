'use strict';

//Concerns service used to communicate Concerns REST endpoints
angular.module('concerns').factory('Concerns', ['$resource',
	function($resource) {
		return $resource('concerns/:concernId', { concernId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);