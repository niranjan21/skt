'use strict';

//Production reports service used to communicate Production reports REST endpoints
angular.module('production-reports').factory('ProductionReports', ['$resource',
	function($resource) {
		return $resource('production-reports/:productionReportId', { productionReportId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);