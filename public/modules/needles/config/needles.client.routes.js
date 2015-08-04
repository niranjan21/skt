'use strict';

//Setting up route
angular.module('needles').config(['$stateProvider',
	function($stateProvider) {
		// Needles state routing
		$stateProvider.
		state('listNeedles', {
			url: '/needles',
			templateUrl: 'modules/needles/views/list-needles.client.view.html'
		}).
		state('createNeedle', {
			url: '/needles/create',
			templateUrl: 'modules/needles/views/create-needle.client.view.html'
		}).
		state('viewNeedle', {
			url: '/needles/:needleId',
			templateUrl: 'modules/needles/views/view-needle.client.view.html'
		}).
		state('editNeedle', {
			url: '/needles/:needleId/edit',
			templateUrl: 'modules/needles/views/edit-needle.client.view.html'
		});
	}
]);