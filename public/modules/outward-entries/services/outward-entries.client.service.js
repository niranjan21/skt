'use strict';

//Outward entries service used to communicate Outward entries REST endpoints
angular.module('outward-entries').factory('OutwardEntries', ['$resource',
	function($resource) {
		return $resource('outward-entries/:outwardEntryId', { outwardEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);