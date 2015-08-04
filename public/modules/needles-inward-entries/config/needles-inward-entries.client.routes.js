'use strict';

//Setting up route
angular.module('needles-inward-entries').config(['$stateProvider',
	function($stateProvider) {
		// Needles inward entries state routing
		$stateProvider.
		state('listNeedlesInwardEntries', {
			url: '/needles-inward-entries',
			templateUrl: 'modules/needles-inward-entries/views/list-needles-inward-entries.client.view.html'
		}).
		state('createNeedlesInwardEntry', {
			url: '/needles-inward-entries/create',
			templateUrl: 'modules/needles-inward-entries/views/create-needles-inward-entry.client.view.html'
		}).
		state('viewNeedlesInwardEntry', {
			url: '/needles-inward-entries/:needlesInwardEntryId',
			templateUrl: 'modules/needles-inward-entries/views/view-needles-inward-entry.client.view.html'
		}).
		state('editNeedlesInwardEntry', {
			url: '/needles-inward-entries/:needlesInwardEntryId/edit',
			templateUrl: 'modules/needles-inward-entries/views/edit-needles-inward-entry.client.view.html'
		});
	}
]);