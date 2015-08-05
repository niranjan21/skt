'use strict';

//Setting up route
angular.module('roll-quality-control-entries').config(['$stateProvider',
	function($stateProvider) {
		// Roll quality control entries state routing
		$stateProvider.
		state('listRollQualityControlEntries', {
			url: '/roll-quality-control-entries',
			templateUrl: 'modules/roll-quality-control-entries/views/list-roll-quality-control-entries.client.view.html'
		}).
		state('createRollQualityControlEntry', {
			url: '/roll-quality-control-entries/create',
			templateUrl: 'modules/roll-quality-control-entries/views/create-roll-quality-control-entry.client.view.html'
		}).
		state('viewRollQualityControlEntry', {
			url: '/roll-quality-control-entries/:rollQualityControlEntryId',
			templateUrl: 'modules/roll-quality-control-entries/views/view-roll-quality-control-entry.client.view.html'
		}).
		state('editRollQualityControlEntry', {
			url: '/roll-quality-control-entries/:rollQualityControlEntryId/edit',
			templateUrl: 'modules/roll-quality-control-entries/views/edit-roll-quality-control-entry.client.view.html'
		});
	}
]);