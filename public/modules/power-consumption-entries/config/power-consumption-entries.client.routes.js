'use strict';

//Setting up route
angular.module('power-consumption-entries').config(['$stateProvider',
	function($stateProvider) {
		// Power consumption entries state routing
		$stateProvider.
		state('listPowerConsumptionEntries', {
			url: '/power-consumption-entries',
			templateUrl: 'modules/power-consumption-entries/views/list-power-consumption-entries.client.view.html'
		}).
		state('createPowerConsumptionEntry', {
			url: '/power-consumption-entries/create',
			templateUrl: 'modules/power-consumption-entries/views/create-power-consumption-entry.client.view.html'
		}).
		state('viewPowerConsumptionEntry', {
			url: '/power-consumption-entries/:powerConsumptionEntryId',
			templateUrl: 'modules/power-consumption-entries/views/view-power-consumption-entry.client.view.html'
		}).
		state('editPowerConsumptionEntry', {
			url: '/power-consumption-entries/:powerConsumptionEntryId/edit',
			templateUrl: 'modules/power-consumption-entries/views/edit-power-consumption-entry.client.view.html'
		});
	}
]);