'use strict';

//Rollwise entries service used to communicate Rollwise entries REST endpoints
angular.module('rollwise-entries').factory('RollwiseEntries', ['$resource',
	function($resource) {
		return $resource('rollwise-entries/:rollwiseEntryId', { rollwiseEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);