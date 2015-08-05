'use strict';

//Setting up route
angular.module('machinewise-entries').config(['$stateProvider',
	function($stateProvider) {
		// Machinewise entries state routing
		$stateProvider.
		state('listMachinewiseEntries', {
			url: '/machinewise-entries',
			templateUrl: 'modules/machinewise-entries/views/list-machinewise-entries.client.view.html'
		}).
		state('createMachinewiseEntry', {
			url: '/machinewise-entries/create',
			templateUrl: 'modules/machinewise-entries/views/create-machinewise-entry.client.view.html'
		}).
		state('viewMachinewiseEntry', {
			url: '/machinewise-entries/:machinewiseEntryId',
			templateUrl: 'modules/machinewise-entries/views/view-machinewise-entry.client.view.html'
		}).
		state('editMachinewiseEntry', {
			url: '/machinewise-entries/:machinewiseEntryId/edit',
			templateUrl: 'modules/machinewise-entries/views/edit-machinewise-entry.client.view.html'
		});
	}
]);