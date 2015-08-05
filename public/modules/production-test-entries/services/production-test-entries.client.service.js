'use strict';

//Production test entries service used to communicate Production test entries REST endpoints
angular.module('production-test-entries').factory('ProductionTestEntries', ['$resource',
	function($resource) {
		return $resource('production-test-entries/:productionTestEntryId', { productionTestEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);