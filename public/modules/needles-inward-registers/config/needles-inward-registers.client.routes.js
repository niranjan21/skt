'use strict';

//Setting up route
angular.module('needles-inward-registers').config(['$stateProvider',
	function($stateProvider) {
		// Needles inward registers state routing
		$stateProvider.
		state('listNeedlesInwardRegisters', {
			url: '/needles-inward-registers',
			templateUrl: 'modules/needles-inward-registers/views/list-needles-inward-registers.client.view.html'
		}).
		state('createNeedlesInwardRegister', {
			url: '/needles-inward-registers/create',
			templateUrl: 'modules/needles-inward-registers/views/create-needles-inward-register.client.view.html'
		}).
		state('viewNeedlesInwardRegister', {
			url: '/needles-inward-registers/:needlesInwardRegisterId',
			templateUrl: 'modules/needles-inward-registers/views/view-needles-inward-register.client.view.html'
		}).
		state('editNeedlesInwardRegister', {
			url: '/needles-inward-registers/:needlesInwardRegisterId/edit',
			templateUrl: 'modules/needles-inward-registers/views/edit-needles-inward-register.client.view.html'
		});
	}
]);