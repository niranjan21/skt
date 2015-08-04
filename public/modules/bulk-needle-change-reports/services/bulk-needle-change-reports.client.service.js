'use strict';

//Bulk needle change reports service used to communicate Bulk needle change reports REST endpoints
angular.module('bulk-needle-change-reports').factory('BulkNeedleChangeReports', ['$resource',
	function($resource) {
		return $resource('bulk-needle-change-reports/:bulkNeedleChangeReportId', { bulkNeedleChangeReportId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);