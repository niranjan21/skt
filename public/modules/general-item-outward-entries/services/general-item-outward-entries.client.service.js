'use strict';

//General item outward entries service used to communicate General item outward entries REST endpoints
angular.module('general-item-outward-entries').factory('GeneralItemOutwardEntries', ['$resource',
	function($resource) {
		return $resource('general-item-outward-entries/:generalItemOutwardEntryId', { generalItemOutwardEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);