'use strict';

//Fabric return entries service used to communicate Fabric return entries REST endpoints
angular.module('fabric-return-entries').factory('FabricReturnEntries', ['$resource',
	function($resource) {
		return $resource('fabric-return-entries/:fabricReturnEntryId', { fabricReturnEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);