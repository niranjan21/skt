'use strict';

//Fabric groups service used to communicate Fabric groups REST endpoints
angular.module('fabric-groups').factory('FabricGroups', ['$resource',
	function($resource) {
		return $resource('fabric-groups/:fabricGroupId', { fabricGroupId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);