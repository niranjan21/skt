'use strict';

//Direct outward entries service used to communicate Direct outward entries REST endpoints
angular.module('direct-outward-entries').factory('DirectOutwardEntries', ['$resource',
	function($resource) {
		return $resource('direct-outward-entries/:directOutwardEntryId', { directOutwardEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);