'use strict';

//Setting up route
angular.module('machine-knittings').config(['$stateProvider',
	function($stateProvider) {
		// Machine knittings state routing
		$stateProvider.
		state('listMachineKnittings', {
			url: '/machine-knittings',
			templateUrl: 'modules/machine-knittings/views/list-machine-knittings.client.view.html'
		}).
		state('createMachineKnitting', {
			url: '/machine-knittings/create',
			templateUrl: 'modules/machine-knittings/views/create-machine-knitting.client.view.html'
		}).
		state('viewMachineKnitting', {
			url: '/machine-knittings/:machineKnittingId',
			templateUrl: 'modules/machine-knittings/views/view-machine-knitting.client.view.html'
		}).
		state('editMachineKnitting', {
			url: '/machine-knittings/:machineKnittingId/edit',
			templateUrl: 'modules/machine-knittings/views/edit-machine-knitting.client.view.html'
		});
	}
]);