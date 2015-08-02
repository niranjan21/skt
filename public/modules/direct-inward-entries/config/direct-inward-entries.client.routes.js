'use strict';

//Setting up route
angular.module('direct-inward-entries').config(['$stateProvider',
	function($stateProvider) {
		// Direct inward entries state routing
		$stateProvider.
		state('listDirectInwardEntries', {
			url: '/direct-inward-entries',
			templateUrl: 'modules/direct-inward-entries/views/list-direct-inward-entries.client.view.html'
		}).
		state('createDirectInwardEntry', {
			url: '/direct-inward-entries/create',
			templateUrl: 'modules/direct-inward-entries/views/create-direct-inward-entry.client.view.html'
		}).
		state('viewDirectInwardEntry', {
			url: '/direct-inward-entries/:directInwardEntryId',
			templateUrl: 'modules/direct-inward-entries/views/view-direct-inward-entry.client.view.html'
		}).
		state('editDirectInwardEntry', {
			url: '/direct-inward-entries/:directInwardEntryId/edit',
			templateUrl: 'modules/direct-inward-entries/views/edit-direct-inward-entry.client.view.html'
		});
	}
]);