'use strict';

//Fabric transfers service used to communicate Fabric transfers REST endpoints
angular.module('fabric-transfers').factory('FabricTransfers', ['$resource',
	function($resource) {
		return $resource('fabric-transfers/:fabricTransferId', { fabricTransferId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);