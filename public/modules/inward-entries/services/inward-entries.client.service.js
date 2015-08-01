'use strict';

//Inward entries service used to communicate Inward entries REST endpoints
angular.module('inward-entries').factory('InwardEntries', ['$resource',
	function($resource) {
		return $resource('inward-entries/:inwardEntryId', { inwardEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);