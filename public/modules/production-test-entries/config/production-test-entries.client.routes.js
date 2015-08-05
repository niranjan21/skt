'use strict';

//Setting up route
angular.module('production-test-entries').config(['$stateProvider',
	function($stateProvider) {
		// Production test entries state routing
		$stateProvider.
		state('listProductionTestEntries', {
			url: '/production-test-entries',
			templateUrl: 'modules/production-test-entries/views/list-production-test-entries.client.view.html'
		}).
		state('createProductionTestEntry', {
			url: '/production-test-entries/create',
			templateUrl: 'modules/production-test-entries/views/create-production-test-entry.client.view.html'
		}).
		state('viewProductionTestEntry', {
			url: '/production-test-entries/:productionTestEntryId',
			templateUrl: 'modules/production-test-entries/views/view-production-test-entry.client.view.html'
		}).
		state('editProductionTestEntry', {
			url: '/production-test-entries/:productionTestEntryId/edit',
			templateUrl: 'modules/production-test-entries/views/edit-production-test-entry.client.view.html'
		});
	}
]);