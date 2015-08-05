'use strict';

//Setting up route
angular.module('power-and-diesel-consumption-entries').config(['$stateProvider',
	function($stateProvider) {
		// Power and diesel consumption entries state routing
		$stateProvider.
		state('listPowerAndDieselConsumptionEntries', {
			url: '/power-and-diesel-consumption-entries',
			templateUrl: 'modules/power-and-diesel-consumption-entries/views/list-power-and-diesel-consumption-entries.client.view.html'
		}).
		state('createPowerAndDieselConsumptionEntry', {
			url: '/power-and-diesel-consumption-entries/create',
			templateUrl: 'modules/power-and-diesel-consumption-entries/views/create-power-and-diesel-consumption-entry.client.view.html'
		}).
		state('viewPowerAndDieselConsumptionEntry', {
			url: '/power-and-diesel-consumption-entries/:powerAndDieselConsumptionEntryId',
			templateUrl: 'modules/power-and-diesel-consumption-entries/views/view-power-and-diesel-consumption-entry.client.view.html'
		}).
		state('editPowerAndDieselConsumptionEntry', {
			url: '/power-and-diesel-consumption-entries/:powerAndDieselConsumptionEntryId/edit',
			templateUrl: 'modules/power-and-diesel-consumption-entries/views/edit-power-and-diesel-consumption-entry.client.view.html'
		});
	}
]);