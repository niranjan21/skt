'use strict';

//Setting up route
angular.module('production-reports').config(['$stateProvider',
	function($stateProvider) {
		// Production reports state routing
		$stateProvider.
		state('listProductionReports', {
			url: '/production-reports',
			templateUrl: 'modules/production-reports/views/list-production-reports.client.view.html'
		}).
		state('createProductionReport', {
			url: '/production-reports/create',
			templateUrl: 'modules/production-reports/views/create-production-report.client.view.html'
		}).
		state('viewProductionReport', {
			url: '/production-reports/:productionReportId',
			templateUrl: 'modules/production-reports/views/view-production-report.client.view.html'
		}).
		state('editProductionReport', {
			url: '/production-reports/:productionReportId/edit',
			templateUrl: 'modules/production-reports/views/edit-production-report.client.view.html'
		});
	}
]);