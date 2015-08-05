'use strict';

//Shift entries service used to communicate Shift entries REST endpoints
angular.module('shift-entries').factory('ShiftEntries', ['$resource',
	function($resource) {
		return $resource('shift-entries/:shiftEntryId', { shiftEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);