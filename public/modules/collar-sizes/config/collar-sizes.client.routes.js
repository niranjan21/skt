'use strict';

//Setting up route
angular.module('collar-sizes').config(['$stateProvider',
	function($stateProvider) {
		// Collar sizes state routing
		$stateProvider.
		state('listCollarSizes', {
			url: '/collar-sizes',
			templateUrl: 'modules/collar-sizes/views/list-collar-sizes.client.view.html'
		}).
		state('createCollarSize', {
			url: '/collar-sizes/create',
			templateUrl: 'modules/collar-sizes/views/create-collar-size.client.view.html'
		}).
		state('viewCollarSize', {
			url: '/collar-sizes/:collarSizeId',
			templateUrl: 'modules/collar-sizes/views/view-collar-size.client.view.html'
		}).
		state('editCollarSize', {
			url: '/collar-sizes/:collarSizeId/edit',
			templateUrl: 'modules/collar-sizes/views/edit-collar-size.client.view.html'
		});
	}
]);