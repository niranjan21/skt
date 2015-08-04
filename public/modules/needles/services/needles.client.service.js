'use strict';

//Needles service used to communicate Needles REST endpoints
angular.module('needles').factory('Needles', ['$resource',
	function($resource) {
		return $resource('needles/:needleId', { needleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);