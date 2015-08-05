'use strict';

//Deduction entries service used to communicate Deduction entries REST endpoints
angular.module('deduction-entries').factory('DeductionEntries', ['$resource',
	function($resource) {
		return $resource('deduction-entries/:deductionEntryId', { deductionEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);