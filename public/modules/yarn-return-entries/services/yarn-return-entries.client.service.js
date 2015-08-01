'use strict';

//Yarn return entries service used to communicate Yarn return entries REST endpoints
angular.module('yarn-return-entries').factory('YarnReturnEntries', ['$resource',
	function($resource) {
		return $resource('yarn-return-entries/:yarnReturnEntryId', { yarnReturnEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);