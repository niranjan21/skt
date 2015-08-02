'use strict';

//Fabric sales service used to communicate Fabric sales REST endpoints
angular.module('fabric-sales').factory('FabricSales', ['$resource',
	function($resource) {
		return $resource('fabric-sales/:fabricSaleId', { fabricSaleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);