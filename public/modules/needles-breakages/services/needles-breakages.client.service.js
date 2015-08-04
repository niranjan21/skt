'use strict';

//Needles breakages service used to communicate Needles breakages REST endpoints
angular.module('needles-breakages').factory('NeedlesBreakages', ['$resource',
	function($resource) {
		return $resource('needles-breakages/:needlesBreakageId', { needlesBreakageId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);