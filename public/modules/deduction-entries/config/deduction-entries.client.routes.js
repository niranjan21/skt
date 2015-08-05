'use strict';

//Setting up route
angular.module('deduction-entries').config(['$stateProvider',
	function($stateProvider) {
		// Deduction entries state routing
		$stateProvider.
		state('listDeductionEntries', {
			url: '/deduction-entries',
			templateUrl: 'modules/deduction-entries/views/list-deduction-entries.client.view.html'
		}).
		state('createDeductionEntry', {
			url: '/deduction-entries/create',
			templateUrl: 'modules/deduction-entries/views/create-deduction-entry.client.view.html'
		}).
		state('viewDeductionEntry', {
			url: '/deduction-entries/:deductionEntryId',
			templateUrl: 'modules/deduction-entries/views/view-deduction-entry.client.view.html'
		}).
		state('editDeductionEntry', {
			url: '/deduction-entries/:deductionEntryId/edit',
			templateUrl: 'modules/deduction-entries/views/edit-deduction-entry.client.view.html'
		});
	}
]);