'use strict';

//Fabric item masters service used to communicate Fabric item masters REST endpoints
angular.module('fabric-item-masters').factory('FabricItemMasters', ['$resource',
	function($resource) {
		return $resource('fabric-item-masters/:fabricItemMasterId', { fabricItemMasterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);