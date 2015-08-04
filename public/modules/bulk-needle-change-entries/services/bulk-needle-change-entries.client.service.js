'use strict';

//Bulk needle change entries service used to communicate Bulk needle change entries REST endpoints
angular.module('bulk-needle-change-entries').factory('BulkNeedleChangeEntries', ['$resource',
	function($resource) {
		return $resource('bulk-needle-change-entries/:bulkNeedleChangeEntryId', { bulkNeedleChangeEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);