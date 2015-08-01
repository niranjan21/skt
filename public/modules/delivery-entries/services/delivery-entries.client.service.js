'use strict';

//Delivery entries service used to communicate Delivery entries REST endpoints
angular.module('delivery-entries').factory('DeliveryEntries', ['$resource',
	function($resource) {
		return $resource('delivery-entries/:deliveryEntryId', { deliveryEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);