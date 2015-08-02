'use strict';

//Direct inward entries service used to communicate Direct inward entries REST endpoints
angular.module('direct-inward-entries').factory('DirectInwardEntries', ['$resource',
	function($resource) {
		return $resource('direct-inward-entries/:directInwardEntryId', { directInwardEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);