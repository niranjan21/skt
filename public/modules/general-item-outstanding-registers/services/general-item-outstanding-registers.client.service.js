'use strict';

//General item outstanding registers service used to communicate General item outstanding registers REST endpoints
angular.module('general-item-outstanding-registers').factory('GeneralItemOutstandingRegisters', ['$resource',
	function($resource) {
		return $resource('general-item-outstanding-registers/:generalItemOutstandingRegisterId', { generalItemOutstandingRegisterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);