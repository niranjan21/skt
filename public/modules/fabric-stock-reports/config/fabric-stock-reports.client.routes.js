'use strict';

//Setting up route
angular.module('fabric-stock-reports').config(['$stateProvider',
	function($stateProvider) {
		// Fabric stock reports state routing
		$stateProvider.
		state('listFabricStockReports', {
			url: '/fabric-stock-reports',
			templateUrl: 'modules/fabric-stock-reports/views/list-fabric-stock-reports.client.view.html'
		}).
		state('createFabricStockReport', {
			url: '/fabric-stock-reports/create',
			templateUrl: 'modules/fabric-stock-reports/views/create-fabric-stock-report.client.view.html'
		}).
		state('viewFabricStockReport', {
			url: '/fabric-stock-reports/:fabricStockReportId',
			templateUrl: 'modules/fabric-stock-reports/views/view-fabric-stock-report.client.view.html'
		}).
		state('editFabricStockReport', {
			url: '/fabric-stock-reports/:fabricStockReportId/edit',
			templateUrl: 'modules/fabric-stock-reports/views/edit-fabric-stock-report.client.view.html'
		});
	}
]);