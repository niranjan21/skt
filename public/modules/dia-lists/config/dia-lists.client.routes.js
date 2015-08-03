'use strict';

//Setting up route
angular.module('dia-lists').config(['$stateProvider',
	function($stateProvider) {
		// Dia lists state routing
		$stateProvider.
		state('listDiaLists', {
			url: '/dia-lists',
			templateUrl: 'modules/dia-lists/views/list-dia-lists.client.view.html'
		}).
		state('createDiaList', {
			url: '/dia-lists/create',
			templateUrl: 'modules/dia-lists/views/create-dia-list.client.view.html'
		}).
		state('viewDiaList', {
			url: '/dia-lists/:diaListId',
			templateUrl: 'modules/dia-lists/views/view-dia-list.client.view.html'
		}).
		state('editDiaList', {
			url: '/dia-lists/:diaListId/edit',
			templateUrl: 'modules/dia-lists/views/edit-dia-list.client.view.html'
		});
	}
]);