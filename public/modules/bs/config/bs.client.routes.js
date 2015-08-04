'use strict';

//Setting up route
angular.module('bs').config(['$stateProvider',
	function($stateProvider) {
		// Bs state routing
		$stateProvider.
		state('listBs', {
			url: '/bs',
			templateUrl: 'modules/bs/views/list-bs.client.view.html'
		}).
		state('createB', {
			url: '/bs/create',
			templateUrl: 'modules/bs/views/create-b.client.view.html'
		}).
		state('viewB', {
			url: '/bs/:bId',
			templateUrl: 'modules/bs/views/view-b.client.view.html'
		}).
		state('editB', {
			url: '/bs/:bId/edit',
			templateUrl: 'modules/bs/views/edit-b.client.view.html'
		});
	}
]);