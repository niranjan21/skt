'use strict';

//Setting up route
angular.module('bulk-needle-change-reports').config(['$stateProvider',
	function($stateProvider) {
		// Bulk needle change reports state routing
		$stateProvider.
		state('listBulkNeedleChangeReports', {
			url: '/bulk-needle-change-reports',
			templateUrl: 'modules/bulk-needle-change-reports/views/list-bulk-needle-change-reports.client.view.html'
		}).
		state('createBulkNeedleChangeReport', {
			url: '/bulk-needle-change-reports/create',
			templateUrl: 'modules/bulk-needle-change-reports/views/create-bulk-needle-change-report.client.view.html'
		}).
		state('viewBulkNeedleChangeReport', {
			url: '/bulk-needle-change-reports/:bulkNeedleChangeReportId',
			templateUrl: 'modules/bulk-needle-change-reports/views/view-bulk-needle-change-report.client.view.html'
		}).
		state('editBulkNeedleChangeReport', {
			url: '/bulk-needle-change-reports/:bulkNeedleChangeReportId/edit',
			templateUrl: 'modules/bulk-needle-change-reports/views/edit-bulk-needle-change-report.client.view.html'
		});
	}
]);