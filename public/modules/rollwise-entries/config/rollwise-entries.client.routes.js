'use strict';

//Setting up route
angular.module('rollwise-entries').config(['$stateProvider',
	function($stateProvider) {
		// Rollwise entries state routing
		$stateProvider.
		state('listRollwiseEntries', {
			url: '/rollwise-entries',
			templateUrl: 'modules/rollwise-entries/views/list-rollwise-entries.client.view.html'
		}).
		state('createRollwiseEntry', {
			url: '/rollwise-entries/create',
			templateUrl: 'modules/rollwise-entries/views/create-rollwise-entry.client.view.html'
		}).
		state('viewRollwiseEntry', {
			url: '/rollwise-entries/:rollwiseEntryId',
			templateUrl: 'modules/rollwise-entries/views/view-rollwise-entry.client.view.html'
		}).
		state('editRollwiseEntry', {
			url: '/rollwise-entries/:rollwiseEntryId/edit',
			templateUrl: 'modules/rollwise-entries/views/edit-rollwise-entry.client.view.html'
		});
	}
]);