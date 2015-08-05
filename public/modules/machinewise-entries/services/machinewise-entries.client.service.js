'use strict';

//Machinewise entries service used to communicate Machinewise entries REST endpoints
angular.module('machinewise-entries').factory('MachinewiseEntries', ['$resource',
	function($resource) {
		return $resource('machinewise-entries/:machinewiseEntryId', { machinewiseEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);