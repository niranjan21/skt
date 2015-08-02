'use strict';

//General item outward registers service used to communicate General item outward registers REST endpoints
angular.module('general-item-outward-registers').factory('GeneralItemOutwardRegisters', ['$resource',
	function($resource) {
		return $resource('general-item-outward-registers/:generalItemOutwardRegisterId', { generalItemOutwardRegisterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);