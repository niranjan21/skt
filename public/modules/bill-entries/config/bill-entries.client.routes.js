'use strict';

//Setting up route
angular.module('bill-entries').config(['$stateProvider',
	function($stateProvider) {
		// Bill entries state routing
		$stateProvider.
		state('listBillEntries', {
			url: '/bill-entries',
			templateUrl: 'modules/bill-entries/views/list-bill-entries.client.view.html'
		}).
		state('createBillEntry', {
			url: '/bill-entries/create',
			templateUrl: 'modules/bill-entries/views/create-bill-entry.client.view.html'
		}).
		state('viewBillEntry', {
			url: '/bill-entries/:billEntryId',
			templateUrl: 'modules/bill-entries/views/view-bill-entry.client.view.html'
		}).
		state('editBillEntry', {
			url: '/bill-entries/:billEntryId/edit',
			templateUrl: 'modules/bill-entries/views/edit-bill-entry.client.view.html'
		});
	}
]);