'use strict';

//Fabric stock reports service used to communicate Fabric stock reports REST endpoints
angular.module('fabric-stock-reports').factory('FabricStockReports', ['$resource',
	function($resource) {
		return $resource('fabric-stock-reports/:fabricStockReportId', { fabricStockReportId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);