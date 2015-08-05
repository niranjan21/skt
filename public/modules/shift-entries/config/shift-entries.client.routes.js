'use strict';

//Setting up route
angular.module('shift-entries').config(['$stateProvider',
	function($stateProvider) {
		// Shift entries state routing
		$stateProvider.
		state('listShiftEntries', {
			url: '/shift-entries',
			templateUrl: 'modules/shift-entries/views/list-shift-entries.client.view.html'
		}).
		state('createShiftEntry', {
			url: '/shift-entries/create',
			templateUrl: 'modules/shift-entries/views/create-shift-entry.client.view.html'
		}).
		state('viewShiftEntry', {
			url: '/shift-entries/:shiftEntryId',
			templateUrl: 'modules/shift-entries/views/view-shift-entry.client.view.html'
		}).
		state('editShiftEntry', {
			url: '/shift-entries/:shiftEntryId/edit',
			templateUrl: 'modules/shift-entries/views/edit-shift-entry.client.view.html'
		});
	}
]);