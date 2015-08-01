'use strict';

//Setting up route
angular.module('outward-entries').config(['$stateProvider',
	function($stateProvider) {
		// Outward entries state routing
		$stateProvider.
		state('listOutwardEntries', {
			url: '/outward-entries',
			templateUrl: 'modules/outward-entries/views/list-outward-entries.client.view.html'
		}).
		state('createOutwardEntry', {
			url: '/outward-entries/create',
			templateUrl: 'modules/outward-entries/views/create-outward-entry.client.view.html'
		}).
		state('viewOutwardEntry', {
			url: '/outward-entries/:outwardEntryId',
			templateUrl: 'modules/outward-entries/views/view-outward-entry.client.view.html'
		}).
		state('editOutwardEntry', {
			url: '/outward-entries/:outwardEntryId/edit',
			templateUrl: 'modules/outward-entries/views/edit-outward-entry.client.view.html'
		});
	}
]);