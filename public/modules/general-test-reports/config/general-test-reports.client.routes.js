'use strict';

//Setting up route
angular.module('general-test-reports').config(['$stateProvider',
	function($stateProvider) {
		// General test reports state routing
		$stateProvider.
		state('listGeneralTestReports', {
			url: '/general-test-reports',
			templateUrl: 'modules/general-test-reports/views/list-general-test-reports.client.view.html'
		}).
		state('createGeneralTestReport', {
			url: '/general-test-reports/create',
			templateUrl: 'modules/general-test-reports/views/create-general-test-report.client.view.html'
		}).
		state('viewGeneralTestReport', {
			url: '/general-test-reports/:generalTestReportId',
			templateUrl: 'modules/general-test-reports/views/view-general-test-report.client.view.html'
		}).
		state('editGeneralTestReport', {
			url: '/general-test-reports/:generalTestReportId/edit',
			templateUrl: 'modules/general-test-reports/views/edit-general-test-report.client.view.html'
		});
	}
]);