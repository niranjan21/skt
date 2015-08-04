'use strict';

//Setting up route
angular.module('mills').config(['$stateProvider',
	function($stateProvider) {
		// Mills state routing
		$stateProvider.
		state('listMills', {
			url: '/mills',
			templateUrl: 'modules/mills/views/list-mills.client.view.html'
		}).
		state('createMill', {
			url: '/mills/create',
			templateUrl: 'modules/mills/views/create-mill.client.view.html'
		}).
		state('viewMill', {
			url: '/mills/:millId',
			templateUrl: 'modules/mills/views/view-mill.client.view.html'
		}).
		state('editMill', {
			url: '/mills/:millId/edit',
			templateUrl: 'modules/mills/views/edit-mill.client.view.html'
		});
	}
]);