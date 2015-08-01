'use strict';

//Payment entries service used to communicate Payment entries REST endpoints
angular.module('payment-entries').factory('PaymentEntries', ['$resource',
	function($resource) {
		return $resource('payment-entries/:paymentEntryId', { paymentEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);