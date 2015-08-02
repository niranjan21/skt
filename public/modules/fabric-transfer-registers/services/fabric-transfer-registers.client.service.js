'use strict';

//Fabric transfer registers service used to communicate Fabric transfer registers REST endpoints
angular.module('fabric-transfer-registers').factory('FabricTransferRegisters', ['$resource',
	function($resource) {
		return $resource('fabric-transfer-registers/:fabricTransferRegisterId', { fabricTransferRegisterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);