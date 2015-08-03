'use strict';

//Setting up route
angular.module('concerns').config(['$stateProvider',
	function($stateProvider) {
		// Concerns state routing
		$stateProvider.
		state('listConcerns', {
			url: '/concerns',
			templateUrl: 'modules/concerns/views/list-concerns.client.view.html'
		}).
		state('createConcern', {
			url: '/concerns/create',
			templateUrl: 'modules/concerns/views/create-concern.client.view.html'
		}).
		state('viewConcern', {
			url: '/concerns/:concernId',
			templateUrl: 'modules/concerns/views/view-concern.client.view.html'
		}).
		state('editConcern', {
			url: '/concerns/:concernId/edit',
			templateUrl: 'modules/concerns/views/edit-concern.client.view.html'
		});
	}
]);