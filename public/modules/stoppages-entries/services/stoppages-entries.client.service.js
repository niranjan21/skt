'use strict';

//Stoppages entries service used to communicate Stoppages entries REST endpoints
angular.module('stoppages-entries').factory('StoppagesEntries', ['$resource',
	function($resource) {
		return $resource('stoppages-entries/:stoppagesEntryId', { stoppagesEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);