'use strict';

//Fabric receipts service used to communicate Fabric receipts REST endpoints
angular.module('fabric-receipts').factory('FabricReceipts', ['$resource',
	function($resource) {
		return $resource('fabric-receipts/:fabricReceiptId', { fabricReceiptId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);