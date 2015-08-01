'use strict';

//Yarn receipt entries service used to communicate Yarn receipt entries REST endpoints
angular.module('yarn-receipt-entries').factory('YarnReceiptEntries', ['$resource',
	function($resource) {
		return $resource('yarn-receipt-entries/:yarnReceiptEntryId', { yarnReceiptEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);