'use strict';

//Bill entries service used to communicate Bill entries REST endpoints
angular.module('bill-entries').factory('BillEntries', ['$resource',
	function($resource) {
		return $resource('bill-entries/:billEntryId', { billEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);