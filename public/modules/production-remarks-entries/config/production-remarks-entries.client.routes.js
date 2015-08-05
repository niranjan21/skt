'use strict';

//Setting up route
angular.module('production-remarks-entries').config(['$stateProvider',
	function($stateProvider) {
		// Production remarks entries state routing
		$stateProvider.
		state('listProductionRemarksEntries', {
			url: '/production-remarks-entries',
			templateUrl: 'modules/production-remarks-entries/views/list-production-remarks-entries.client.view.html'
		}).
		state('createProductionRemarksEntry', {
			url: '/production-remarks-entries/create',
			templateUrl: 'modules/production-remarks-entries/views/create-production-remarks-entry.client.view.html'
		}).
		state('viewProductionRemarksEntry', {
			url: '/production-remarks-entries/:productionRemarksEntryId',
			templateUrl: 'modules/production-remarks-entries/views/view-production-remarks-entry.client.view.html'
		}).
		state('editProductionRemarksEntry', {
			url: '/production-remarks-entries/:productionRemarksEntryId/edit',
			templateUrl: 'modules/production-remarks-entries/views/edit-production-remarks-entry.client.view.html'
		});
	}
]);