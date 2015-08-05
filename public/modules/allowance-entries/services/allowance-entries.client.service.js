'use strict';

//Allowance entries service used to communicate Allowance entries REST endpoints
angular.module('allowance-entries').factory('AllowanceEntries', ['$resource',
	function($resource) {
		return $resource('allowance-entries/:allowanceEntryId', { allowanceEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);