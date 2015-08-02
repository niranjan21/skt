'use strict';

//Fabric sale registers service used to communicate Fabric sale registers REST endpoints
angular.module('fabric-sale-registers').factory('FabricSaleRegisters', ['$resource',
	function($resource) {
		return $resource('fabric-sale-registers/:fabricSaleRegisterId', { fabricSaleRegisterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);