'use strict';

//Setting up route
angular.module('salary-and-wages-entries').config(['$stateProvider',
	function($stateProvider) {
		// Salary and wages entries state routing
		$stateProvider.
		state('listSalaryAndWagesEntries', {
			url: '/salary-and-wages-entries',
			templateUrl: 'modules/salary-and-wages-entries/views/list-salary-and-wages-entries.client.view.html'
		}).
		state('createSalaryAndWagesEntry', {
			url: '/salary-and-wages-entries/create',
			templateUrl: 'modules/salary-and-wages-entries/views/create-salary-and-wages-entry.client.view.html'
		}).
		state('viewSalaryAndWagesEntry', {
			url: '/salary-and-wages-entries/:salaryAndWagesEntryId',
			templateUrl: 'modules/salary-and-wages-entries/views/view-salary-and-wages-entry.client.view.html'
		}).
		state('editSalaryAndWagesEntry', {
			url: '/salary-and-wages-entries/:salaryAndWagesEntryId/edit',
			templateUrl: 'modules/salary-and-wages-entries/views/edit-salary-and-wages-entry.client.view.html'
		});
	}
]);