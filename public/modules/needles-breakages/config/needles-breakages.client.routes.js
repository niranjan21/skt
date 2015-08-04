'use strict';

//Setting up route
angular.module('needles-breakages').config(['$stateProvider',
	function($stateProvider) {
		// Needles breakages state routing
		$stateProvider.
		state('listNeedlesBreakages', {
			url: '/needles-breakages',
			templateUrl: 'modules/needles-breakages/views/list-needles-breakages.client.view.html'
		}).
		state('createNeedlesBreakage', {
			url: '/needles-breakages/create',
			templateUrl: 'modules/needles-breakages/views/create-needles-breakage.client.view.html'
		}).
		state('viewNeedlesBreakage', {
			url: '/needles-breakages/:needlesBreakageId',
			templateUrl: 'modules/needles-breakages/views/view-needles-breakage.client.view.html'
		}).
		state('editNeedlesBreakage', {
			url: '/needles-breakages/:needlesBreakageId/edit',
			templateUrl: 'modules/needles-breakages/views/edit-needles-breakage.client.view.html'
		});
	}
]);