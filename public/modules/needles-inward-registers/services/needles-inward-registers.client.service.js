'use strict';

//Needles inward registers service used to communicate Needles inward registers REST endpoints
angular.module('needles-inward-registers').factory('NeedlesInwardRegisters', ['$resource',
	function($resource) {
		return $resource('needles-inward-registers/:needlesInwardRegisterId', { needlesInwardRegisterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);