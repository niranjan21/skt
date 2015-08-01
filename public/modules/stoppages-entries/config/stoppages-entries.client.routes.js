'use strict';

//Setting up route
angular.module('stoppages-entries').config(['$stateProvider',
	function($stateProvider) {
		// Stoppages entries state routing
		$stateProvider.
		state('listStoppagesEntries', {
			url: '/stoppages-entries',
			templateUrl: 'modules/stoppages-entries/views/list-stoppages-entries.client.view.html'
		}).
		state('createStoppagesEntry', {
			url: '/stoppages-entries/create',
			templateUrl: 'modules/stoppages-entries/views/create-stoppages-entry.client.view.html'
		}).
		state('viewStoppagesEntry', {
			url: '/stoppages-entries/:stoppagesEntryId',
			templateUrl: 'modules/stoppages-entries/views/view-stoppages-entry.client.view.html'
		}).
		state('editStoppagesEntry', {
			url: '/stoppages-entries/:stoppagesEntryId/edit',
			templateUrl: 'modules/stoppages-entries/views/edit-stoppages-entry.client.view.html'
		});
	}
]);