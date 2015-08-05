'use strict';

//Setting up route
angular.module('allowance-entries').config(['$stateProvider',
	function($stateProvider) {
		// Allowance entries state routing
		$stateProvider.
		state('listAllowanceEntries', {
			url: '/allowance-entries',
			templateUrl: 'modules/allowance-entries/views/list-allowance-entries.client.view.html'
		}).
		state('createAllowanceEntry', {
			url: '/allowance-entries/create',
			templateUrl: 'modules/allowance-entries/views/create-allowance-entry.client.view.html'
		}).
		state('viewAllowanceEntry', {
			url: '/allowance-entries/:allowanceEntryId',
			templateUrl: 'modules/allowance-entries/views/view-allowance-entry.client.view.html'
		}).
		state('editAllowanceEntry', {
			url: '/allowance-entries/:allowanceEntryId/edit',
			templateUrl: 'modules/allowance-entries/views/edit-allowance-entry.client.view.html'
		});
	}
]);