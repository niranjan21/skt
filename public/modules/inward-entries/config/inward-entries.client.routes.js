'use strict';

//Setting up route
angular.module('inward-entries').config(['$stateProvider',
	function($stateProvider) {
		// Inward entries state routing
		$stateProvider.
		state('listInwardEntries', {
			url: '/inward-entries',
			templateUrl: 'modules/inward-entries/views/list-inward-entries.client.view.html'
		}).
		state('createInwardEntry', {
			url: '/inward-entries/create',
			templateUrl: 'modules/inward-entries/views/create-inward-entry.client.view.html'
		}).
		state('viewInwardEntry', {
			url: '/inward-entries/:inwardEntryId',
			templateUrl: 'modules/inward-entries/views/view-inward-entry.client.view.html'
		}).
		state('editInwardEntry', {
			url: '/inward-entries/:inwardEntryId/edit',
			templateUrl: 'modules/inward-entries/views/edit-inward-entry.client.view.html'
		});
	}
]);