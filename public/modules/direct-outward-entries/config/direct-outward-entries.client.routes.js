'use strict';

//Setting up route
angular.module('direct-outward-entries').config(['$stateProvider',
	function($stateProvider) {
		// Direct outward entries state routing
		$stateProvider.
		state('listDirectOutwardEntries', {
			url: '/direct-outward-entries',
			templateUrl: 'modules/direct-outward-entries/views/list-direct-outward-entries.client.view.html'
		}).
		state('createDirectOutwardEntry', {
			url: '/direct-outward-entries/create',
			templateUrl: 'modules/direct-outward-entries/views/create-direct-outward-entry.client.view.html'
		}).
		state('viewDirectOutwardEntry', {
			url: '/direct-outward-entries/:directOutwardEntryId',
			templateUrl: 'modules/direct-outward-entries/views/view-direct-outward-entry.client.view.html'
		}).
		state('editDirectOutwardEntry', {
			url: '/direct-outward-entries/:directOutwardEntryId/edit',
			templateUrl: 'modules/direct-outward-entries/views/edit-direct-outward-entry.client.view.html'
		});
	}
]);