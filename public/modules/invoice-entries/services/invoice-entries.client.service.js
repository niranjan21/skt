'use strict';

//Invoice entries service used to communicate Invoice entries REST endpoints
angular.module('invoice-entries').factory('InvoiceEntries', ['$resource',
	function($resource) {
		return $resource('invoice-entries/:invoiceEntryId', { invoiceEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);